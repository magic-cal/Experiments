<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { ExperimentMenu } from "../types";
import { useIndexDb } from "../composables/indexDb";

const db = useIndexDb("DB");

const saveToStorage = () => {
  console.log("SaveToStorage");
  console.log("Supported", db.supported);

  db.setData("images", "ImageData");
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
