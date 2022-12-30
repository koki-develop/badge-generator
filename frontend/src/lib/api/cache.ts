import crypto from "crypto";
import { addHours } from "date-fns";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { ApiResult } from "@/lib/api/api";
import { logger } from "@/lib/logger";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = getFirestore();

const version = "v2";
const ttlHours = 3;

const collectionKey = `caches_${version}`;

type Cache<T> = {
  data: ApiResult<T>;
  expiration: Timestamp;
};

export const saveCache = async <T>(key: string, data: T): Promise<void> => {
  await db
    .collection(collectionKey)
    .doc(_md5(key))
    .set({
      data,
      expiration: addHours(new Date(), ttlHours),
    });
};

export const loadCache = async <T>(key: string): Promise<Cache<T> | null> => {
  const docId = _md5(key);
  const doc = await db.collection(collectionKey).doc(docId).get();
  if (!doc.exists) return null;

  const cache = doc.data() as Cache<T>;
  if (_isExpired(cache)) return null;

  return cache;
};

export const withCache = async <T>(
  key: string,
  func: () => Promise<ApiResult<T>>
): Promise<ApiResult<T>> => {
  const cache = await loadCache<T>(key);
  if (cache != null) {
    logger.info("cache found.", { key });
    return cache.data;
  }
  logger.info("cache not found.", { key });

  const value = await func();
  await saveCache(key, value);
  logger.info("cache saved.", { key });

  return value;
};

const _isExpired = <T>(cache: Cache<T>): boolean =>
  new Date() > cache.expiration.toDate();

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");