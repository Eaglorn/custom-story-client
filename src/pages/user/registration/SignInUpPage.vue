<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 300px">
        <q-card>
          <q-card-section>
            <q-input
              class="form-input"
              v-model="formEmail"
              type="email"
              :rules="[
                (val) => !!val || '* Необходимо заполнить',
                (val) => val.length <= 40 || 'Не более 40 символов',
                () => isValidEmail(),
              ]"
              outlined
              label="Электронный почтовый ящик *"
            />
            <q-input
              class="form-input"
              v-model="formPassword"
              :rules="[
                (val) => !!val || '* Необходимо заполнить',
                (val) => val.length <= 16 || 'Не более 16 символов',
                () => isValidPassword(),
              ]"
              outlined
              label="Пароль *"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <i
                  class="fa-solid"
                  v-bind:class="{ 'fa-eye': isPwd, 'fa-eye-slash': !isPwd }"
                  @click="isPwd = !isPwd"
                ></i>
              </template>
            </q-input>
            <VueClientRecaptcha
              class="form-recaptcha"
              :value="recaptchaText"
              :count="6"
              @getCode="getCaptchaCode"
              @isValid="checkValidCaptcha"
            >
              <template #icon>
                <q-btn
                  round
                  color="brown-5"
                  icon="fa-solid fa-arrows-rotate fa-2x fa-spin"
                  style="--fa-animation-duration: 25s"
                >
                  <q-tooltip
                    class="bg-indigo"
                    :offset="[10, 10]"
                    style="font-size: 16px !important"
                  >
                    Обновить Капчу
                  </q-tooltip>
                </q-btn>
              </template>
            </VueClientRecaptcha>
            <q-input
              class="form-input"
              v-model="recaptchaText"
              type="text"
              :rules="[
                (val) => !!val || '* Необходимо заполнить',
                (val) => val.length <= 6 || 'Не более 6 символов',
                (val) => val == recaptchaValue || 'Неправильно набран текст',
              ]"
              outlined
              label="Введите текст указанный на картинке"
            />
            <q-btn
              class="form-button shadow-2"
              style="width: 300px"
              color="primary"
              label="Войти"
              @click="onAuth"
            />
            <q-btn
              class="form-button shadow-2"
              style="width: 300px"
              color="primary"
              label="Зарегистрироваться"
              @click="onReg"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.form-input, .form-button
  margin-top: 10px
  margin-bottom: 10px

.form-recaptcha
  display: grid
  grid-template-columns: 50px 0px
  margin-top: 40px
</style>

<script>
import { defineComponent, ref } from "vue";
import { Loading, Notify, Cookies } from "quasar";
import { api } from "boot/axios";
import VueClientRecaptcha from "vue-client-recaptcha";
import { useRouter } from "vue-router";

import { useGlobalStore } from "stores/global";
import { useUserStore } from "stores/user";

export default defineComponent({
  name: "UserRegistrationSignInUpPage",
  components: {
    VueClientRecaptcha,
  },
  setup() {
    const $router = useRouter();
    const globalStore = useGlobalStore();
    const userStore = useUserStore();

    var formEmail = ref("");
    var formPassword = ref("");
    const isPwd = ref(true);

    const isValidEmail = function () {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return (
        emailPattern.test(formEmail.value) ||
        "Не верно введён электронный почтовый ящик"
      );
    };

    const isValidPassword = function () {
      const passwordPattern =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      return (
        passwordPattern.test(formPassword.value) ||
        "Пароль должен состоять не менее чем из 8 символов, " +
          "хотя бы одна заглавная латинская буква, " +
          "хотя бы одна строчная латинская буква, " +
          "как минимум из одной цифры, " +
          "хотя бы один специальный символ."
      );
    };

    const recaptchaText = ref("");
    const recaptchaValue = ref("");
    const recaptchaResult = ref(false);

    const getCaptchaCode = (value) => {
      recaptchaText.value = "";
      recaptchaValue.value = value;
    };
    const checkValidCaptcha = (value) => {
      recaptchaResult.value = value;
    };

    const onAuth = function () {
      if (!recaptchaResult.value) return;
      Loading.show();
      api({
        method: "post",
        url: globalStore.getAjaxUri("user/authorization"),
        data: {
          email: formEmail.value,
          password: formPassword.value,
          socket: userStore.socket,
        },
        timeout: 10000,
        responseType: "json",
      })
        .then((response) => {
          if (response.data.success === true) {
            userStore.$patch({
              auth: true,
              type: response.data.type,
            });
            Cookies.set("email", formEmail.value, { expires: 1, secure: true });
            Cookies.set("password", formPassword.value, {
              expires: 3,
              secure: true,
            });
            Loading.hide();
          } else {
            if (response.data.email === false) {
              Notify.create({
                progress: true,
                color: "negative",
                position: "top",
                message:
                  "Введённый электронный почтовый ящик не зарегистрирован.",
                icon: "report_problem",
              });
            } else if (response.data.password === false) {
              Notify.create({
                progress: true,
                color: "negative",
                position: "top",
                message: "Неверно набран пароль.",
                icon: "report_problem",
              });
            }
            Loading.hide();
          }
        })
        .catch(function () {
          Loading.hide();
          Notify.create({
            color: "negative",
            position: "top",
            message:
              "Нет соединения с сервером. Попробуйте выполнить регистрацию ещё раз",
            icon: "report_problem",
          });
        });
    };

    const onReg = function () {
      if (!recaptchaResult.value) return;
      Loading.show();
      api({
        method: "post",
        url: globalStore.getAjaxUri("user/registration"),
        data: {
          email: formEmail.value,
          password: formPassword.value,
          socket: userStore.socket,
        },
        timeout: 10000,
        responseType: "json",
      })
        .then((response) => {
          if (response.data.registration_email === true) {
            Notify.create({
              progress: true,
              color: "negative",
              position: "top",
              message:
                "Введённый электронный почтовый ящик находится на этапе регистрации. Попробуйте зарегистрироваться под другим электронным почтовым ящиком. Если это вы регистрировали введённый электронный почтовый ящик, попробуйте заного выполнить регистрацию через 60 минут.",
              icon: "report_problem",
            });
          } else {
            if (response.data.success === true) {
              userStore.email = formEmail.value;
              $router.push("UserRegistrationCode");
            } else {
              Notify.create({
                progress: true,
                color: "negative",
                position: "top",
                message: "Введённый электронный почтовый ящик занят",
                icon: "report_problem",
              });
            }
          }
          Loading.hide();
        })
        .catch(function () {
          Notify.create({
            color: "negative",
            position: "top",
            message:
              "Нет соединения с сервером. Попробуйте выполнить регистрацию ещё раз",
            icon: "report_problem",
          });
          Loading.hide();
        });
    };

    return {
      formEmail,
      formPassword,
      isPwd,
      isValidEmail,
      isValidPassword,
      recaptchaText,
      recaptchaValue,
      recaptchaResult,
      getCaptchaCode,
      checkValidCaptcha,
      onAuth,
      onReg,
    };
  },
});
</script>
