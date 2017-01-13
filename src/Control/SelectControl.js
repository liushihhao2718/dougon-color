export default class SelectControl{
	constructor(controller){
		this.controller = controller;
		this.objects = controller.selectableObjects;
		this.raycaster = new THREE.Raycaster();
		this.selected = [];

		controller.renderer.domElement.addEventListener( 'click', this.onClick.bind(this) );
	}
	update(){

	}
	onClick(event){
		event.preventDefault();
		const ctrl = this.controller;
		const top = ctrl.renderer.domElement.getBoundingClientRect().top;
		const left = ctrl.renderer.domElement.getBoundingClientRect().left;

		const mouseX = ( (event.clientX-left) / ctrl.width) * 2 - 1;
		const mouseY = -( (event.clientY-top) / ctrl.height) * 2 + 1;
		var mouse = new THREE.Vector2( mouseX, mouseY );

		this.raycaster.setFromCamera( mouse, ctrl.camera );
		let intersects = this.raycaster.intersectObjects( this.objects );
		
		if( !event.shiftKey ) this.clearSelected();
		if(intersects.length) this.addSelected( intersects[0] );
	}
	clearSelected(){
		this.selected.forEach( slot =>{
			slot.object.material.color = slot.keepedColor;
		});
		this.selected.length = 0;
	}
	addSelected(intersect){
		let slot = {
			object: intersect.object,
			keepedColor: intersect.object.material.color.clone()
		};
		this.selected.push( slot );
		let orange = new THREE.Color('orange');
		intersect.object.material.color = mixColor(orange, slot.keepedColor);
	}
}
function mixColor(color1, color2){
	let proportion = 0.8;
	let a = color1.clone().multiplyScalar( proportion );
	let b = color2.clone().multiplyScalar( 1 - proportion );
	return a.add( b );
}