<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 500px">
        <q-card>
          <q-card-section>
            <q-form ref="form">
              <q-input
                class="form-input"
                v-model="formData.name"
                type="text"
                outlined
                label="Имя персонажа"
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.name.$invalid ||
                    'Имя не может быть более 20 символов',
                ]"
              />
              <q-select
                v-model="formData.sex"
                :options="optionsSex"
                label="Пол посонажа"
                outlined
                lazy-rules
                :rules="[
                  () => !formValidate.sex.$invalid || 'Необходимо выбрать пол',
                ]"
              />
              <q-select
                v-model="formData.first_attribute"
                :options="optionsAttribute"
                label="Основная характеристика"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.first_attribute.$invalid ||
                    'Необходимо выбрать характеристику',
                ]"
              />
              <q-select
                v-model="formData.second_attribute"
                :options="optionsAttribute"
                label="Второстепенная характеристика"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.second_attribute.$invalid ||
                    'Необходимо выбрать характеристику',
                ]"
              />
              <q-select
                v-model="formData.element"
                :options="optionsElement"
                label="Первоночальная стихия"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.element.$invalid ||
                    'Необходимо выбрать стихию',
                ]"
              />
              <div class="flex justify-center items-center">
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="positive"
                  label="Создать персонажа"
                  @click="onCreate"
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
.form-input, .form-button
  margin-top: 10px
  margin-bottom: 10px
  width: 400px
</style>

<script>
import { ref, computed } from "vue";
import { Loading, Notify, Cookies } from "quasar";
import { api } from "boot/axios";
import { useVuelidate, required, maxLength } from "boot/vuelidate";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { useGlobalStore } from "stores/global";

export default {
  name: "UserRegistrationHeroPage",
  setup() {
    const $router = useRouter();
    const storeGlobal = useGlobalStore();
    const storeuser = useUserStore();

    const formData = ref({
      name: "",
      sex: "",
      first_attribute: "",
      second_attribute: "",
      element: "",
    });

    const optionsSex = ["Муж", "Жен"];
    const optionsAttribute = ["Сила", "Выносливость", "Ловкость", "Разум"];
    const optionsElement = ["Огонь", "Воздух", "Вода", "Земля", "Тьма", "Свет"];

    const rules = computed(() => ({
      name: {
        required,
        max: maxLength(ref(20)),
      },
      sex: {
        required,
      },
    }));

    const form = ref();

    const formValidate = useVuelidate(rules, formData);

    const onCreate = function () {
      Loading.show();
      if (formValidate.value.$invalid) {
        form.value.submit();
        Notify.create({
          progress: true,
          color: "warning",
          position: "top",
          message: "Неправильно заполнены поля в форме",
          icon: "warning",
          timeout: storeGlobal.timeout.api.error.low,
          textColor: "black",
        });
        Loading.hide();
      } else {
        Loading.hide();
      }
    };

    return {
      formData,
      optionsSex,
      optionsAttribute,
      optionsElement,
      formValidate,
      form,
      onCreate,
    };
  },
};
</script>

<style scoped lang="sass"></style>
