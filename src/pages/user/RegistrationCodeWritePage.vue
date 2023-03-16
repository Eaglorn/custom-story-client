<template>
  <q-page class="page">
    <div class="alert alert-info shadow-lg">
      <i class="fa-regular fa-circle-info my-fa-size"></i>
      <span>
        На ваш электронный почтовый ящик выслано сообщение с кодом. Для
        подтверждения регистрации необходимо в находящееся ниже поле ввести
        полученный код. Код существует 60 минут.
      </span>
    </div>
    <q-input
      class="form-input"
      v-model="code"
      type="text"
      outlined
      label="Введите код полученный в сообщении"
    />
  </q-page>
</template>

<style scoped lang="sass">
.page
  padding: 10px
.my-fa-size
  font-size: 20px
</style>

<script>
import { ref } from 'vue';
// import { useUserStore } from 'stores/user';
// import { useGlobalStore } from 'stores/global';

export default {
  name: 'UserRegistration',
  setup() {
    // const globalStore = useGlobalStore();
    // const userStore = useUserStore();

    const code = ref('');

    return { code };
  },
};
</script>
