<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px"></div>
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

export default {
  name: "UserRegistrationHeroPage",
  setup() {
    const globalStore = useGlobalStore();
    const userStore = useUserStore();

    return {};
  },
};
</script>
