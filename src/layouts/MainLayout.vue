<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div>CustomStory v{{ version }}</div>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useGlobalStore } from "stores/global";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const storeGlobal = useGlobalStore();

    const version = storeGlobal.app.version;

    return { version };
  },
});
</script>
