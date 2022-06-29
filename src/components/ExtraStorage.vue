<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { ExperimentMenu } from "../types";

const saveToStorage = () => {
  console.log("SaveToStorage");
  const request = indexedDB.open("DA", 3);

  request.onerror = (event: Event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  request.onsuccess = (event: Event) => {
    // add implementation here
    console.log({ event });
  };

  // create the Contacts object store and indexes
  request.onupgradeneeded = (event) => {
    console.log("Updgrade");
    let db = event.target.result;

    // create the Contacts object store
    // with auto-increment id
    db.createObjectStore("Images");
  };
};

if (!window.indexedDB) {
  console.log(`Your browser doesn't support IndexedDB`);
}
saveToStorage();
</script>

<template>
  <h2>ExtraStorage</h2>
  <h3>Try and set big files to client storage</h3>

  <button type="button" @click="saveToStorage">Save to storage</button>
</template>
