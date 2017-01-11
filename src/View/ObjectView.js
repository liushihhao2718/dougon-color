import GLRenderTemplate from './GLRenderTemplate';
import SelectControl from 'Control/SelectControl';
import Unfolder from 'Model/Unfolder';
import loadPredefined from 'Model/setEntity';
import nomalLine from 'Model/normalLine';
import {notification} from 'lib/Notification';

export default class ObjectView extends GLRenderTemplate {
	constructor() {
		super();
		this.selectableObjects = [];
		this.selectControl = this.setSelectControl();
		this.model = undefined;
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
			unfold:()=>{
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

		let send = {
			send: () =>	this.send()
		};

		this.gui.add(send, 'send');

	}

	// not inhirtance method
	setSelectControl() {
		let control = new SelectControl(this);
		this.controls.push( control );
		return control;
	}
	unfold(object){
		object.geometry.computeFaceNormals();
		let {meshies, meshSourceMap} = Unfolder.unfold(object.geometry);
		/**@todo send to unfold view */
		let group = new THREE.Group();
		group.name = 'unfold';

		meshies.forEach(m => {
			m.applyMatrix( object.matrix );
			group.add(m);
			this.selectableObjects.push( m );

		});
		this.scene.add( group );
		console.log(meshSourceMap);
	}
	send(){
		if(this.selectControl.selected.length === 0) return;
		let group = new THREE.Group();

		this.selectControl.selected.forEach(s =>{
			group.add( s.object );
			this.removeFromSelectable( s );
		});
		this.selectControl.clearSelected();

		notification.dispatchEvent( {
			type : 'send',
			message: group
		} );
	}

	removeFromSelectable(s){
		const i = this.selectableObjects.indexOf(s.object);
		this.selectableObjects.splice(i, 1);
	}
}

