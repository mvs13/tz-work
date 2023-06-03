<template>
  <canvas id="bjsCanvas" ref="bjsCanvas" width="500" height="500" />
</template>
<!-- -------------------------------------------------------------------------------- -->
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { createScene } from '../scenes/mainScene'

export default defineComponent({
  name: 'MainScene',
  setup () {
    const bjsCanvas = ref(null)

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
      }
    })

    return {
      bjsCanvas
    }
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
