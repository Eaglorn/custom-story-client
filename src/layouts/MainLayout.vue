<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div>
          CustomStory v{{ version }} Количество игроков:
          <q-badge color="orange" text-color="black" :label="playersCount" />
        </div>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useGlobalStore } from "stores/global";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const storeGlobal = useGlobalStore();

    const playersCount = computed(() => storeGlobal.playersCount);

    const version = storeGlobal.app.version;

    return { version, playersCount };
  },
});
</script>
