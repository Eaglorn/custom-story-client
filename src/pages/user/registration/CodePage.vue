<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <div class="alert alert-info shadow-lg">
          <i class="fa-regular fa-circle-info my-fa-size"></i>
          <span>
            На ваш электронный почтовый ящик выслано сообщение с кодом. Для
            подтверждения регистрации необходимо в находящееся ниже поле ввести
            полученный код. Ёчётная запись в режиме регистрации будет храниться
            двое суток. Регистрация завершится после создания персонажа.
          </span>
        </div>
        <br />
        <q-card style="width: 100%; max-width: 350px">
          <q-card-section>
            <q-input
              class="form-input"
              v-model="formCode"
              type="text"
              outlined
              label="Введите код полученный в сообщении"
            />
            <q-btn
              class="form-button shadow-2"
              style="width: 300px"
              color="primary"
              label="Завершить регистрацию"
              @click="endRegistration"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.page
  padding: 10px
.my-fa-size
  font-size: 20px
</style>

<script setup>
import { ref } from "vue";
import { Loading, Notify } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { useGlobalStore } from "stores/global";

defineOptions({
  name: "UserRegistrationCodePage",
});

const $router = useRouter();
const storeGlobal = useGlobalStore();
const storeUser = useUserStore();

const formCode = ref("");

const endRegistration = function () {
  Loading.show();
  api({
    method: "post",
    url: storeGlobal.getAjaxUri("user/registration/check/code"),
    data: {
      email: storeUser.email,
      password: storeUser.password,
      code: formCode.value,
    },
    timeout: storeGlobal.timeout.api.response,
    responseType: "json",
  })
    .then((response) => {
      if (response.data.success === true) {
        $router.push("UserRegistrationTimeHistory");
      } else {
        Notify.create({
          progress: true,
          color: "negative",
          position: "top",
          message: "Не верно введён код",
          icon: "fa-solid fa-message-exclamation",
          timeout: storeGlobal.timeout.api.error.high,
        });
      }
      Loading.hide();
    })
    .catch(function () {
      Notify.create({
        color: "negative",
        position: "top",
        message: "Нет соединения с сервером. Попробуйте отправить код ещё раз",
        icon: "fa-solid fa-message-xmark",
        timeout: storeGlobal.timeout.api.error.high,
      });
      if (storeGlobal.app.environment == "development") {
        console.log(err);
      }
      Loading.hide();
    });
};
</script>
