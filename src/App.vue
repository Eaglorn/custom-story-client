<template>
  <router-view />
</template>

<script>
import { Decimal } from "boot/decimal";

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { socket } from "boot/socket";

import { useGlobalStore } from "stores/global";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "App",
  setup() {
    Decimal.set({ rounding: Decimal.ROUND_DOWN, precision: 999 });

    const $router = useRouter();
    const globalStore = useGlobalStore();
    const userStore = useUserStore();

    globalStore.setAjaxUri("http://127.0.0.1:3000/api/");

    socket.on("connect", () => {
      userStore.socket = socket.id;
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      userStore.socket = "";
      console.log(socket.id);
    });

    socket.on("chat", (arg) => {
      console.log(arg);
    });

    //$router.push("UserSignInUp");
    $router.push("UserRegistrationTimeHistory");
  },
});
</script>
