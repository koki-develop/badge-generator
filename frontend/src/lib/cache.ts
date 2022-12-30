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

type Cache<T> = {
  data: T;
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
  func: () => Promise<T>
): Promise<T> => {
  const cache = await loadCache<T>(key);
  if (cache != null) return cache.data;

  const value = await func();
  await saveCache(key, value);

  return value;
};

const _isExpired = <T>(cache: Cache<T>): boolean =>
  new Date() > cache.expiration.toDate();

const _md5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
