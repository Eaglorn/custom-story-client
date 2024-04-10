<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 500px">
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
                    !formValidate.email.$invalid || 'Не корректно введён email',
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
                    'Не корректно введён пароль',
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
                    'Не корректно введён текст',
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </template>
                </VueClientRecaptcha>
              </q-card>
              <div class="flex justify-center items-center">
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="primary"
                  label="Войти"
                  @click="onAuth"
                />
              </div>
              <div class="flex justify-center items-center">
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="green"
                  label="Зарегистрироваться"
                  @click="onReg"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
    {{ coord }}
  </q-page>
</template>

<style scoped lang="sass">
.form-input, .form-button
  margin-top: 10px
  margin-bottom: 10px
  width: 400px

.form-recaptcha
  margin-top: 10px
  margin-bottom: 10px
  width: 400px
</style>

<script>
import { defineComponent, ref, computed } from "vue";
import { Loading, Notify, Cookies } from "quasar";
import { api } from "boot/axios";
import VueClientRecaptcha from "vue-client-recaptcha";
import { useRouter } from "vue-router";
import { useVuelidate, required, maxLength } from "boot/vuelidate";

import { RandomCoord } from "boot/randomcoord";

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

    const formData = ref({ email: "", password: "", recaptcha: "" });

    const isPwd = ref(true);

    const coord = RandomCoord();

    /*const isValidPassword = function () {
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
    };*/

    const recaptchaText = ref("");
    const recaptchaValue = ref("");
    const recaptchaResult = ref(false);

    const mailValidate = (value) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      if (emailPattern.test(value)) {
        return true;
      }
      return false;
    };

    const passwordValidate = (value) => {
      const passwordPattern =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
      if (passwordPattern.test(value)) {
        return true;
      }
      return false;
    };

    const recaptchaValidate = (value) => {
      if (value == recaptchaValue.value) {
        return true;
      }
      return false;
    };

    const rules = computed(() => ({
      email: {
        required,
        max: maxLength(ref(40)),
        mailValidate,
      },
      password: {
        required,
        max: maxLength(ref(16)),
        passwordValidate,
      },
      recaptcha: {
        required,
        max: maxLength(ref(6)),
        recaptchaValidate,
      },
    }));

    const form = ref();

    const formValidate = useVuelidate(rules, formData);

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
          icon: "warning",
          timeout: 5000,
          textColor: "black",
        });
        Loading.hide();
      } else {
        api({
          method: "post",
          url: globalStore.getAjaxUri("user/authorization"),
          data: {
            email: formData.value.email,
            password: formData.value.password,
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
              Cookies.set("email", formEmail.value, {
                expires: 1,
                secure: true,
              });
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
          icon: "warning",
          timeout: 5,
          textColor: "black",
        });
        Loading.hide();
      } else {
        api({
          method: "post",
          url: globalStore.getAjaxUri("user/registration"),
          data: {
            email: formData.value.email,
            password: formData.value.password,
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
                userStore.email = formData.value.email;
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
      }
    };

    return {
      formData,
      form,
      formValidate,
      isPwd,
      recaptchaText,
      recaptchaValue,
      recaptchaResult,
      getCaptchaCode,
      checkValidCaptcha,
      onAuth,
      onReg,
      coord,
    };
  },
});
</script>
