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
                    validateMessage(formValidate.name),
                ]"
              />
              <q-select
                v-model="formData.sex"
                :options="optionsSex"
                label="Пол посонажа"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.sex.$invalid ||
                    validateMessage(formValidate.sex),
                ]"
              />
              <q-select
                v-model="formData.first_attribute"
                :options="optionsAttribute"
                label="Дополнительный первичный атрибут"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.first_attribute.$invalid ||
                    validateMessage(formValidate.first_attribute),
                ]"
              />
              <q-select
                v-model="formData.second_attribute"
                :options="optionsAttribute"
                label="Дополнительный вторичный атрибут"
                outlined
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.second_attribute.$invalid ||
                    validateMessage(formValidate.second_attribute),
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
                    validateMessage(formValidate.element),
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
  <q-dialog v-model="dialogHelp">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" alt="error" />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-weight-bold">Помощь по созданию персонажа</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section> ТЕКСТ </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="sass">
.form-input, .form-button
  margin-top: 10px
  margin-bottom: 10px
  width: 400px
</style>

<script setup>
import { ref, computed } from "vue";
import { Loading, Notify } from "quasar";
import {
  useVuelidate,
  required,
  minLength,
  maxLength,
  helpers,
} from "boot/vuelidate";
import { useGlobalStore } from "stores/global";

defineOptions({
  name: "UserRegistrationHeroCreatePage",
});

const storeGlobal = useGlobalStore();

const dialogHelp = ref(false);

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
    required: helpers.withMessage("Необходимо заполнить поле. ", required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина имени не может быть менее ${$params.min} символов. `,
      minLength(4),
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина имени не может быть более ${$params.max} символов. `,
      maxLength(20),
    ),
  },
  sex: {
    required: helpers.withMessage("Необходимо заполнить поле.", required),
  },
  first_attribute: {
    required: helpers.withMessage("Необходимо заполнить поле.", required),
  },
  second_attribute: {
    required: helpers.withMessage("Необходимо заполнить поле.", required),
  },
  element: {
    required: helpers.withMessage("Необходимо заполнить поле.", required),
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
</script>

<style scoped lang="sass"></style>
