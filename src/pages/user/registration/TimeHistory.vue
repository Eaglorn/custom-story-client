<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <q-timeline color="secondary">
          <q-timeline-entry heading body="История мира" />
          <q-timeline-entry title="Начало 2026">
            {{ pageText._2026_start }}
          </q-timeline-entry>
          <q-timeline-entry title="Середина 2026">
            {{ pageText._2026_middle }}
          </q-timeline-entry>
          <q-timeline-entry title="Конец 2026">
            {{ pageText._2026_end }}
          </q-timeline-entry>
          <q-timeline-entry title="Середина 2027">
            {{ pageText._2027_middle }}
          </q-timeline-entry>
          <q-timeline-entry title="2028">
            {{ pageText._2028 }}
          </q-timeline-entry>
          <q-timeline-entry title="2030">
            {{ pageText._2030 }}
          </q-timeline-entry>
          <q-timeline-entry title="Начало 2031">
            {{ pageText._2031_start }}
          </q-timeline-entry>
          <q-timeline-entry title="Конец 2031">
            {{ pageText._2031_end }}
          </q-timeline-entry>
          <q-timeline-entry title="2036">
            {{ pageText._2036 }}
          </q-timeline-entry>
          <q-timeline-entry title="2042">
            {{ pageText._2042 }}
          </q-timeline-entry>
          <q-timeline-entry title="2047">
            {{ pageText._2047 }}
          </q-timeline-entry>
          <q-timeline-entry title="2055">
            {{ pageText._2055 }}
          </q-timeline-entry>
        </q-timeline>
        <q-btn
          class="form-button shadow-2"
          style="width: 300px"
          color="primary"
          label="Перейти к созданию персонажа..."
          @click="createHero"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass"></style>

<script>
import { ref } from "vue";
import { Loading, Notify, Cookies } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { useGlobalStore } from "stores/global";

var pageText = ref({});

import("./assets/TimeHistory.json").then((data) => {
  pageText.value = data.default;
});

export default {
  name: "UserRegistrationTimeHistory",
  setup() {
    const $router = useRouter();
    const storeGlobal = useGlobalStore();
    const storeUser = useUserStore();

    const createHero = function () {
      $router.push("UserRegistrationHeroCreate");
    };

    return { createHero, pageText };
  },
};
</script>
