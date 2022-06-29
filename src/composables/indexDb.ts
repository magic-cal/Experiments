import { ref } from "vue";

export const useIndexDb = (tableName: string = "default") => {
  const supported = !window.indexedDB;
  const version = 1; // Integer only

  const db = ref<IDBDatabase | null>(null);

  const openDb = () => {
    const request = indexedDB.open(tableName, 1);

    request.onerror = (event: Event) => {
      console.error({ event });
    };

    request.onsuccess = (event: any) => {
      db.value = event.target.result;
    };
  };

  const getDb = () => {
    if (!db.value) {
      openDb();
    }
    // Not correct but just for testing
    return db.value!;
  };

  const resetDb = () => {
    // const db = getDb();
    //   db.value.close();
    //   openDb()
  };

  const setData = async (key: string, value: string) => {
    return new Promise<void>((resolve, reject) => {
      const db = getDb();

      let trans = db.transaction([key], "readwrite");
      trans.oncomplete = (e) => {
        resolve();
      };

      trans.onerror = (event) => {
        console.error({ event });
        reject();
      };

      let store = trans.objectStore(key);
      store.add(value);
    });
  };

  const getData = <T>(key: string) => {
    // return new Promise<T | null>((resolve, reject) => {
    //   const db = getDb();
    //   const data: T[] = [];
    //   let transaction = db.transaction([key], "readonly");
    //   transaction.oncomplete = (e) => {
    //     resolve(data);
    //   };
    //   let store = transaction.objectStore(key);
    // });
  };

  return {
    supported,
    setData,
  };
};
