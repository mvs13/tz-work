import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    selectedTools: '',
    selectedMesh: {},
    activeGizmo: {}
  }),

  getters: {
    getSelectedTools (state) {
      return state.selectedTools
    },
    getActiveGizmo (state) {
      return state.activeGizmo
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
