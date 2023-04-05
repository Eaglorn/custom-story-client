<template>
  <q-page class="page">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 700px">
        <div class="alert alert-info shadow-lg">
          <i class="fa-regular fa-circle-info my-fa-size"></i>
          <span>
            На ваш электронный почтовый ящик выслано сообщение с кодом. Для
            подтверждения регистрации необходимо в находящееся ниже поле ввести
            полученный код. Код существует 60 минут.
          </span>
        </div>
        <br />
        <q-card style="width: 100%; max-width: 350px">
          <q-card-section>
            <q-input
              class="form-input"
              v-model="code"
              type="text"
              outlined
              label="Введите код полученный в сообщении"
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

<script>
import { ref } from "vue";
// import { useUserStore } from 'stores/user';
// import { useGlobalStore } from 'stores/global';

export default {
  name: "UserRegistration",
  setup() {
    // const globalStore = useGlobalStore();
    // const userStore = useUserStore();

    // TODO Сделать запрос подтверждения введённого кода регистрации

    const code = ref("");

    return { code };
  },
};
</script>
