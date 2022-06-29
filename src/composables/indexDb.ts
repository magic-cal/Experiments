import { ref } from "vue";

export const useIndexDb = (tableName: string = "default") => {
  const supported = !!window.indexedDB;
  const version = 4; // Integer only

  const db = ref<IDBDatabase | null>(null);

  const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(tableName, version);

      request.onerror = (event: Event) => {
        console.error({ event });
        reject("Error - See logs");
      };

      request.onsuccess = (event: any) => {
        console.log("success");
        resolve(event.target.result);
      };

      request.onupgradeneeded = (e) => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        let objectStore = db.createObjectStore("images", {
          autoIncrement: true,
        });
      };
    });
  };

  const getDb = async () => {
    if (!db.value) {
      db.value = await openDb();
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
    const db = await getDb();

    return new Promise<void>((resolve, reject) => {
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
