<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <q-card class="my-card">
          <q-card-section>
            <div class="alert alert-info shadow-lg">
              <i
                class="fa-regular fa-circle-info my-fa-size"
                style="color: orangered"></i>
              <span style="font-size: 17px">
                На ваш электронный почтовый ящик выслано сообщение с кодом. Для
                подтверждения регистрации необходимо в находящееся ниже поле
                ввести полученный код. Учётная запись в режиме регистрации будет
                храниться 6 часов. Регистрация завершится после создания
                персонажа.
              </span>
            </div>
          </q-card-section>
        </q-card>
        <br />
        <q-card class="my-card">
          <q-card-section>
            <q-form ref="form">
              <q-input
                v-model="formData.code"
                class="form-input"
                type="text"
                outlined
                label="Введите код полученный в сообщении"
                :rules="[
                  () =>
                    !formValidate.code.$invalid ||
                    validateMessage(formValidate.code),
                ]" />
              <q-btn
                class="form-button shadow-2"
                style="width: 300px"
                color="primary"
                label="Завершить регистрацию"
                @click="endRegistration" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Loading, Notify } from 'quasar'
import { api } from 'boot/axios'
import { isUUID } from 'boot/validator'
import {
  useVuelidate,
  required,
  minLength,
  maxLength,
  helpers,
} from 'boot/vuelidate'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { useGlobalStore } from 'stores/global'

defineOptions({
  name: 'UserRegistrationCodePage',
})

const $router = useRouter()
const storeGlobal = useGlobalStore()
const storeUser = useUserStore()

const formData = ref({ code: '' })

const codeUUIDValidate = (value) => {
  return isUUID(value, 4)
}

const rules = computed(() => ({
  code: {
    required: helpers.withMessage('Необходимо заполнить поле. ', required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Код не может быть менее ${$params.min} символов. `,
      minLength(36)
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Код не может превышать ${$params.max} символов. `,
      maxLength(36)
    ),
    mailCorrectValidate: helpers.withMessage(
      'Не корректно ввведён код. ',
      codeUUIDValidate
    ),
  },
}))

const form = ref()

const formValidate = useVuelidate(rules, formData)

const validateMessage = (value) => {
  try {
    let message = ''
    value.$silentErrors.forEach((error) => {
      if (error.$message.value != undefined) {
        message += error.$message.value
      } else {
        message += error.$message
      }
    })

    return message
  } catch (err) {
    console.log(err)
  }
}

const endRegistration = function () {
  Loading.show()
  if (formValidate.value.$invalid) {
    form.value.submit()
    Notify.create({
      progress: true,
      color: 'warning',
      position: 'top',
      message: 'Неправильно заполнены поля в форме',
      icon: 'fa-solid fa-message-exclamation',
      timeout: storeGlobal.timeout.api.error.low,
      textColor: 'black',
    })
    Loading.hide()
  } else {
    api({
      method: 'post',
      url: storeGlobal.getAjaxUri('user/registration/check/code'),
      data: {
        email: storeUser.email,
        password: storeUser.password,
        code: formData.value.code,
      },
      timeout: storeGlobal.timeout.api.response,
      responseType: 'json',
    })
      .then((response) => {
        if (response.data.success === true) {
          $router.push('UserRegistrationTimeHistory')
        } else {
          Notify.create({
            progress: true,
            color: 'negative',
            position: 'top',
            message: 'Не верно введён код',
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
          message:
            'Нет соединения с сервером. Попробуйте отправить код ещё раз',
          icon: 'fa-solid fa-message-xmark',
          timeout: storeGlobal.timeout.api.error.high,
        })
        if (storeGlobal.app.environment == 'development') {
          console.log(err)
        }
        Loading.hide()
      })
  }
}
</script>

<style scoped lang="sass">
.my-card
  width: 100%
  max-width: 450px

.form-input
  font-size: 18px

.form-input, .form-button
  margin-top: 25px
  margin-bottom: 25px

.form-button
  margin-left: 60px

.page
  padding: 10px
.my-fa-size
  font-size: 20px
</style>
