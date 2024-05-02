<template>
  <router-view />
</template>

<script setup>
import { Decimal } from "boot/decimal";
import { useRouter } from "vue-router";
import { io } from "boot/socket";
import { useGlobalStore } from "stores/global";
import { useUserStore } from "stores/user";

defineOptions({
  name: "App",
});

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

storeGlobal.socket.on("GetPlayersCount", (data) => {
  storeGlobal.playersCount = data.value;
});

storeGlobal.socket.on("AddPlayersCount", (data) => {
  storeGlobal.playersCount++;
});

storeGlobal.socket.on("RemovePlayersCount", (data) => {
  storeGlobal.playersCount--;
});

//$router.push("UserSignInUp");
$router.push("UserRegistrationTimeHistory");
//$router.push("UserRegistrationHeroCreate");
</script>
