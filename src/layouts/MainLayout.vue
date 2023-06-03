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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const mainTitile = 'Start with BabilonJS'

    return {
      mainTitile
    }
  }
})
</script>
