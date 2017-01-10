export default class SelectControl{
	constructor(controller){
		this.controller = controller;
		this.objects = controller.selectableObjects;
		this.raycaster = new THREE.Raycaster();

		controller.renderer.domElement.addEventListener( 'mousedown', this.onMouseDown.bind(this) );
	}
	update(){

	}
	onMouseDown(event){
		event.preventDefault();
		const ctrl = this.controller;
		const top = ctrl.renderer.domElement.getBoundingClientRect().top;
		const left = ctrl.renderer.domElement.getBoundingClientRect().left;

		const mouseX = ( (event.clientX-left) / ctrl.width) * 2 - 1;
		const mouseY = -( (event.clientY-top) / ctrl.height) * 2 + 1;
		var mouse = new THREE.Vector2( mouseX, mouseY );

		this.raycaster.setFromCamera( mouse, ctrl.camera );
		var intersects = this.raycaster.intersectObjects( this.objects );

		if(intersects.length){
			console.log(intersects[0]);
		}
		

	}
}