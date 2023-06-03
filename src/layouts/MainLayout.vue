<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://github.com/BabylonJS/Brand-Toolkit/blob/master/babylon_logo/fullColor/babylon_logo_color.png?raw=true">
          </q-avatar>
          {{ this.mainTitile }}
        </q-toolbar-title>
        <q-btn-toggle
        v-model="activeTools"
        push
        rounded
        glossy
        toggle-color="secondary"
        :options="[
          {value: 'cursore', slot: 'one'},
          {value: 'move', slot: 'two'},
          {value: 'rotate', slot: 'three'},
          {value: 'scale', slot: 'four'}
        ]"
      >
        <template v-slot:one>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Курсор
            </div>
            <q-icon right name="fa-solid fa-arrow-pointer" />
          </div>
        </template>

        <template v-slot:two>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Смещение
            </div>
            <q-icon right name="fa-solid fa-arrows-up-down-left-right" />
          </div>
        </template>

        <template v-slot:three>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Вращение
            </div>
            <q-icon right name="fa-solid fa-arrows-rotate" />
          </div>
        </template>

        <template v-slot:four>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Масштабирование
            </div>
            <q-icon right name="fa-solid fa-maximize" />
          </div>
        </template>
      </q-btn-toggle>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const mainTitile = 'Start with BabilonJS'

    return {
      mainTitile,
      activeTools: ref('cursore')
    }
  }
})
</script>
