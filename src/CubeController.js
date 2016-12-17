/* global THREE */
const UI = require('./UI')
class CubeController {
  constructor (scene) {
    this.scene = scene
    this._cubes = []
    this.numberOfObjects = 0
  }
  addCube () {
    const size = Math.ceil(Math.random() * 3)
    const geometry = new THREE.CubeGeometry(size, size, size)
    const manterial = new THREE.MeshLambertMaterial({color: Math.random * 0xffffff})
    const cube = new THREE.Mesh(geometry, manterial)
    cube.castShadow = true
    cube.name = `cube-${this.numberOfObjects}`
    const plane = this.scene.getObjectByName('plane')
    cube.position.x = -20 + Math.round((Math.random() * plane.geometry.parameters.width))
    cube.position.y = Math.round(Math.random() * 5)
    cube.position.z = -30 + Math.round((Math.random() * plane.geometry.parameters.height))

    this._cubes.push(cube)
    this.scene.add(cube)
    this.numberOfObjects += 1
  }
  remove () {
    let poped = this._cubes.pop()
    this.scene.remove(poped)
    this.numberOfObjects -= 1
  }
  update () {
    for (let i = this._cubes.length - 1; i >= 0; i--) {
      const cube = this._cubes[i]
      cube.rotation.x += UI.rotateSpeed
      cube.rotation.y += UI.rotateSpeed
      cube.rotation.z += UI.rotateSpeed
    }
  }
}
module.exports = CubeController
