import * as THREE from '../three.module.js'
import { STLLoader } from '../STLLoader.js'
import { OrbitControls } from '../OrbitControls.js'

let scene, camera, renderer, object
let loader = new STLLoader()

const init = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x2a003b)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )
  camera.position.z = 10

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  
  scene.add(object)

  new OrbitControls(camera, renderer.domElement)
  let lightFront = new THREE.DirectionalLight(0xffffff)
  let lightBack = new THREE.DirectionalLight(0xffffff)
  lightFront.position.set(0, 0, 10)
  lightBack.position.set(0, 0, -10)
  scene.add(lightFront)
  scene.add(lightBack)
  
  const resizeRender = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }
  window.addEventListener('resize', resizeRender)
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

// MODEL https://www.thingiverse.com/thing:4038181
loader.load('./3dModel/Baby_Yoda_v2.2.stl', (model) => {
  // un modelo 3d es representado con un mesh | El mesh tiene un geometria y un material
  object = new THREE.Mesh(
    model,
    new THREE.MeshLambertMaterial({
      color: 0x00ff00
    })
  )
  object.scale.set(0.1, 0.1, 0.1)
  object.position.set(0, -4, 0)
  object.rotation.x = -(Math.PI / 2)
  init()
})
