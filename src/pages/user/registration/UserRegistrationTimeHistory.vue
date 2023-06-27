<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <q-timeline color="secondary">
          <q-timeline-entry heading body="История мира" />

          <q-timeline-entry title="Непонятное" subtitle="Середина 2026">
            Люди всего мира начали сталкиваться с аномалиями похожими на
            закрученное пространство.
          </q-timeline-entry>
          <q-timeline-entry title="Тревога" subtitle="Конец 2026">
            Количество аномалий за прощеждее время немного выросло. У людей и
            животных пытающихся приблизится к аномалиям начиналось ухудшение
            самочувствия. В лучшем случае головокружение перерастало в тошноту,
            в худших обморок с последующей смертью. Аномалии никак не выявлялись
            электронным оборудование, были видны и ощущались только
            людьми.</q-timeline-entry
          >
          <q-timeline-entry title="Сомнения" subtitle="Начало 2027">
            Скорость появления новых аномалий существенно выросло. На большие
            города приходилось до 200 штук и и неподсчитанное количество на
            площадях не зантых людьми.</q-timeline-entry
          >
          <q-timeline-entry title="Тревога" subtitle="Середина 2027">
            Аномалии начали изменяться до состояния похожего на порталы в другие
            миры из игр.</q-timeline-entry
          >
          <q-timeline-entry title="Завязка" subtitle="Конец 2027">
            Аномалии начали изменяться до состояния похожего на порталы в другие
            миры из игр.</q-timeline-entry
          >
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
          <q-timeline-entry title="" subtitle=""></q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass"></style>

<script>
// TODO: Сделать страницу предистории
import { ref } from "vue";
import { Loading, Notify, Cookies } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { useGlobalStore } from "stores/global";

export default {
  name: "UserRegistrationHeroPage",
  setup() {
    const globalStore = useGlobalStore();
    const userStore = useUserStore();

    return {};
  },
};
</script>
