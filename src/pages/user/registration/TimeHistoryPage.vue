<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <q-card>
          <q-card-section>
            <q-timeline color="secondary" class="timeline allods" dark="true">
              <q-timeline-entry heading body="Посмертие" />
              <q-timeline-entry
                v-for="item in pageText.data"
                :key="item.name"
                :title="item.name">
                {{ item.text }}
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn
              class="form-button shadow-2"
              style="width: 300px"
              color="primary"
              label="Перейти к созданию персонажа"
              @click="createHero" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { useGlobalStore } from 'stores/global'

defineOptions({
  name: 'UserRegistrationTimeHistory',
})

const pageText = ref({})

import('./assets/TimeHistory.json').then((data) => {
  pageText.value = data.default
})

const $router = useRouter()
const storeGlobal = useGlobalStore()
const storeUser = useUserStore()

const createHero = function () {
  api({
    method: 'post',
    url: storeGlobal.getAjaxUri('user/registration/history/read'),
    data: {
      email: storeUser.email,
      password: storeUser.password,
    },
    timeout: storeGlobal.timeout.api.response,
    responseType: 'json',
  })
    .then((response) => {
      if (response.data.success === true) {
        $router.push('UserRegistrationHeroCreate')
      } else {
        Notify.create({
          progress: true,
          color: 'negative',
          position: 'top',
          message: 'Ошибка. Попробуйте заного нажать кнопку.',
          icon: 'fa-solid fa-message-exclamation',
          timeout: storeGlobal.timeout.api.error.high,
        })
      }
      Loading.hide()
    })
    .catch(function () {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Нет соединения с сервером. Попробуйте отправить код ещё раз',
        icon: 'fa-solid fa-message-xmark',
        timeout: storeGlobal.timeout.api.error.high,
      })
      if (storeGlobal.app.environment == 'development') {
        console.log(err)
      }
      Loading.hide()
    })
}
</script>

<style scoped lang="sass">
.timeline
  font-size: 18px
</style>
