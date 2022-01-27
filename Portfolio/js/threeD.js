import '/css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AlphaFormat, Sphere } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BufferGeometryLoader } from 'three';

const scene = new THREE.Scene();

// Camera and Window Setup
const sizes = {
  width: window.innerWidth * 1.45,
  height: window.innerHeight * 1.9
}

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, .1, 1000);

const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
})

// Camera Positioning
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
camera.position.setY(4)
camera.position.setX(3);
camera.position.setZ(11.5);

// Load Ojects
loader.load( 'FinalObject.glb', function ( gltf ) {
  
	scene.add( gltf.scene );

});

// Load Eyes
const geometry = new THREE.TorusGeometry(.05, .02, 16, 50);
const geo2 = new THREE.SphereGeometry( .5, 16, 8 );

const material2 = new THREE.MeshBasicMaterial( { color: 0x3DFE13 } );
material2.wireframe = true;
const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xFE0101),
  emissive: new THREE.Color(0xFE0101),
  emissiveIntensity: 8,
})

// Eyes Positioning
const eye = new THREE.Mesh(geometry, material);
eye.position.setX(-.4);
eye.position.setY(4.62);
eye.position.setZ(.7);
scene.add(eye);

const eyeTwo = new THREE.Mesh(geometry, material);
eyeTwo.position.setX(.4);
eyeTwo.position.setY(4.61);
eyeTwo.position.setZ(.73);
scene.add(eyeTwo);

const sphere = new THREE.Mesh(geo2, material2);
sphere.position.setX(-4.7);
sphere.position.setY(2.6);
sphere.position.setZ(2)
scene.add(sphere);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// Update sizes
window.addEventListener('resize', () =>
{

  sizes.width = window.innerWidth * 1.45
  sizes.height = window.innerHeight * 1.9

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Lighting
let light = new THREE.DirectionalLight(0xffffff, .9)
light.position.set(0, 10, 10)
light.target.position.set(0,0,0)
scene.add(light)
scene.add(light.target)

function animate() {
  requestAnimationFrame( animate );

  // Eye Rotaion
  eyeTwo.rotation.y += .02;
  eye.rotation.y += .02;

  // Sphere Rotation
  sphere.rotation.x += .001;
  sphere.rotation.y += .01 ;
  sphere.rotation.z += .001;

  controls.update();

  renderer.render( scene, camera );
}

animate();