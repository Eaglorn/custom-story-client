<template>
  <router-view />
</template>

<script setup>
import { Decimal } from "boot/decimal";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";

defineOptions({
  name: "App",
});

Decimal.set({ rounding: Decimal.ROUND_DOWN, precision: 999 });

const $router = useRouter();
const storeUser = useUserStore();

storeUser.onAuthorization();

//$router.push("UserRegistrationTimeHistory");
//$router.push("UserRegistrationHeroCreate");
//$router.push("UserSignInUp");
</script>
