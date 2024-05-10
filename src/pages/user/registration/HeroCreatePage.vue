<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 500px">
        <q-card>
          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="fa-solid fa-question"
              class="absolute"
              style="top: 0; right: 0; transform: translate3d(50%, -50%, 0)"
              @click="dialogHelp = !dialogHelp">
              <q-tooltip
                class="positive"
                :offset="[-10, -10]"
                style="font-size: 16px !important">
                Помощь по созданию персонажа
              </q-tooltip>
            </q-btn>
            <q-form ref="form">
              <q-input
                v-model="formData.name"
                class="form-input"
                type="text"
                outlined
                label="Имя персонажа"
                lazy-rules
                :rules="[
                  () =>
                    !formValidate.name.$invalid ||
                    validateMessage(formValidate.name),
                ]" />
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
                ]" />
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
                ]" />
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
                ]" />
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
                ]" />
              <div class="flex justify-center items-center">
                <q-btn
                  class="form-button shadow-2"
                  style="width: 200px"
                  color="positive"
                  label="Создать персонажа"
                  @click="onCreate" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="dialogHelp" :backdrop-filter="backdropFilter">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <i class="fa-solid fa-person-rays fa-2x" />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-weight-bold">Помощь по созданию персонажа</span>
        </q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="fa-solid fa-circle-xmark" />
      </q-toolbar>
      <q-card-section class="dialog-body">
        <br />
        <b>Сила</b> — это способность к физическим нагрузкам и нанесению урона в
        ближнем бою. <br /><br />
        <b>Выносливость</b> — это способность выдерживать длительные нагрузки и
        быстро восстанавливаться после ранений. Персонаж с высокой Выносливостью
        может дольше сражаться и выдерживать более суровые условия окружающей
        среды. <br /><br />
        <b>Ловкость</b> — это гибкость, скорость и координация персонажа.
        <br /><br />
        <b>Разум</b> — это умственные способности персонажа, его способность к
        обучению, анализу и решению сложных задач. <br /><br />
        <hr />
        <br />
        Каждое действие персонажа может зависеть от разных пропорций четырёх
        основных характеристик: силы, выносливости, ловкости и разума.
        <br /><br />
        При выполнении действий будут расти характеристики, которые в них
        задействованы. Чем выше становится характеристика, тем сложнее её
        повышать.
        <br /><br />
        Выберите две характеристики: основную и дополнительную. Именно на эти
        характеристики вы делали упор при обучении. Также определитесь со
        стихией, с которой вы начнёте исследование миров.
        <br /><br />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Loading, Notify } from 'quasar'
import {
  useVuelidate,
  required,
  minLength,
  maxLength,
  helpers,
} from 'boot/vuelidate'
import { isAlpha } from 'boot/validator'
import { useGlobalStore } from 'stores/global'

defineOptions({
  name: 'UserRegistrationHeroCreatePage',
})

const storeGlobal = useGlobalStore()

const dialogHelp = ref(false)
const backdropFilter = ref('blur(2px) brightness(90%)')

const formData = ref({
  name: '',
  sex: '',
  first_attribute: '',
  second_attribute: '',
  element: '',
})

const optionsSex = ['Муж', 'Жен']
const optionsAttribute = ['Сила', 'Выносливость', 'Ловкость', 'Разум']
const optionsElement = ['Огонь', 'Воздух', 'Вода', 'Земля']

const nameAlphaValidate = (value) => {
  return isAlpha(value, 'en-US') || isAlpha(value, 'ru-RU')
}

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Необходимо заполнить поле. ', required),
    min: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина имени не может быть менее ${$params.min} символов. `,
      minLength(4)
    ),
    max: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Длина имени не может быть более ${$params.max} символов. `,
      maxLength(20)
    ),
    nameAlphaValidate: helpers.withMessage(
      'Имя персонажа может состоять только из букв русского или английского алфавита. ',
      nameAlphaValidate
    ),
  },
  sex: {
    required: helpers.withMessage('Необходимо заполнить поле.', required),
  },
  first_attribute: {
    required: helpers.withMessage('Необходимо заполнить поле.', required),
  },
  second_attribute: {
    required: helpers.withMessage('Необходимо заполнить поле.', required),
  },
  element: {
    required: helpers.withMessage('Необходимо заполнить поле.', required),
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

const onCreate = function () {
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
    Loading.hide()
  }
}
</script>

<style scoped lang="sass">
.form-input, .form-button
  margin-top: 10px
  margin-bottom: 10px
  width: 400px

.dialog-body
  font-size: 20px
</style>

<style scoped lang="sass"></style>
