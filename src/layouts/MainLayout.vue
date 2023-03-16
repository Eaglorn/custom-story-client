<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <i class="fa-brands fa-chrome"></i>
        <div>CustomStory v0.0.1</div>

        <q-space />

        <q-btn dense flat @click="minimize">
          <i class="fa-solid fa-window-minimize fa-2x"></i>
        </q-btn>
        <q-btn dense flat @click="toggleMaximize">
          <i class="fa-regular fa-square fa-2x"></i>
        </q-btn>
        <q-btn dense flat @click="closeApp">
          <i class="fa-solid fa-xmark-large fa-2x"></i>
        </q-btn>
      </q-bar>

      <div class="q-pa-sm q-pl-md row items-center">
        <div class="cursor-pointer non-selectable">
          Файл
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Открыть</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Создать</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable>
                <q-item-section>Настройки</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item dense clickable>
                      <q-item-section>Создать</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                    <q-item dense clickable>
                      <q-item-section>Сохранить</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                    <q-item dense clickable>
                      <q-item-section>Загрузить</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="closeApp">
                <q-item-section>Выйти</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <div class="q-ml-md cursor-pointer non-selectable">
          Редактрировать
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Вырезать</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Скопировать</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Вставить</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Выделить всё</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {};
  },
});
</script>
