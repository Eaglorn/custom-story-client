<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> CustomStory v{{ version }} </q-toolbar-title>
        <q-space />
        <q-badge
          class="online-badge"
          color="green"
          text-color="accent"
          :label="'Онлайн: ' + playersCount"
        />
      </q-toolbar>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="sass">
.online-badge
  font-size: 16px
</style>

<script setup>
import { computed } from "vue";
import { useGlobalStore } from "stores/global";

defineOptions({
  name: "MainLayout",
});

const storeGlobal = useGlobalStore();
const playersCount = computed(() => storeGlobal.playersCount);
const version = storeGlobal.app.version;
</script>
