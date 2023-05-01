<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div>CustomStory v0.0.1</div>
        <q-space />
        <q-select
          v-model="locale"
          :options="localeOptions"
          :label="$t('main.bar.language')"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />
      </q-toolbar>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const { locale } = useI18n({ useScope: "global" });

    return {
      locale,
      localeOptions: [
        { value: "ru-RU", label: "Русский" },
        { value: "en-US", label: "English" },
      ],
    };
  },
});
</script>
