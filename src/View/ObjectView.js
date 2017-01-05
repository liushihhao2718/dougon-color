import GLRenderTemplate from './GLRenderTemplate';
import Unfolder from 'Model/Unfolder';
import loadPredefined from './setEntity';

export default class ObjectView extends GLRenderTemplate {
	
	setCamera() {
		let camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 2000 );
		camera.position.set(5,5,5);

		return camera;
	}
	loadProps() {
		window.scene = this.scene;
		loadPredefined(this.scene).onObjectFileLoaded( geometry =>{
			this.handleLoadObject(geometry);
		});
	}
	handleLoadObject(geometry){
		let cube = {
			'show normal': false,
			'unfold':()=>{
				this.unfold(geometry);
			}
		}
		const nomalLine = require('normalLine.js');

		const lines = nomalLine.drawNormalOn(geometry);
		lines.visible = cube['show normal'];
		this.scene.add(lines);
		
		let control = this.gui.add(cube, 'show normal');
		control.onFinishChange(value=>{
			lines.visible = value;
		});

		this.gui.add(cube, 'unfold');
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
	unfold(geometry){
		let unfoldFaces = Unfolder.unfold(geometry);
		/**@todo send to unfold view */

		unfoldFaces.forEach(m => this.scene.add(m));
	}
}

