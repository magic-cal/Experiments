<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { ExperimentMenu } from "../types";
import ExtraStorage from "./ExtraStorage.vue";
import TakingImages from "./TakingImages.vue";

const experiments = ref<ExperimentMenu[]>([
  {
    name: "extraStorage",
    component: ExtraStorage,
  },
  {
    name: "images",
    component: TakingImages,
  },
]);
const currentComponent = ref<string>(experiments.value?.[0].component);
const setComponent = (component: string) =>
  (currentComponent.value = component);
</script>

<template>
  <template v-for="experiment in experiments" :key="experiment.name">
    <button
      type="button"
      @click="setComponent(experiment.component)"
      class="pa-4"
    >
      {{ experiment.name }}
    </button>
  </template>
  <component :is="currentComponent"></component>
  <!-- <extra-storage></extra-storage> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
