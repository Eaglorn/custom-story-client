<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 300px">
        <q-card>
          <q-card-section>
            <q-select
              v-model="selectBaseCore"
              rounded
              :options="options"
              label="Выберите ядро ваших сил"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

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
    const $router = useRouter();
    const globalStore = useGlobalStore();
    const userStore = useUserStore();

    const selectBaseCore = ref("");
    const options = ["Земля", "Вода", "Воздух", "Огонь"];

    return { selectBaseCore, options };
  },
};
</script>

<style scoped lang="sass"></style>
