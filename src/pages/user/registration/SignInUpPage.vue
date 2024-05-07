<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 600px">
        <q-card>
          <q-card-section>
            <q-form ref="form">
              <q-input
                class="form-input"
                v-model="formData.email"
                type="email"
                outlined
                label="Электронный почтовый ящик *"
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.email.$invalid ||
                    validateMessage(formValidate.email),
                ]"
              />
              <q-input
                class="form-input"
                v-model="formData.password"
                outlined
                label="Пароль *"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.password.$invalid ||
                    validateMessage(formValidate.password),
                ]"
              >
                <template v-slot:append>
                  <i
                    class="fa-solid"
                    v-bind:class="{ 'fa-eye': isPwd, 'fa-eye-slash': !isPwd }"
                    @click="isPwd = !isPwd"
                  ></i>
                </template>
              </q-input>
              <q-input
                class="form-input"
                v-model="formData.recaptcha"
                type="text"
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.recaptcha.$invalid ||
                    validateMessage(formValidate.recaptcha),
                ]"
                outlined
                label="Введите текст указанный на картинке"
              />
              <q-card>
                <VueClientRecaptcha
                  class="form-recaptcha flex items-center"
                  :value="recaptchaText"
                  :count="6"
                  @getCode="getCaptchaCode"
                  @isValid="checkValidCaptcha"
                >
                  <template #icon>
                    &nbsp;&nbsp;&nbsp;
                    <q-btn
                      round
                      color="brown-3"
                      icon="fa-solid fa-arrows-rotate fa-2x fa-spin"
                      style="--fa-animation-duration: 15s"
                    >
                      <q-tooltip
                        class="primary"
                        :offset="[10, 10]"
                        style="font-size: 16px !important"
                      >
                        Обновить Капчу
                      </q-tooltip>
                    </q-btn>
                    <div style="width: 200px"></div>
                  </template>
                </VueClientRecaptcha>
              </q-card>
              <div>
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="primary"
                  label="Войти"
                  @click="onAuth"
                />
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="positive"
                  label="Зарегистрироваться"
                  @click="onReg"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.form-input, .form-button, .form-recaptcha
  margin-top: 25px
  margin-bottom: 25px

.form-button
  margin-left: 15px
  margin-right: 15px
</style>

<script setup>
import { ref, computed } from "vue";
import { Loading, Notify, SessionStorage } from "quasar";
import { api } from "boot/axios";
import VueClientRecaptcha from "vue-client-recaptcha";
import { useRouter } from "vue-router";
import { isEmail } from "boot/validator";
import {
  useVuelidate,
  required,
  minLength,
  maxLength,
  helpers,
} from "boot/vuelidate";

import { useGlobalStore } from "stores/global";
import { useUserStore } from "stores/user";

defineOptions({
  name: "UserRegistrationSignUpPage",
});

const $router = useRouter();
const storeGlobal = useGlobalStore();
const storeUser = useUserStore();

const formData = ref({ email: "", password: "", recaptcha: "" });

const isPwd = ref(true);

const recaptchaText = ref("");
const recaptchaValue = ref("");
const recaptchaResult = ref(false);

