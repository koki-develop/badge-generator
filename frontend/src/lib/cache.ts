import crypto from "crypto";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import addHours from "date-fns/addHours";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = getFirestore();

type Cache<T = any> = {
  data: T | null;
  expiration: Timestamp;
};

export const saveCache = async <T>(key: string, data: T): Promise<void> => {
  await db
    .collection("caches")
    .doc(_md5(key))
    .set({
      data,
      expiration: addHours(new Date(), 2),
    });
};

export const loadCache = async <T>(key: string): Promise<Cache<T> | null> => {
  const doc = await db.collection("caches").doc(_md5(key)).get();
  if (!doc.exists) {
    return null;
  }

  const cache = doc.data() as Cache;
  if (new Date().getTime() > cache.expiration.toDate().getTime()) {
    return null;
  }

  return cache;
};

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
