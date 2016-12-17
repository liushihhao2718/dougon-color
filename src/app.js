import './lib/OrbitControls.js';
import './lib/loader/ColladaLoader2.js';
import './lib/loader/OBJLoader.js';
import * as dat from './lib/dat.gui.min';
import Stats from './lib/stats.min.js';

let stats = new Stats();
let camera, scene, renderer, controls;
loadLib();
init();
animate();

function loadLib() {
	
}
function init() {
	setUI();
	setCamera();
	setScene();	
	setRenderer();
	setControl();
	//
	window.scene = scene;
	document.getElementById('gl_container').appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}
function setUI() {
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(stats.domElement);

	let gui = new dat.GUI();
	window.datgui = gui;
}
function setCamera() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set(5,5,5);
}
function setControl() {
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 1;
	controls.enableZoom = false;
}
function setScene() {
	scene = new THREE.Scene();
	const loadPredefined = require('./setEntity.js');
	loadPredefined(scene);
}
function setRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {

	stats.begin();

	controls.update();
	render();

	stats.end();
	requestAnimationFrame( animate );
}
function render() {
	renderer.render( scene, camera );
}