const mailValidate = (value) => {
  return isEmail(value);
};
const recaptchaValidate = (value) => {
  return value == recaptchaValue.value;
};

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Необходимо заполнить поле. ", required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Электронный почтовый ящик не может быть менее ${$params.min} символов. `,
      minLength(5),
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Электронный почтовый ящик не может превышать ${$params.max} символов. `,
      maxLength(40),
    ),
    mailValidate: helpers.withMessage(
      "Не корректно ввведён электронный почтовый ящик. ",
      mailValidate,
    ),
  },
  password: {
    required: helpers.withMessage("Необходимо заполнить поле. ", required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Пароль не может быть менее ${$params.min} символов. `,
      minLength(8),
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Пароль не может превышать ${$params.max} символов. `,
      maxLength(16),
    ),
  },
  recaptcha: {
    required: helpers.withMessage("Необходимо заполнить поле. ", required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина кода капчи не может быть менее ${$params.min} символов. `,
      minLength(6),
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина кода капчи не может превышать ${$params.max} символов. `,
      maxLength(6),
    ),
    recaptchaValidate: helpers.withMessage(
      "Не корректно введена капча. ",
      recaptchaValidate,
    ),
  },
}));

const form = ref();

const formValidate = useVuelidate(rules, formData);

const validateMessage = (value) => {
  try {
    let message = "";
    value.$silentErrors.forEach((error) => {
      if (error.$message.value != undefined) {
        message += error.$message.value;
      } else {
        message += error.$message;
      }
    });

    return message;
  } catch (err) {
    console.log(err);
  }
};

const getCaptchaCode = (value) => {
  recaptchaText.value = "";
  recaptchaValue.value = value;
};
const checkValidCaptcha = (value) => {
  recaptchaResult.value = value;
};

const onAuth = function () {
  Loading.show();
  if (formValidate.value.$invalid) {
    form.value.submit();
    Notify.create({
      progress: true,
      color: "warning",
      position: "top",
      message: "Неправильно заполнены поля в форме",
      icon: "fa-solid fa-message-exclamation",
      timeout: storeGlobal.timeout.api.error.low,
      textColor: "black",
    });
    Loading.hide();
  } else {
    api({
      method: "post",
      url: storeGlobal.getAjaxUri("user/authorization"),
      data: {
        email: formData.value.email,
        password: formData.value.password,
      },
      timeout: storeGlobal.timeout.api.response,
      responseType: "json",
    })
      .then((response) => {
        if (!response.data.registration) {
          if (response.data.success) {
            storeUser.$patch({
              email: formData.value.email,
              password: formData.value.password,
            });
            switch (response.data.type) {
              case "write_code": {
                $router.push("UserRegistrationCode");
                break;
              }
              case "history_read": {
                $router.push("UserRegistrationTimeHistory");
                break;
              }
              case "hero_create": {
                $router.push("UserRegistrationHeroCreate");
                break;
              }
            }
          } else if (!response.data.password) {
            Notify.create({
              progress: true,
              color: "warning",
              position: "top",
              message: "Не верно введён пароль.",
              icon: "fa-solid fa-message-exclamation",
              timeout: storeGlobal.timeout.api.error.low,
              textColor: "black",
            });
          }
        } else if (response.data.success) {
          storeUser.$patch({
            auth: true,
            type: response.data.type,
          });
          SessionStorage.set("email", formData.value);
          SessionStorage.set("password", formData.value);
          $router.push("UserProfile");
        } else if (!response.data.email) {
          Notify.create({
            progress: true,
            color: "warning",
            position: "top",
            message:
              "Учётная запись с введёным почтовым ящиком не зарегистрирована.",
            icon: "fa-solid fa-message-exclamation",
            timeout: storeGlobal.timeout.api.error.low,
            textColor: "black",
          });
        } else if (!response.data.password) {
          Notify.create({
            progress: true,
            color: "warning",
            position: "top",
            message: "Не верно введён пароль.",
            icon: "fa-solid fa-message-exclamation",
            timeout: storeGlobal.timeout.api.error.low,
            textColor: "black",
          });
        }
        Loading.hide();
      })
      .catch(function () {
        Notify.create({
          color: "negative",
          position: "top",
          message:
            "Нет соединения с сервером. Попробуйте выполнить регистрацию ещё раз",
          icon: "fa-solid fa-circle-exclamation",
          timeout: storeGlobal.timeout.api.error.high,
          textColor: "black",
        });
        Loading.hide();
      });
  }
};

const onReg = function () {
  Loading.show();
  if (formValidate.value.$invalid) {
    form.value.submit();
    Notify.create({
      progress: true,
      color: "warning",
      position: "top",
      message: "Неправильно заполнены поля в форме",
      icon: "fa-solid fa-message-exclamation",
      textColor: "black",
      timeout: storeGlobal.timeout.api.error.low,
    });
    Loading.hide();
  } else {
    api({
      method: "post",
      url: storeGlobal.getAjaxUri("user/registration"),
      data: {
        email: formData.value.email,
        password: formData.value.password,
      },
      timeout: storeGlobal.timeout.api.response,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.success) {
          storeUser.email = formData.value.email;
          storeUser.password = formData.value.password;
          $router.push("UserRegistrationCode");
        } else if (response.data.registration) {
          if (!response.data.password) {
            Notify.create({
              progress: true,
              color: "warning",
              position: "top",
              message:
                "Учётная запись с введённым почтовым ящиком находится на стадии регистрации. Вы ввели неправильно пароль. Если вы забыли пароль, подождите 6 часов. Далее почтовый ящик будет высвобожден и вы сможете начать регистрацию заного.",
              icon: "fa-solid fa-message-exclamation",
              textColor: "black",
              timeout: storeGlobal.timeout.api.error.low,
            });
          }
        } else if (!response.data.email) {
          Notify.create({
            progress: true,
            color: "warning",
            position: "top",
            message:
              "Учётная запись с введённым почтовым ящиком уже зарегистрирована.",
            icon: "fa-solid fa-message-exclamation",
            textColor: "black",
            timeout: storeGlobal.timeout.api.error.low,
          });
        }
        Loading.hide();
      })
      .catch(function () {
        Notify.create({
          color: "negative",
          position: "top",
          message:
            "Нет соединения с сервером. Попробуйте выполнить регистрацию ещё раз",
          icon: "fa-solid fa-circle-exclamation",
          timeout: storeGlobal.timeout.api.error.high,
          textColor: "black",
        });
        Loading.hide();
      });
  }
};
</script>
