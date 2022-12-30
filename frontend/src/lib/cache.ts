import crypto from "crypto";
import { addHours } from "date-fns";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = getFirestore();

const version = "v2";
const ttlHours = 3;

const collectionKey = `caches_${version}`;

type Cache<T = any> = {
  data: T | null;
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

  const cache = doc.data() as Cache;
  if (_isExpired(cache)) return null;

  return cache;
};

const _isExpired = (cache: Cache): boolean =>
  new Date() > cache.expiration.toDate();

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
