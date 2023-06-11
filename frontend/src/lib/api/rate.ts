import { addHours } from "date-fns";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { ApiError, ApiResult } from "@/lib/api/api";
import { db } from "@/lib/api/firestore";
import { logger } from "@/lib/logger";

const version = "v1";
const resetHours = 1;
const limit = 1000;

const collectionKey = `rates_${version}`;
const shardsCount = 10;

type Meta = {
  reset: Timestamp;
};

export const withRate =
  <T>(key: string, func: () => Promise<ApiResult<T>>) =>
  async (): Promise<ApiResult<T>> => {
    const meta = await _getMeta(key);
    if (!meta || _canReset(meta)) {
      logger.info(`reset ${key} rate.`, { key });
      await _resetRate(key);
    } else {
      const current = await _getRate(key);
      logger.info(`current ${key} rate: ${current}`, { key, rate: current });
      if (current > limit) {
        return { data: null, error: ApiError.RateLimit };
      }
    }

    await _increment(key);
    const result = await func();
    return result;
  };

const _getRate = async (key: string): Promise<number> => {
  const ref = await db.collection(`${collectionKey}/${key}/shards`).get();
  let rate = 0;
  ref.forEach((doc) => {
    rate += doc.data().count;
  });
  return rate;
};

const _increment = async (key: string): Promise<void> => {
  await db
    .collection(`${collectionKey}/${key}/shards`)
    .doc(_randomShardId())
    .update("count", FieldValue.increment(1));
};

const _getMeta = async (key: string): Promise<Meta | null> => {
  const doc = await db.collection(collectionKey).doc(key).get();
  if (!doc.exists) {
    return null;
  }
  return doc.data() as Meta;
};

const _resetRate = async (key: string): Promise<void> => {
  const ref = db.collection(collectionKey).doc(key);
  await ref.set({
    reset: addHours(new Date(), resetHours),
  });

  for (let i = 0; i < shardsCount; i++) {
    await db
      .collection(`${collectionKey}/${key}/shards`)
      .doc(i.toString())
      .set({ count: 0 });
  }
};

const _canReset = (meta: Meta): boolean => new Date() > meta.reset.toDate();

const _randomShardId = (): string => {
  return Math.floor(Math.random() * shardsCount).toString();
};
