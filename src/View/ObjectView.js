import GLRenderTemplate from './GLRenderTemplate';
import Unfolder from 'Model/Unfolder';
import loadPredefined from 'Model/setEntity';
import nomalLine from 'Model/normalLine';

export default class ObjectView extends GLRenderTemplate {
	constructor() {
		super();
		this.selectableObjects = [];
	}
	// inhirtance method 
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
	handleLoadObject(object){
		let cube = {
			'show normal': false,
			'unfold':()=>{
				this.unfold( object );
			}
		}
		const lines = nomalLine(this.scene, object.geometry);
		lines.applyMatrix( object.matrix );
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

	// not inhirtance method 
	unfold(object){
		let unfoldFaces = Unfolder.unfold(object.geometry);
		/**@todo send to unfold view */
		let group = new THREE.Group();
		group.name = 'unfold';

		unfoldFaces.forEach(m => {
			m.applyMatrix( object.matrix );
			group.add(m);
		});
		this.scene.add( group );
	}

}

