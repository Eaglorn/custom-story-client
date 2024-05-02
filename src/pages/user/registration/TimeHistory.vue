<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <q-card>
          <q-card-section>
            <q-timeline color="secondary" class="timeline" dark="true">
              <q-timeline-entry heading body="История мира" />
              <q-timeline-entry title="2026 февраль">
                {{ pageText._2026_start }}
              </q-timeline-entry>
              <q-timeline-entry title="2026 июнь">
                {{ pageText._2026_middle }}
              </q-timeline-entry>
              <q-timeline-entry title="2026 декабрь">
                {{ pageText._2026_end }}
              </q-timeline-entry>
              <q-timeline-entry title="2027 май">
                {{ pageText._2027_middle }}
              </q-timeline-entry>
              <q-timeline-entry title="2028 март">
                {{ pageText._2028 }}
              </q-timeline-entry>
              <q-timeline-entry title="2030 май">
                {{ pageText._2030 }}
              </q-timeline-entry>
              <q-timeline-entry title="2031 январь">
                {{ pageText._2031_start }}
              </q-timeline-entry>
              <q-timeline-entry title="2031 ноябрь">
                {{ pageText._2031_end }}
              </q-timeline-entry>
              <q-timeline-entry title="2036 август">
                {{ pageText._2036 }}
              </q-timeline-entry>
              <q-timeline-entry title="2042 январь">
                {{ pageText._2042 }}
              </q-timeline-entry>
              <q-timeline-entry title="2047 ноябрь">
                {{ pageText._2047 }}
              </q-timeline-entry>
              <q-timeline-entry title="2055 май">
                {{ pageText._2055 }}
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn
              class="form-button shadow-2"
              style="width: 300px"
              color="primary"
              label="Перейти к созданию персонажа..."
              @click="createHero"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.timeline
  font-size: 18px
</style>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "UserRegistrationTimeHistory",
});

const pageText = ref({});

import("./assets/TimeHistory.json").then((data) => {
  pageText.value = data.default;
});

const $router = useRouter();

const createHero = function () {
  $router.push("UserRegistrationHeroCreate");
};
</script>
