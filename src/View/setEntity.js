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
	// setPlane();
	// loadObj();
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
function setPlane(){
	// create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.name = 'plane';
	plane.receiveShadow = true;
	// rotate and position the plane
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	// add the plane to the scene
	scene.add(plane);
}
function loadObj() {
	const loader = new THREE.OBJLoader();
	loader.load( 'models/cube.obj', function ( group ) {
		const green = new THREE.MeshPhongMaterial({color: 0x000000});
		let c = group.children[0];
		
		const geometry = new THREE.Geometry().fromBufferGeometry(c.geometry);
		let cube = new THREE.Mesh(geometry, green);
		cube.name = 'cube'
		cube.castShadow = true;
		scene.add( cube );
		
		_callback(cube.geometry);
	});
}

function loadDAE(){
	const loader = new THREE.ColladaLoader();
	loader.load( 'models/HG.dae', function ( collada ) {
		let dae = collada.scene.children[0].children[0];
		dae.name = 'HG';

		dae.matrix.set (
            1,  0,  0,  0,
            0,  0,  1,  0,
            0,  -1, 0,  0,
            0,  0,  0,  1
        );

		dae.updateMatrix();
		scene.add(dae);
		const geometry = new THREE.Geometry().fromBufferGeometry(dae.geometry);

		_callback(geometry);
	} );
}

function onObjectFileLoaded(callback) {
	_callback = callback;
}