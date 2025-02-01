interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private static EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

  static set<T>(key: string, data: T): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() - cacheItem.timestamp > this.EXPIRATION_TIME;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheItem.data;
  }

  static clear(key: string): void {
    localStorage.removeItem(key);
  }

  static clearAll(): void {
    localStorage.clear();
  }
}