import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight, ActionManager, ExecuteCodeAction, HighlightLayer, GizmoManager } from '@babylonjs/core'
import { useMainStore } from '../stores/mainStore'

let scene
let hightlightLayer
let gizmoManager

const mainStore = useMainStore()

const createScene = (canvas) => {
  const engine = new Engine(canvas)
  scene = new Scene(engine)

  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', Vector3.Up(), scene)
  light.intensity = 0.7

  hightlightLayer = new HighlightLayer('mainHightlightLayer', scene)

  gizmoManager = new GizmoManager(scene)

  engine.runRenderLoop(() => {
    scene.render()
  })
}

const hangAction = function (scene, meshObj) {
  const mesh = meshObj.onScene
  mesh.actionManager = new ActionManager(scene)

  mesh.actionManager.registerAction(
    new ExecuteCodeAction(
      ActionManager.OnPointerOverTrigger,
      () => {
        if (!meshObj.isSelected) {
          hightlightLayer.addMesh(mesh, Color3.White())
          // console.log(`Pointer over from ${mesh.id}`)
        }
      }
    )
  )
  mesh.actionManager.registerAction(
    new ExecuteCodeAction(
      ActionManager.OnPointerOutTrigger,
      () => {
        if (!meshObj.isSelected) {
          hightlightLayer.removeMesh(mesh)
          // console.log(`Pointer out from ${mesh.id}`)
        }
      }
    )
  )
  mesh.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
      if (meshObj.isSelected) {
        meshObj.isSelected = false
        mainStore.selectedMesh = {}
        hightlightLayer.removeMesh(mesh)
        hightlightLayer.addMesh(mesh, Color3.White())
      } else {
        meshObj.isSelected = true
        mainStore.selectedMesh = mesh
        hightlightLayer.removeMesh(mesh)
        hightlightLayer.addMesh(mesh, new Color3(1.0, 0.6, 0.2))
      }
      // console.log(mesh.id)
    })
  )
}

const createMesh = function (scene, meshObj) {
  let objOnScene
  switch (meshObj.type) {
    case 'sphere':
      objOnScene = MeshBuilder.CreateSphere('sphere', meshObj.params, scene)
      break
    case 'ground':
      objOnScene = MeshBuilder.CreateGround('ground', meshObj.params, scene)
      break
    default:
      break
  }

  objOnScene.position.x = meshObj.position.x
  objOnScene.position.y = meshObj.position.y

  const material = new StandardMaterial('box-material', scene)
  material.diffuseColor = new Color3(meshObj.diffColor.r, meshObj.diffColor.g, meshObj.diffColor.b)
  objOnScene.material = material

  return objOnScene
}

export { scene, createScene, hangAction, createMesh, gizmoManager }
