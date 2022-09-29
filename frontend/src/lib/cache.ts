import crypto from "crypto";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import addHours from "date-fns/addHours";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = getFirestore();

export const saveCache = async <T>(key: string, data: T): Promise<void> => {
  await db
    .collection("caches")
    .doc(_md5(key))
    .set({
      ...data,
      expiration: addHours(new Date(), 2),
    });
};

export const loadCache = async <T>(key: string): Promise<T | null> => {
  const doc = await db.collection("caches").doc(_md5(key)).get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data() as T & { expiration?: Timestamp };
  if (!data.expiration) {
    return null;
  }

  if (new Date().getTime() > data.expiration.toDate().getTime()) {
    return null;
  }

  delete data.expiration;
  return data;
};

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
