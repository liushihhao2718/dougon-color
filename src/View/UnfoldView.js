import GLRenderTemplate from './GLRenderTemplate';

export default class UnFoldView extends GLRenderTemplate {
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