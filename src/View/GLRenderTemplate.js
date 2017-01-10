import 'lib/OrbitControls.js';
import 'lib/loader/OBJLoader.js';
import * as dat from 'lib/dat.gui.min';
import Stats from 'lib/stats.min.js';
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["setScene", setRenderer] }] */

/**
 * @prop {THREE.Camera} camera
 * @prop {THREE.Scene} scene
 * @prop {THREE.WebGLRenderer} renderer
 * @prop { Array.<THREE.Controls> } controls
 * @prop {number} width
 * @prop {number} height
 * @prop {domElement} parent
 * @example
 * let view = new GLRenderTemplate();
 * view.appendTo( domElement );
 * view.animate();
 */
export default class GLRenderTemplate {
	constructor() {
		this.scene = this.setScene();
		this.camera = this.setCamera();
		this.renderer = this.setRenderer();
		this.controls = this.setControls();
		this.gui = new dat.GUI({ autoPlace: false });

		this.loadProps();
	}

	/**
	 * @param {HTMLElement} parent
	 */
	appendTo(parent){
		this.parent = parent;
		parent.appendChild(this.renderer.domElement);

		window.addEventListener('resize', ()=>{
			this.windowResize();
		});
		this.setUI();
		this.windowResize();
	}
	setUI() {
		this.stats = new Stats();
		this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		this.stats.dom.style.position = 'absolute'
		this.parent.appendChild(this.stats.dom);

		this.parent.appendChild(this.gui.domElement);
	}
	setCamera() {
		let camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 2000 );
		camera.position.set(5,5,5);

		return camera;
	}
	setControls() {
		let controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		controls.enableDamping = true;
		controls.dampingFactor = 1;

		return [ controls ];
	}
	setScene() {
		let scene = new THREE.Scene();
		return scene;
	}
	loadProps(){
		var geometry = new THREE.SphereBufferGeometry( 1, 8, 6 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
		var sphere = new THREE.Mesh( geometry, material );
		this.scene.add(sphere);
	}
	setRenderer() {
		let renderer = new THREE.WebGLRenderer();
		renderer.shadowMap.enabled = true;
		return renderer;
	}
	windowResize() {
		this.resizeAspect();
		this.resizeRenderer();
	}
	resizeRenderer() {
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.width, this.height );
	}
	resizeAspect(){
		let bbox = this.parent.getBoundingClientRect();
		this.width = bbox.width;
		this.height = window.innerHeight;
	}
	render() {
		this.stats.begin();

		this.controls.forEach( c => c.update() );



		this.renderer.render( this.scene, this.camera );

		this.stats.end();
	}
	animate(){
		//use .call or .apply will get max call stack error
		let animate = this.animate.bind(this);
		requestAnimationFrame(animate);
		this.render();
	}
}
