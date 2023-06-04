<template>
  <canvas id="bjsCanvas" ref="bjsCanvas" width="500" height="500" />
</template>
<!-- -------------------------------------------------------------------------------- -->
<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { createScene, scene, hangAction, createMesh, enableGizmo4Mesh, disableGizmo4Mesh } from '../scenes/mainScene'
import { useMainStore } from '../stores/mainStore'

const meshList = [
  { type: 'sphere', params: { diameter: 2, segments: 32 }, position: { x: 0, y: 1 }, diffColor: { r: 1.0, g: 0.4, b: 0 }, onScene: {}, isSelected: false },
  { type: 'ground', params: { width: 8, height: 8 }, position: { x: 0, y: 0 }, diffColor: { r: 0, g: 0.6, b: 0.6 }, onScene: {}, isSelected: false }
]

// const selectedMesh = ref({})

export default defineComponent({
  name: 'MainScene',
  setup () {
    const $q = useQuasar()
    const bjsCanvas = ref(null)

    const mainStore = useMainStore()

    const switchTools = function () {
      disableGizmo4Mesh()
      if (mainStore.selectedTools !== 'cursore') {
        if (mainStore.selectedMesh.id !== undefined) {
          enableGizmo4Mesh()
        // console.log(`Selected tools is ${mainStore.selectedTools} and selected mesh is ${mainStore.selectedMesh.id}`)
        } else {
          mainStore.selectedTools = 'cursore'
          $q.notify({
            message: 'You must select mesh first.'
          })
        }
      }
    }

    watch(
      () => mainStore.selectedTools,
      (newValue, oldValue) => { switchTools() }
    )

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value)

        const canvas = document.getElementById('bjsCanvas')
        // const context = canvas.getContext('2d')
        window.addEventListener('resize', resizeCanvas, false)
        function resizeCanvas () {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight - 50
        }
        resizeCanvas()

        meshList.forEach(item => {
          item.onScene = createMesh(scene, item)
          hangAction(scene, item)
        })
      }
    })

    return {
      bjsCanvas,
      mainStore
    }
  },
  methods: {

  }

})
</script>
<!-- -------------------------------------------------------------------------------- -->
<style lang="scss">
#bjsCanvas {
  display: block;
  margin: 0 auto;
}
</style>
