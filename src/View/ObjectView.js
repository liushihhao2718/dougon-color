import GLRenderTemplate from './GLRenderTemplate';
import loadPredefined from './setEntity';
export default class ObjectView extends GLRenderTemplate {
	
	setCamera() {
		let camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 2000 );
		camera.position.set(5,5,5);

		return camera;
	}
	loadProps() {

		loadPredefined(this.scene).onObjectFileLoaded( geometry =>{
			this.handleLoadObject(geometry);
		});
	}
	handleLoadObject(geometry){
		let cube = {
			'show normal': false
		}
		const nomalLine = require('normalLine.js');

		const lines = nomalLine.drawNormalOn(geometry);
		lines.visible = cube['show normal'];
		this.scene.add(lines);
		
		let control = this.gui.add(cube, 'show normal');
		control.onFinishChange(value=>{
			lines.visible = value;
		});
	}
	setUI(){
		super.setUI();

		let style = this.gui.domElement.style;

		Object.assign(style, {
			position: 'absolute',
			top: '0px',
			right: '0px'
		});
	}
	
}

