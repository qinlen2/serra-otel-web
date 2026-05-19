type StorageKind = "local" | "session";

function getBrowserStorage(kind: StorageKind) {
  if (typeof window === "undefined") return null;

  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    const testKey = "__serra_storage_test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return storage;
  } catch {
    return null;
  }
}

export function safeStorageGet(kind: StorageKind, key: string) {
  try {
    return getBrowserStorage(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function safeStorageSet(kind: StorageKind, key: string, value: string) {
  try {
    getBrowserStorage(kind)?.setItem(key, value);
  } catch {
    // Storage can be blocked by browser privacy settings. The site should keep working.
  }
}

export function safeStorageRemove(kind: StorageKind, key: string) {
  try {
    getBrowserStorage(kind)?.removeItem(key);
  } catch {
    // Storage can be blocked by browser privacy settings. The site should keep working.
  }
}
