import 'lib/loader/ColladaLoader2.js';

/**@type {THREE.Scene} scene */
let scene;

/** @callback 
 *  @param {THREE.Group} group
*/
let _callback;
export default function (_scene) {
	scene = _scene;
	setLight();

	loadDAE();
	return { onObjectFileLoaded	}
}

function setLight() {
	var ambient = new THREE.AmbientLight( 0xa0a0a0 );

	var directionalLight = new THREE.DirectionalLight( 0xeeeedd );
	directionalLight.position.set( 5, 1, 1 );
	directionalLight.castShadow = true;

	var pointLight = new THREE.PointLight( 0xccffcc );
	pointLight.position.set( 1, 1, 5 );
	pointLight.castShadow = true;

	const lightGroup = new THREE.Group();
	lightGroup.name = 'lights';
	lightGroup.add(ambient);
	lightGroup.add(directionalLight);
	lightGroup.add(pointLight);

	scene.add(lightGroup);
}

function loadDAE(){
	const loader = new THREE.ColladaLoader();
	loader.load( 'models/LG.dae', function ( collada ) {
		//collada -> scene -> sketchup -> mesh instance
		let dae = collada.scene.children[0].children[0];

		dae.matrix.set (
            1,  0,  0,  0,
            0,  0,  1,  0,
            0,  -1, 0,  0,
            0,  0,  0,  1
        );

		dae.updateMatrix();
		scene.add(dae);
		const geometry = new THREE.Geometry().fromBufferGeometry(dae.geometry);
		
		dae.geometry = geometry;
		_callback(dae);
	} );
}

function onObjectFileLoaded(callback) {
	_callback = callback;
}