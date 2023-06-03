import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    selectedTools: '',
    selectedMesh: {}
  }),

  getters: {
    getSelectedTools (state) {
      return state.selectedTools
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
