<template>
  <router-view />
</template>

<script setup>
import { Decimal } from 'boot/decimal'
import { useRouter } from 'vue-router'
import { Loading, QSpinnerGrid } from 'quasar'
import { useGlobalStore } from 'stores/global'
import { useUserStore } from 'stores/user'

Loading.setDefaults({
  delay: 100,
  spinner: QSpinnerGrid,
  spinnerSize: 250,
  spinnerColor: 'blue-9',
  backgroundColor: 'brown-7',
})

Loading.show()

defineOptions({
  name: 'App',
})

Decimal.set({ rounding: Decimal.ROUND_DOWN, precision: 999 })

const $router = useRouter()
const storeGlobal = useGlobalStore()
const storeUser = useUserStore()

if (storeGlobal.app.environment == 'production') {
  storeGlobal.setting.cookies.options = {
    expires: 7,
    domain: 'customstory.online',
    sameSite: 'Strict',
    httpOnly: true,
    secure: true,
  }
} else {
  storeGlobal.setting.cookies.options = {
    expires: 1,
    sameSite: 'Lax',
    httpOnly: false,
    secure: false,
  }
}

storeUser.onAuthorization()

//$router.push("UserRegistrationCode");
//$router.push("UserRegistrationTimeHistory");
//$router.push("UserRegistrationHeroCreate");
//$router.push("UserSignInUp");

Loading.hide()
</script>
