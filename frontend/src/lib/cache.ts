import crypto from "crypto";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import differenceInHours from "date-fns/differenceInHours";

type Platform = "zenn";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = getFirestore();

export const saveCache = async <T>(
  platform: Platform,
  key: string,
  data: T
): Promise<void> => {
  await db
    .collection(`platforms/${platform}/keys`)
    .doc(_md5(key))
    .set({
      ...data,
      timestamp: new Date(),
    });
};

export const loadCache = async <T>(
  platform: Platform,
  key: string
): Promise<T | null> => {
  const doc = await db
    .collection(`platforms/${platform}/keys`)
    .doc(_md5(key))
    .get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data() as T & { timestamp?: Timestamp };
  if (!data.timestamp) {
    return null;
  }

  if (differenceInHours(new Date(), data.timestamp.toDate().getTime()) > 2) {
    return null;
  }

  delete data.timestamp;
  return data;
};

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
