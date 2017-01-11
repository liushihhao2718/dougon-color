import GLRenderTemplate from './GLRenderTemplate';
import {notification} from 'lib/Notification';
import {computeFaceNormals} from 'lib/util';

export default class UnFoldView extends GLRenderTemplate {
	constructor(){
		super();
		notification.addEventListener('send', this.receive.bind(this) );
	}
	setCamera() {
		let camera = new THREE.OrthographicCamera( -10, 10,	10,	-10, 0.1, 10 );

		camera.position.z = 5;
	
		camera.name = 'camera';
		this.scene.add(camera);
		return camera;
	}
	loadProps() {		
		this.scene.add( groundPlane() );
		this.scene.add( groundGird() );
	}
	resizeRenderer() {
		let aspect = this.width / this.height;
		let frustumSize = 30;
		this.camera.left   = - 0.5 * frustumSize * aspect / 2;
		this.camera.right  =   0.5 * frustumSize * aspect / 2;
		this.camera.top    =  0.5 * frustumSize  / 2;
		this.camera.bottom = - 0.5 * frustumSize / 2;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.width, this.height );
	}
	setControl() {
		let controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		controls.enableRotate = false;
		controls.enableDamping = true;
		controls.dampingFactor = 1;

		return controls;
	}
	setUI(){
		super.setUI();

		let style = this.gui.domElement.style;

		Object.assign(style, {
			position: 'absolute',
			top: '0px',
			right: '50%'
		});
	}
	receive( event ) {
		let group = event.message;
		moveToSamePlane(group);

		this.scene.add(group);
	}
}
function groundPlane(){
	var planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xccffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.name = 'groundPlane';

	// rotate and position the plane
	plane.position.set(0,0,0);
	return plane;
}
function groundGird() {
	var size = 10;
	var divisions = 20;

	var gridHelper = new THREE.GridHelper( size, divisions );
	gridHelper.rotateX(90 * Math.PI / 180);
	return gridHelper;
}
function moveToSamePlane(group){
	let stantard = group.children[0];
	let normal = computeFaceNormals(stantard.geometry.faces[0], stantard.geometry.vertices);
	const axisZ = new THREE.Vector3(0, 0, 1);
	let pivot = normal.clone().cross( axisZ ).normalize();

	let rotate = new THREE.Matrix4();
	rotate.makeRotationAxis (pivot, normal.angleTo(axisZ) );
	// rotate.getInverse(stantard.matrix)
	group.applyMatrix( rotate );
}