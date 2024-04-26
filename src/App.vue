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
    const storeGlobal = useGlobalStore();
    const storeUser = useUserStore();

    const socket = io(storeGlobal.server.address, {
      query: {
        email: storeUser.email,
        password: storeUser.password,
      },
    });
    storeGlobal.socket = socket;

    storeGlobal.socket.on("connect", () => {});

    storeGlobal.socket.on("GlobalCountAddPlayer", () => {
      storeGlobal.countPlayers++;
    });

    storeGlobal.socket.on("GlobalCountRemovePlayer", () => {
      storeGlobal.countPlayers--;
    });

    $router.push("UserSignInUp");
    //$router.push("UserRegistrationTimeHistory");
  },
});
</script>
