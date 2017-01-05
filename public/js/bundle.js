/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_OrbitControls_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_OrbitControls_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_OrbitControls_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_loader_ColladaLoader2_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_loader_ColladaLoader2_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lib_loader_ColladaLoader2_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lib_loader_OBJLoader_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lib_loader_OBJLoader_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lib_loader_OBJLoader_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_dat_gui_min__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_dat_gui_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lib_dat_gui_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_stats_min_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_stats_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lib_stats_min_js__);





/*eslint class-methods-use-this: ["error", { "exceptMethods": ["setScene", setRenderer] }] */

/**
 * @prop {THREE.Camera} camera
 * @prop {THREE.Scene} scene
 * @prop {THREE.WebGLRenderer} renderer
 * @prop {THREE.Controls} controls
 * @prop {number} width
 * @prop {number} height
 * @prop {domElement} parent
 * @example
 * let view = new GLRenderTemplate();
 * view.appendTo( domElement );
 * view.animate();
 */
class GLRenderTemplate {
	constructor() {

		this.scene = this.setScene();
		this.camera = this.setCamera();
		this.renderer = this.setRenderer();
		this.controls = this.setControl();
		this.gui = new __WEBPACK_IMPORTED_MODULE_3_lib_dat_gui_min__["GUI"]({ autoPlace: false });

		this.loadProps();
	}
	/**
	 * @param {HTMLElement} parent
	 */
	appendTo(parent){
		this.parent = parent;
		parent.appendChild(this.renderer.domElement);

		window.addEventListener('resize', ()=>{
			this.windowResize();
		});
		this.setUI();
		this.windowResize();
	}
	setUI() {
		this.stats = new __WEBPACK_IMPORTED_MODULE_4_lib_stats_min_js___default.a();
		this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		this.stats.dom.style.position = 'absolute'
		this.parent.appendChild(this.stats.dom);

		this.parent.appendChild(this.gui.domElement);
	}
	setCamera() {
		let camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 2000 );
		camera.position.set(5,5,5);

		return camera;
	}
	setControl() {
		let controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		controls.enableDamping = true;
		controls.dampingFactor = 1;
		controls.enableZoom = false;

		return controls;
	}
	setScene() {
		let scene = new THREE.Scene();
		return scene;
	}
	loadProps(){
		var geometry = new THREE.SphereBufferGeometry( 1, 8, 6 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
		var sphere = new THREE.Mesh( geometry, material );
		this.scene.add(sphere);
	}
	setRenderer() {
		let renderer = new THREE.WebGLRenderer();
		renderer.shadowMap.enabled = true;
		return renderer;
	}
	
	windowResize() {
		this.resizeAspect();
		this.resizeRenderer();
	}
	resizeRenderer() {
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.width, this.height );
	}
	resizeAspect(){
		let bbox = this.parent.getBoundingClientRect();
		this.width = bbox.width;
		this.height = window.innerHeight;
	}

	render() {
		this.stats.begin();

		this.controls.update();
		this.renderer.render( this.scene, this.camera );

		this.stats.end();
	}

	animate(){
		//use .call or .apply will get max call stack error
		let animate = this.animate.bind(this);
		requestAnimationFrame(animate);
		this.render();
	}
}
/* harmony export (immutable) */ exports["a"] = GLRenderTemplate;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GLRenderTemplate__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setEntity__ = __webpack_require__(12);


class ObjectView extends __WEBPACK_IMPORTED_MODULE_0__GLRenderTemplate__["a" /* default */] {
	
	setCamera() {
		let camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 1, 2000 );
		camera.position.set(5,5,5);

		return camera;
	}
	loadProps() {

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__setEntity__["a" /* default */])(this.scene).onObjectFileLoaded( geometry =>{
			this.handleLoadObject(geometry);
		});
	}
	handleLoadObject(geometry){
		let cube = {
			'show normal': false
		}
		const nomalLine = __webpack_require__(9);

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
/* harmony export (immutable) */ exports["a"] = ObjectView;




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GLRenderTemplate__ = __webpack_require__(0);


class UnFoldView extends __WEBPACK_IMPORTED_MODULE_0__GLRenderTemplate__["a" /* default */] {
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
/* harmony export (immutable) */ exports["a"] = UnFoldView;


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

/***/ },
/* 3 */
/***/ function(module, exports) {

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function() {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update () {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location
			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

			}

			scale = 1;
			panOffset.set( 0, 0, 0 );

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function() {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function() {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function() {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function() {

		var offset = new THREE.Vector3();

		return function pan ( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyIn( dollyScale ) {

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyOut( dollyScale ) {

		if ( scope.object instanceof THREE.PerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( event ) {

		//console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {

		//console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		//console.log( 'handleKeyDown' );

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				scope.update();
				break;

		}

	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDolly( event ) {

		//console.log( 'handleTouchStartDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyStart.set( 0, distance );

	}

	function handleTouchStartPan( event ) {

		//console.log( 'handleTouchStartPan' );

		panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleTouchMoveDolly( event ) {

		//console.log( 'handleTouchMoveDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyEnd.set( 0, distance );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyOut( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyIn( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleTouchMovePan( event ) {

		//console.log( 'handleTouchMovePan' );

		panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		if ( event.button === scope.mouseButtons.ORBIT ) {

			if ( scope.enableRotate === false ) return;

			handleMouseDownRotate( event );

			state = STATE.ROTATE;

		} else if ( event.button === scope.mouseButtons.ZOOM ) {

			if ( scope.enableZoom === false ) return;

			handleMouseDownDolly( event );

			state = STATE.DOLLY;

		} else if ( event.button === scope.mouseButtons.PAN ) {

			if ( scope.enablePan === false ) return;

			handleMouseDownPan( event );

			state = STATE.PAN;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		if ( state === STATE.ROTATE ) {

			if ( scope.enableRotate === false ) return;

			handleMouseMoveRotate( event );

		} else if ( state === STATE.DOLLY ) {

			if ( scope.enableZoom === false ) return;

			handleMouseMoveDolly( event );

		} else if ( state === STATE.PAN ) {

			if ( scope.enablePan === false ) return;

			handleMouseMovePan( event );

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		handleMouseWheel( event );

		scope.dispatchEvent( startEvent ); // not sure why these are here...
		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;

				handleTouchStartRotate( event );

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;

				handleTouchStartDolly( event );

				state = STATE.TOUCH_DOLLY;

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;

				handleTouchStartPan( event );

				state = STATE.TOUCH_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

				handleTouchMoveRotate( event );

				break;

			case 2: // two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

				handleTouchMoveDolly( event );

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

				handleTouchMovePan( event );

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

	center: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
			return this.target;

		}

	},

	// backward compatibility

	noZoom: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			return ! this.enableZoom;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			this.enableZoom = ! value;

		}

	},

	noRotate: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			return ! this.enableRotate;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			this.enableRotate = ! value;

		}

	},

	noPan: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			return ! this.enablePan;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			this.enablePan = ! value;

		}

	},

	noKeys: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			return ! this.enableKeys;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			this.enableKeys = ! value;

		}

	},

	staticMoving : {

		get: function () {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			return ! this.enableDamping;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			this.enableDamping = ! value;

		}

	},

	dynamicDampingFactor : {

		get: function () {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			return this.dampingFactor;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			this.dampingFactor = value;

		}

	}

} );


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.dat=t():e.dat=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(1),r=o(i);e.exports=r["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(2),r=o(i),a=n(6),l=o(a),s=n(3),u=o(s),d=n(7),c=o(d),f=n(8),_=o(f),p=n(10),h=o(p),m=n(11),b=o(m),g=n(12),v=o(g),y=n(13),w=o(y),x=n(14),E=o(x),C=n(15),A=o(C),S=n(16),k=o(S),O=n(9),T=o(O),R=n(17),L=o(R);t["default"]={color:{Color:r["default"],math:l["default"],interpret:u["default"]},controllers:{Controller:c["default"],BooleanController:_["default"],OptionController:h["default"],StringController:b["default"],NumberController:v["default"],NumberControllerBox:w["default"],NumberControllerSlider:E["default"],FunctionController:A["default"],ColorController:k["default"]},dom:{dom:T["default"]},gui:{GUI:L["default"]},GUI:L["default"]}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,n){Object.defineProperty(e,t,{get:function(){return"RGB"===this.__state.space?this.__state[t]:(h.recalculateRGB(this,t,n),this.__state[t])},set:function(e){"RGB"!==this.__state.space&&(h.recalculateRGB(this,t,n),this.__state.space="RGB"),this.__state[t]=e}})}function a(e,t){Object.defineProperty(e,t,{get:function(){return"HSV"===this.__state.space?this.__state[t]:(h.recalculateHSV(this),this.__state[t])},set:function(e){"HSV"!==this.__state.space&&(h.recalculateHSV(this),this.__state.space="HSV"),this.__state[t]=e}})}t.__esModule=!0;var l=n(3),s=o(l),u=n(6),d=o(u),c=n(4),f=o(c),_=n(5),p=o(_),h=function(){function e(){if(i(this,e),this.__state=s["default"].apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return e.prototype.toString=function(){return(0,f["default"])(this)},e.prototype.toHexString=function(){return(0,f["default"])(this,!0)},e.prototype.toOriginal=function(){return this.__state.conversion.write(this)},e}();h.recalculateRGB=function(e,t,n){if("HEX"===e.__state.space)e.__state[t]=d["default"].component_from_hex(e.__state.hex,n);else{if("HSV"!==e.__state.space)throw new Error("Corrupted color state");p["default"].extend(e.__state,d["default"].hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v))}},h.recalculateHSV=function(e){var t=d["default"].rgb_to_hsv(e.r,e.g,e.b);p["default"].extend(e.__state,{s:t.s,v:t.v}),p["default"].isNaN(t.h)?p["default"].isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=t.h},h.COMPONENTS=["r","g","b","h","s","v","hex","a"],r(h.prototype,"r",2),r(h.prototype,"g",1),r(h.prototype,"b",0),a(h.prototype,"h"),a(h.prototype,"s"),a(h.prototype,"v"),Object.defineProperty(h.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(h.prototype,"hex",{get:function(){return"HEX"!==!this.__state.space&&(this.__state.hex=d["default"].rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}}),t["default"]=h},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(4),r=o(i),a=n(5),l=o(a),s=[{litmus:l["default"].isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:r["default"]},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:r["default"]},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:r["default"]},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:r["default"]}}},{litmus:l["default"].isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:l["default"].isArray,conversions:{RGB_ARRAY:{read:function(e){return 3===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return 4===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:l["default"].isObject,conversions:{RGBA_OBJ:{read:function(e){return!!(l["default"].isNumber(e.r)&&l["default"].isNumber(e.g)&&l["default"].isNumber(e.b)&&l["default"].isNumber(e.a))&&{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return!!(l["default"].isNumber(e.r)&&l["default"].isNumber(e.g)&&l["default"].isNumber(e.b))&&{space:"RGB",r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return!!(l["default"].isNumber(e.h)&&l["default"].isNumber(e.s)&&l["default"].isNumber(e.v)&&l["default"].isNumber(e.a))&&{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return!!(l["default"].isNumber(e.h)&&l["default"].isNumber(e.s)&&l["default"].isNumber(e.v))&&{space:"HSV",h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],u=void 0,d=void 0,c=function(){d=!1;var e=arguments.length>1?l["default"].toArray(arguments):arguments[0];return l["default"].each(s,function(t){if(t.litmus(e))return l["default"].each(t.conversions,function(t,n){if(u=t.read(e),d===!1&&u!==!1)return d=u,u.conversionName=n,u.conversion=t,l["default"].BREAK}),l["default"].BREAK}),d};t["default"]=c},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){var n=e.__state.conversionName.toString(),o=Math.round(e.r),i=Math.round(e.g),r=Math.round(e.b),a=e.a,l=Math.round(e.h),s=e.s.toFixed(1),u=e.v.toFixed(1);if(t||"THREE_CHAR_HEX"===n||"SIX_CHAR_HEX"===n){for(var d=e.hex.toString(16);d.length<6;)d="0"+d;return"#"+d}return"CSS_RGB"===n?"rgb("+o+","+i+","+r+")":"CSS_RGBA"===n?"rgba("+o+","+i+","+r+","+a+")":"HEX"===n?"0x"+e.hex.toString(16):"RGB_ARRAY"===n?"["+o+","+i+","+r+"]":"RGBA_ARRAY"===n?"["+o+","+i+","+r+","+a+"]":"RGB_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+"}":"RGBA_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+",a:"+a+"}":"HSV_OBJ"===n?"{h:"+l+",s:"+s+",v:"+u+"}":"HSVA_OBJ"===n?"{h:"+l+",s:"+s+",v:"+u+",a:"+a+"}":"unknown format"}},function(e,t){"use strict";t.__esModule=!0;var n=Array.prototype.forEach,o=Array.prototype.slice,i={BREAK:{},extend:function(e){return this.each(o.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(n){this.isUndefined(t[n])||(e[n]=t[n])}.bind(this))},this),e},defaults:function(e){return this.each(o.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(n){this.isUndefined(e[n])&&(e[n]=t[n])}.bind(this))},this),e},compose:function(){var e=o.call(arguments);return function(){for(var t=o.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,o){if(e)if(n&&e.forEach&&e.forEach===n)e.forEach(t,o);else if(e.length===e.length+0){var i=void 0,r=void 0;for(i=0,r=e.length;i<r;i++)if(i in e&&t.call(o,e[i],i)===this.BREAK)return}else for(var a in e)if(t.call(o,e[a],a)===this.BREAK)return},defer:function(e){setTimeout(e,0)},debounce:function(e,t){var n=void 0;return function(){function o(){n=null}var i=this,r=arguments,a=!n;clearTimeout(n),n=setTimeout(o,t),a&&e.apply(i,r)}},toArray:function(e){return e.toArray?e.toArray():o.call(e)},isUndefined:function(e){return void 0===e},isNull:function(e){return null===e},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return isNaN(e)}),isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)}};t["default"]=i},function(e,t){"use strict";t.__esModule=!0;var n=void 0,o={hsv_to_rgb:function(e,t,n){var o=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),r=n*(1-t),a=n*(1-i*t),l=n*(1-(1-i)*t),s=[[n,l,r],[a,n,r],[r,n,l],[r,a,n],[l,r,n],[n,r,a]][o];return{r:255*s[0],g:255*s[1],b:255*s[2]}},rgb_to_hsv:function(e,t,n){var o=Math.min(e,t,n),i=Math.max(e,t,n),r=i-o,a=void 0,l=void 0;return 0===i?{h:NaN,s:0,v:0}:(l=r/i,a=e===i?(t-n)/r:t===i?2+(n-e)/r:4+(e-t)/r,a/=6,a<0&&(a+=1),{h:360*a,s:l,v:i/255})},rgb_to_hex:function(e,t,n){var o=this.hex_with_component(0,2,e);return o=this.hex_with_component(o,1,t),o=this.hex_with_component(o,0,n)},component_from_hex:function(e,t){return e>>8*t&255},hex_with_component:function(e,t,o){return o<<(n=8*t)|e&~(255<<n)}};t["default"]=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(t,o){n(this,e),this.initialValue=t[o],this.domElement=document.createElement("div"),this.object=t,this.property=o,this.__onChange=void 0,this.__onFinishChange=void 0}return e.prototype.onChange=function(e){return this.__onChange=e,this},e.prototype.onFinishChange=function(e){return this.__onFinishChange=e,this},e.prototype.setValue=function(e){return this.object[this.property]=e,this.__onChange&&this.__onChange.call(this,e),this.updateDisplay(),this},e.prototype.getValue=function(){return this.object[this.property]},e.prototype.updateDisplay=function(){return this},e.prototype.isModified=function(){return this.initialValue!==this.getValue()},e}();t["default"]=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o){function a(){s.setValue(!s.__prev)}i(this,t);var l=r(this,e.call(this,n,o)),s=l;return l.__prev=l.getValue(),l.__checkbox=document.createElement("input"),l.__checkbox.setAttribute("type","checkbox"),d["default"].bind(l.__checkbox,"change",a,!1),l.domElement.appendChild(l.__checkbox),l.updateDisplay(),l}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),n},t.prototype.updateDisplay=function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0):this.__checkbox.checked=!1,e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){if("0"===e||a["default"].isUndefined(e))return 0;var t=e.match(u);return a["default"].isNull(t)?0:parseFloat(t[1])}t.__esModule=!0;var r=n(5),a=o(r),l={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},s={};a["default"].each(l,function(e,t){a["default"].each(e,function(e){s[e]=t})});var u=/(\d+(\.\d+)?)px/,d={makeSelectable:function(e,t){void 0!==e&&void 0!==e.style&&(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var o=n,i=t;a["default"].isUndefined(i)&&(i=!0),a["default"].isUndefined(o)&&(o=!0),e.style.position="absolute",i&&(e.style.left=0,e.style.right=0),o&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,o){var i=n||{},r=s[t];if(!r)throw new Error("Event type "+t+" not supported.");var l=document.createEvent(r);switch(r){case"MouseEvents":var u=i.x||i.clientX||0,d=i.y||i.clientY||0;l.initMouseEvent(t,i.bubbles||!1,i.cancelable||!0,window,i.clickCount||1,0,0,u,d,!1,!1,!1,!1,0,null);break;case"KeyboardEvents":var c=l.initKeyboardEvent||l.initKeyEvent;a["default"].defaults(i,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(t,i.bubbles||!1,i.cancelable,window,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);break;default:l.initEvent(t,i.bubbles||!1,i.cancelable||!0)}a["default"].defaults(l,o),e.dispatchEvent(l)},bind:function(e,t,n,o){var i=o||!1;return e.addEventListener?e.addEventListener(t,n,i):e.attachEvent&&e.attachEvent("on"+t,n),d},unbind:function(e,t,n,o){var i=o||!1;return e.removeEventListener?e.removeEventListener(t,n,i):e.detachEvent&&e.detachEvent("on"+t,n),d},addClass:function(e,t){if(void 0===e.className)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return d},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),o=n.indexOf(t);o!==-1&&(n.splice(o,1),e.className=n.join(" "))}else e.className=void 0;return d},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return i(t["border-left-width"])+i(t["border-right-width"])+i(t["padding-left"])+i(t["padding-right"])+i(t.width)},getHeight:function(e){var t=getComputedStyle(e);return i(t["border-top-width"])+i(t["border-bottom-width"])+i(t["padding-top"])+i(t["padding-bottom"])+i(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}};t["default"]=d},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=n(5),f=o(c),_=function(e){function t(n,o,a){i(this,t);var l=r(this,e.call(this,n,o)),s=a,u=l;return l.__select=document.createElement("select"),f["default"].isArray(s)&&!function(){var e={};f["default"].each(s,function(t){e[t]=t}),s=e}(),f["default"].each(s,function(e,t){var n=document.createElement("option");n.innerHTML=t,n.setAttribute("value",e),u.__select.appendChild(n)}),l.updateDisplay(),d["default"].bind(l.__select,"change",function(){var e=this.options[this.selectedIndex].value;u.setValue(e)}),l.domElement.appendChild(l.__select),l}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),n},t.prototype.updateDisplay=function(){return d["default"].isActive(this.__select)?this:(this.__select.value=this.getValue(),e.prototype.updateDisplay.call(this))},t}(s["default"]);t["default"]=_},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o){function a(){u.setValue(u.__input.value)}function l(){u.__onFinishChange&&u.__onFinishChange.call(u,u.getValue())}i(this,t);var s=r(this,e.call(this,n,o)),u=s;return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),d["default"].bind(s.__input,"keyup",a),d["default"].bind(s.__input,"change",a),d["default"].bind(s.__input,"blur",l),d["default"].bind(s.__input,"keydown",function(e){13===e.keyCode&&this.blur()}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return a(t,e),t.prototype.updateDisplay=function(){return d["default"].isActive(this.__input)||(this.__input.value=this.getValue()),e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){var t=e.toString();return t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0}t.__esModule=!0;var s=n(7),u=o(s),d=n(5),c=o(d),f=function(e){function t(n,o,a){i(this,t);var s=r(this,e.call(this,n,o)),u=a||{};return s.__min=u.min,s.__max=u.max,s.__step=u.step,c["default"].isUndefined(s.__step)?0===s.initialValue?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=l(s.__impliedStep),s}return a(t,e),t.prototype.setValue=function(t){var n=t;return void 0!==this.__min&&n<this.__min?n=this.__min:void 0!==this.__max&&n>this.__max&&(n=this.__max),void 0!==this.__step&&n%this.__step!==0&&(n=Math.round(n/this.__step)*this.__step),e.prototype.setValue.call(this,n)},t.prototype.min=function(e){return this.__min=e,this},t.prototype.max=function(e){return this.__max=e,this},t.prototype.step=function(e){return this.__step=e,this.__impliedStep=e,this.__precision=l(e),this},t}(u["default"]);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}t.__esModule=!0;var s=n(12),u=o(s),d=n(9),c=o(d),f=n(5),_=o(f),p=function(e){function t(n,o,a){function l(){var e=parseFloat(m.__input.value);_["default"].isNaN(e)||m.setValue(e)}function s(){m.__onFinishChange&&m.__onFinishChange.call(m,m.getValue())}function u(){s()}function d(e){var t=b-e.clientY;m.setValue(m.getValue()+t*m.__impliedStep),b=e.clientY}function f(){c["default"].unbind(window,"mousemove",d),c["default"].unbind(window,"mouseup",f),s()}function p(e){c["default"].bind(window,"mousemove",d),c["default"].bind(window,"mouseup",f),b=e.clientY}i(this,t);var h=r(this,e.call(this,n,o,a));h.__truncationSuspended=!1;var m=h,b=void 0;return h.__input=document.createElement("input"),h.__input.setAttribute("type","text"),c["default"].bind(h.__input,"change",l),c["default"].bind(h.__input,"blur",u),c["default"].bind(h.__input,"mousedown",p),c["default"].bind(h.__input,"keydown",function(e){13===e.keyCode&&(m.__truncationSuspended=!0,this.blur(),m.__truncationSuspended=!1,s())}),h.updateDisplay(),h.domElement.appendChild(h.__input),h}return a(t,e),t.prototype.updateDisplay=function(){return this.__input.value=this.__truncationSuspended?this.getValue():l(this.getValue(),this.__precision),e.prototype.updateDisplay.call(this)},t}(u["default"]);t["default"]=p},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t,n,o,i){return o+(i-o)*((e-t)/(n-t))}t.__esModule=!0;var s=n(12),u=o(s),d=n(9),c=o(d),f=function(e){function t(n,o,a,s,u){function d(e){document.activeElement.blur(),c["default"].bind(window,"mousemove",f),c["default"].bind(window,"mouseup",_),f(e)}function f(e){e.preventDefault();var t=h.__background.getBoundingClientRect();return h.setValue(l(e.clientX,t.left,t.right,h.__min,h.__max)),!1}function _(){c["default"].unbind(window,"mousemove",f),c["default"].unbind(window,"mouseup",_),h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}i(this,t);var p=r(this,e.call(this,n,o,{min:a,max:s,step:u})),h=p;return p.__background=document.createElement("div"),p.__foreground=document.createElement("div"),c["default"].bind(p.__background,"mousedown",d),c["default"].addClass(p.__background,"slider"),c["default"].addClass(p.__foreground,"slider-fg"),p.updateDisplay(),p.__background.appendChild(p.__foreground),p.domElement.appendChild(p.__background),p}return a(t,e),t.prototype.updateDisplay=function(){var t=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*t+"%",e.prototype.updateDisplay.call(this)},t}(u["default"]);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o,a){i(this,t);var l=r(this,e.call(this,n,o)),s=l;return l.__button=document.createElement("div"),l.__button.innerHTML=void 0===a?"Fire":a,d["default"].bind(l.__button,"click",function(e){return e.preventDefault(),s.fire(),!1}),d["default"].addClass(l.__button,"button"),l.domElement.appendChild(l.__button),l}return a(t,e),t.prototype.fire=function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t,n,o){e.style.background="",g["default"].each(y,function(i){e.style.cssText+="background: "+i+"linear-gradient("+t+", "+n+" 0%, "+o+" 100%); "})}function s(e){e.style.background="",e.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",e.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}t.__esModule=!0;var u=n(7),d=o(u),c=n(9),f=o(c),_=n(2),p=o(_),h=n(3),m=o(h),b=n(5),g=o(b),v=function(e){function t(n,o){function a(e){h(e),f["default"].bind(window,"mousemove",h),f["default"].bind(window,"mouseup",u)}function u(){f["default"].unbind(window,"mousemove",h),f["default"].unbind(window,"mouseup",u),_()}function d(){var e=(0,m["default"])(this.value);e!==!1?(y.__color.__state=e,y.setValue(y.__color.toOriginal())):this.value=y.__color.toString()}function c(){f["default"].unbind(window,"mousemove",b),f["default"].unbind(window,"mouseup",c),_()}function _(){y.__onFinishChange&&y.__onFinishChange.call(y,y.__color.toOriginal())}function h(e){e.preventDefault();var t=y.__saturation_field.getBoundingClientRect(),n=(e.clientX-t.left)/(t.right-t.left),o=1-(e.clientY-t.top)/(t.bottom-t.top);return o>1?o=1:o<0&&(o=0),n>1?n=1:n<0&&(n=0),y.__color.v=o,y.__color.s=n,y.setValue(y.__color.toOriginal()),!1}function b(e){e.preventDefault();var t=y.__hue_field.getBoundingClientRect(),n=1-(e.clientY-t.top)/(t.bottom-t.top);return n>1?n=1:n<0&&(n=0),y.__color.h=360*n,y.setValue(y.__color.toOriginal()),!1}i(this,t);var v=r(this,e.call(this,n,o));v.__color=new p["default"](v.getValue()),v.__temp=new p["default"](0);var y=v;v.domElement=document.createElement("div"),f["default"].makeSelectable(v.domElement,!1),v.__selector=document.createElement("div"),v.__selector.className="selector",v.__saturation_field=document.createElement("div"),v.__saturation_field.className="saturation-field",v.__field_knob=document.createElement("div"),v.__field_knob.className="field-knob",v.__field_knob_border="2px solid ",v.__hue_knob=document.createElement("div"),v.__hue_knob.className="hue-knob",v.__hue_field=document.createElement("div"),v.__hue_field.className="hue-field",v.__input=document.createElement("input"),v.__input.type="text",v.__input_textShadow="0 1px 1px ",f["default"].bind(v.__input,"keydown",function(e){13===e.keyCode&&d.call(this)}),f["default"].bind(v.__input,"blur",d),f["default"].bind(v.__selector,"mousedown",function(){f["default"].addClass(this,"drag").bind(window,"mouseup",function(){f["default"].removeClass(y.__selector,"drag")})});var w=document.createElement("div");return g["default"].extend(v.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),g["default"].extend(v.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:v.__field_knob_border+(v.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),g["default"].extend(v.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),g["default"].extend(v.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),g["default"].extend(w.style,{width:"100%",height:"100%",background:"none"}),l(w,"top","rgba(0,0,0,0)","#000"),g["default"].extend(v.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),s(v.__hue_field),g["default"].extend(v.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:v.__input_textShadow+"rgba(0,0,0,0.7)"}),f["default"].bind(v.__saturation_field,"mousedown",a),f["default"].bind(v.__field_knob,"mousedown",a),f["default"].bind(v.__hue_field,"mousedown",function(e){b(e),f["default"].bind(window,"mousemove",b),f["default"].bind(window,"mouseup",c)}),v.__saturation_field.appendChild(w),v.__selector.appendChild(v.__field_knob),v.__selector.appendChild(v.__saturation_field),v.__selector.appendChild(v.__hue_field),v.__hue_field.appendChild(v.__hue_knob),v.domElement.appendChild(v.__input),v.domElement.appendChild(v.__selector),v.updateDisplay(),v}return a(t,e),t.prototype.updateDisplay=function(){var e=(0,m["default"])(this.getValue());if(e!==!1){var t=!1;g["default"].each(p["default"].COMPONENTS,function(n){if(!g["default"].isUndefined(e[n])&&!g["default"].isUndefined(this.__color.__state[n])&&e[n]!==this.__color.__state[n])return t=!0,{}},this),t&&g["default"].extend(this.__color.__state,e)}g["default"].extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var n=this.__color.v<.5||this.__color.s>.5?255:0,o=255-n;g["default"].extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+n+","+n+","+n+")"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+"px",this.__temp.s=1,this.__temp.v=1,l(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),g["default"].extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+n+","+n+","+n+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})},t}(d["default"]),y=["-moz-","-o-","-webkit-","-ms-",""];t["default"]=v},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var o=document.createElement("li");return t&&o.appendChild(t),n?e.__ul.insertBefore(o,n):e.__ul.appendChild(o),e.onResize(),o}function r(e,t){var n=e.__preset_select[e.__preset_select.selectedIndex];t?n.innerHTML=n.value+"*":n.innerHTML=n.value}function a(e,t,n){if(n.__li=t,n.__gui=e,U["default"].extend(n,{options:function(t){if(arguments.length>1){var o=n.__li.nextElementSibling;return n.remove(),s(e,n.object,n.property,{before:o,factoryArgs:[U["default"].toArray(arguments)]})}if(U["default"].isArray(t)||U["default"].isObject(t)){var i=n.__li.nextElementSibling;return n.remove(),s(e,n.object,n.property,{before:i,factoryArgs:[t]})}},name:function(e){return n.__li.firstElementChild.firstElementChild.innerHTML=e,n},listen:function(){return n.__gui.listen(n),n},remove:function(){
return n.__gui.remove(n),n}}),n instanceof B["default"])!function(){var e=new N["default"](n.object,n.property,{min:n.__min,max:n.__max,step:n.__step});U["default"].each(["updateDisplay","onChange","onFinishChange","step"],function(t){var o=n[t],i=e[t];n[t]=e[t]=function(){var t=Array.prototype.slice.call(arguments);return i.apply(e,t),o.apply(n,t)}}),z["default"].addClass(t,"has-slider"),n.domElement.insertBefore(e.domElement,n.domElement.firstElementChild)}();else if(n instanceof N["default"]){var o=function(t){if(U["default"].isNumber(n.__min)&&U["default"].isNumber(n.__max)){var o=n.__li.firstElementChild.firstElementChild.innerHTML,i=n.__gui.__listening.indexOf(n)>-1;n.remove();var r=s(e,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[n.__min,n.__max,n.__step]});return r.name(o),i&&r.listen(),r}return t};n.min=U["default"].compose(o,n.min),n.max=U["default"].compose(o,n.max)}else n instanceof O["default"]?(z["default"].bind(t,"click",function(){z["default"].fakeEvent(n.__checkbox,"click")}),z["default"].bind(n.__checkbox,"click",function(e){e.stopPropagation()})):n instanceof R["default"]?(z["default"].bind(t,"click",function(){z["default"].fakeEvent(n.__button,"click")}),z["default"].bind(t,"mouseover",function(){z["default"].addClass(n.__button,"hover")}),z["default"].bind(t,"mouseout",function(){z["default"].removeClass(n.__button,"hover")})):n instanceof j["default"]&&(z["default"].addClass(t,"color"),n.updateDisplay=U["default"].compose(function(e){return t.style.borderLeftColor=n.__color.toString(),e},n.updateDisplay),n.updateDisplay());n.setValue=U["default"].compose(function(t){return e.getRoot().__preset_select&&n.isModified()&&r(e.getRoot(),!0),t},n.setValue)}function l(e,t){var n=e.getRoot(),o=n.__rememberedObjects.indexOf(t.object);if(o!==-1){var i=n.__rememberedObjectIndecesToControllers[o];if(void 0===i&&(i={},n.__rememberedObjectIndecesToControllers[o]=i),i[t.property]=t,n.load&&n.load.remembered){var r=n.load.remembered,a=void 0;if(r[e.preset])a=r[e.preset];else{if(!r[Q])return;a=r[Q]}if(a[o]&&void 0!==a[o][t.property]){var l=a[o][t.property];t.initialValue=l,t.setValue(l)}}}}function s(e,t,n,o){if(void 0===t[n])throw new Error('Object "'+t+'" has no property "'+n+'"');var r=void 0;if(o.color)r=new j["default"](t,n);else{var s=[t,n].concat(o.factoryArgs);r=C["default"].apply(e,s)}o.before instanceof S["default"]&&(o.before=o.before.__li),l(e,r),z["default"].addClass(r.domElement,"c");var u=document.createElement("span");z["default"].addClass(u,"property-name"),u.innerHTML=r.property;var d=document.createElement("div");d.appendChild(u),d.appendChild(r.domElement);var c=i(e,d,o.before);return z["default"].addClass(c,oe.CLASS_CONTROLLER_ROW),r instanceof j["default"]?z["default"].addClass(c,"color"):z["default"].addClass(c,g(r.getValue())),a(e,c,r),e.__controllers.push(r),r}function u(e,t){return document.location.href+"."+t}function d(e,t,n){var o=document.createElement("option");o.innerHTML=t,o.value=t,e.__preset_select.appendChild(o),n&&(e.__preset_select.selectedIndex=e.__preset_select.length-1)}function c(e,t){t.style.display=e.useLocalStorage?"block":"none"}function f(e){var t=e.__save_row=document.createElement("li");z["default"].addClass(e.domElement,"has-save"),e.__ul.insertBefore(t,e.__ul.firstChild),z["default"].addClass(t,"save-row");var n=document.createElement("span");n.innerHTML="&nbsp;",z["default"].addClass(n,"button gears");var o=document.createElement("span");o.innerHTML="Save",z["default"].addClass(o,"button"),z["default"].addClass(o,"save");var i=document.createElement("span");i.innerHTML="New",z["default"].addClass(i,"button"),z["default"].addClass(i,"save-as");var r=document.createElement("span");r.innerHTML="Revert",z["default"].addClass(r,"button"),z["default"].addClass(r,"revert");var a=e.__preset_select=document.createElement("select");e.load&&e.load.remembered?U["default"].each(e.load.remembered,function(t,n){d(e,n,n===e.preset)}):d(e,Q,!1),z["default"].bind(a,"change",function(){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].innerHTML=e.__preset_select[t].value;e.preset=this.value}),t.appendChild(a),t.appendChild(n),t.appendChild(o),t.appendChild(i),t.appendChild(r),q&&!function(){var t=document.getElementById("dg-local-explain"),n=document.getElementById("dg-local-storage"),o=document.getElementById("dg-save-locally");o.style.display="block","true"===localStorage.getItem(u(e,"isLocal"))&&n.setAttribute("checked","checked"),c(e,t),z["default"].bind(n,"change",function(){e.useLocalStorage=!e.useLocalStorage,c(e,t)})}();var l=document.getElementById("dg-new-constructor");z["default"].bind(l,"keydown",function(e){!e.metaKey||67!==e.which&&67!==e.keyCode||Z.hide()}),z["default"].bind(n,"click",function(){l.innerHTML=JSON.stringify(e.getSaveObject(),void 0,2),Z.show(),l.focus(),l.select()}),z["default"].bind(o,"click",function(){e.save()}),z["default"].bind(i,"click",function(){var t=prompt("Enter a new preset name.");t&&e.saveAs(t)}),z["default"].bind(r,"click",function(){e.revert()})}function _(e){function t(t){return t.preventDefault(),e.width+=i-t.clientX,e.onResize(),i=t.clientX,!1}function n(){z["default"].removeClass(e.__closeButton,oe.CLASS_DRAG),z["default"].unbind(window,"mousemove",t),z["default"].unbind(window,"mouseup",n)}function o(o){return o.preventDefault(),i=o.clientX,z["default"].addClass(e.__closeButton,oe.CLASS_DRAG),z["default"].bind(window,"mousemove",t),z["default"].bind(window,"mouseup",n),!1}var i=void 0;e.__resize_handle=document.createElement("div"),U["default"].extend(e.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"}),z["default"].bind(e.__resize_handle,"mousedown",o),z["default"].bind(e.__closeButton,"mousedown",o),e.domElement.insertBefore(e.__resize_handle,e.domElement.firstElementChild)}function p(e,t){e.domElement.style.width=t+"px",e.__save_row&&e.autoPlace&&(e.__save_row.style.width=t+"px"),e.__closeButton&&(e.__closeButton.style.width=t+"px")}function h(e,t){var n={};return U["default"].each(e.__rememberedObjects,function(o,i){var r={},a=e.__rememberedObjectIndecesToControllers[i];U["default"].each(a,function(e,n){r[n]=t?e.initialValue:e.getValue()}),n[i]=r}),n}function m(e){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].value===e.preset&&(e.__preset_select.selectedIndex=t)}function b(e){0!==e.length&&D["default"].call(window,function(){b(e)}),U["default"].each(e,function(e){e.updateDisplay()})}var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},v=n(18),y=o(v),w=n(19),x=o(w),E=n(20),C=o(E),A=n(7),S=o(A),k=n(8),O=o(k),T=n(15),R=o(T),L=n(13),N=o(L),M=n(14),B=o(M),H=n(16),j=o(H),P=n(21),D=o(P),V=n(22),F=o(V),I=n(9),z=o(I),G=n(5),U=o(G),X=n(23),K=o(X);y["default"].inject(K["default"]);var Y="dg",J=72,W=20,Q="Default",q=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}(),Z=void 0,$=!0,ee=void 0,te=!1,ne=[],oe=function ie(e){function t(){var e=n.getRoot();e.width+=1,U["default"].defer(function(){e.width-=1})}var n=this,o=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),z["default"].addClass(this.domElement,Y),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],o=U["default"].defaults(o,{autoPlace:!0,width:ie.DEFAULT_WIDTH}),o=U["default"].defaults(o,{resizable:o.autoPlace,hideable:o.autoPlace}),U["default"].isUndefined(o.load)?o.load={preset:Q}:o.preset&&(o.load.preset=o.preset),U["default"].isUndefined(o.parent)&&o.hideable&&ne.push(this),o.resizable=U["default"].isUndefined(o.parent)&&o.resizable,o.autoPlace&&U["default"].isUndefined(o.scrollable)&&(o.scrollable=!0);var r=q&&"true"===localStorage.getItem(u(this,"isLocal")),a=void 0;if(Object.defineProperties(this,{parent:{get:function(){return o.parent}},scrollable:{get:function(){return o.scrollable}},autoPlace:{get:function(){return o.autoPlace}},preset:{get:function(){return n.parent?n.getRoot().preset:o.load.preset},set:function(e){n.parent?n.getRoot().preset=e:o.load.preset=e,m(this),n.revert()}},width:{get:function(){return o.width},set:function(e){o.width=e,p(n,e)}},name:{get:function(){return o.name},set:function(e){o.name=e,titleRowName&&(titleRowName.innerHTML=o.name)}},closed:{get:function(){return o.closed},set:function(e){o.closed=e,o.closed?z["default"].addClass(n.__ul,ie.CLASS_CLOSED):z["default"].removeClass(n.__ul,ie.CLASS_CLOSED),this.onResize(),n.__closeButton&&(n.__closeButton.innerHTML=e?ie.TEXT_OPEN:ie.TEXT_CLOSED)}},load:{get:function(){return o.load}},useLocalStorage:{get:function(){return r},set:function(e){q&&(r=e,e?z["default"].bind(window,"unload",a):z["default"].unbind(window,"unload",a),localStorage.setItem(u(n,"isLocal"),e))}}}),U["default"].isUndefined(o.parent)){if(o.closed=!1,z["default"].addClass(this.domElement,ie.CLASS_MAIN),z["default"].makeSelectable(this.domElement,!1),q&&r){n.useLocalStorage=!0;var l=localStorage.getItem(u(this,"gui"));l&&(o.load=JSON.parse(l))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=ie.TEXT_CLOSED,z["default"].addClass(this.__closeButton,ie.CLASS_CLOSE_BUTTON),this.domElement.appendChild(this.__closeButton),z["default"].bind(this.__closeButton,"click",function(){n.closed=!n.closed})}else{void 0===o.closed&&(o.closed=!0);var s=document.createTextNode(o.name);z["default"].addClass(s,"controller-name");var d=i(n,s),c=function(e){return e.preventDefault(),n.closed=!n.closed,!1};z["default"].addClass(this.__ul,ie.CLASS_CLOSED),z["default"].addClass(d,"title"),z["default"].bind(d,"click",c),o.closed||(this.closed=!1)}o.autoPlace&&(U["default"].isUndefined(o.parent)&&($&&(ee=document.createElement("div"),z["default"].addClass(ee,Y),z["default"].addClass(ee,ie.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ee),$=!1),ee.appendChild(this.domElement),z["default"].addClass(this.domElement,ie.CLASS_AUTO_PLACE)),this.parent||p(n,o.width)),this.__resizeHandler=function(){n.onResizeDebounced()},z["default"].bind(window,"resize",this.__resizeHandler),z["default"].bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),z["default"].bind(this.__ul,"transitionend",this.__resizeHandler),z["default"].bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),o.resizable&&_(this),a=function(){q&&"true"===localStorage.getItem(u(n,"isLocal"))&&localStorage.setItem(u(n,"gui"),JSON.stringify(n.getSaveObject()))},this.saveToLocalStorageIfPossible=a,o.parent||t()};oe.toggleHide=function(){te=!te,U["default"].each(ne,function(e){e.domElement.style.display=te?"none":""})},oe.CLASS_AUTO_PLACE="a",oe.CLASS_AUTO_PLACE_CONTAINER="ac",oe.CLASS_MAIN="main",oe.CLASS_CONTROLLER_ROW="cr",oe.CLASS_TOO_TALL="taller-than-window",oe.CLASS_CLOSED="closed",oe.CLASS_CLOSE_BUTTON="close-button",oe.CLASS_DRAG="drag",oe.DEFAULT_WIDTH=245,oe.TEXT_CLOSED="Close Controls",oe.TEXT_OPEN="Open Controls",oe._keydownHandler=function(e){"text"===document.activeElement.type||e.which!==J&&e.keyCode!==J||oe.toggleHide()},z["default"].bind(window,"keydown",oe._keydownHandler,!1),U["default"].extend(oe.prototype,{add:function(e,t){return s(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return s(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;U["default"].defer(function(){t.onResize()})},destroy:function(){this.autoPlace&&ee.removeChild(this.domElement),z["default"].unbind(window,"keydown",oe._keydownHandler,!1),z["default"].unbind(window,"resize",this.__resizeHandler),this.saveToLocalStorageIfPossible&&z["default"].unbind(window,"unload",this.saveToLocalStorageIfPossible)},addFolder:function(e){if(void 0!==this.__folders[e])throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new oe(t);this.__folders[e]=n;var o=i(this,n.domElement);return z["default"].addClass(o,"folder"),n},open:function(){this.closed=!1},close:function(){this.closed=!0},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=z["default"].getOffset(e.__ul).top,n=0;U["default"].each(e.__ul.childNodes,function(t){e.autoPlace&&t===e.__save_row||(n+=z["default"].getHeight(t))}),window.innerHeight-t-W<n?(z["default"].addClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-W+"px"):(z["default"].removeClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&U["default"].defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:U["default"].debounce(function(){this.onResize()},200),remember:function(){if(U["default"].isUndefined(Z)&&(Z=new F["default"],Z.domElement.innerHTML=x["default"]),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;U["default"].each(Array.prototype.slice.call(arguments),function(t){0===e.__rememberedObjects.length&&f(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&p(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=h(this)),e.folders={},U["default"].each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=h(this),r(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Q]=h(this,!0)),this.load.remembered[e]=h(this),this.preset=e,d(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){U["default"].each(this.__controllers,function(t){this.getRoot().load.remembered?l(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),U["default"].each(this.__folders,function(e){e.revert(e)}),e||r(this.getRoot(),!1)},listen:function(e){var t=0===this.__listening.length;this.__listening.push(e),t&&b(this.__listening)},updateDisplay:function(){U["default"].each(this.__controllers,function(e){e.updateDisplay()}),U["default"].each(this.__folders,function(e){e.updateDisplay()})}}),e.exports=oe},function(e,t){"use strict";e.exports={load:function(e,t){var n=t||document,o=n.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=e,n.getElementsByTagName("head")[0].appendChild(o)},inject:function(e,t){var n=t||document,o=document.createElement("style");o.type="text/css",o.innerHTML=e;var i=n.getElementsByTagName("head")[0];try{i.appendChild(o)}catch(r){}}}},function(e,t){e.exports="<div id=dg-save class=\"dg dialogue\"> Here's the new load parameter for your <code>GUI</code>'s constructor: <textarea id=dg-new-constructor></textarea> <div id=dg-save-locally> <input id=dg-local-storage type=checkbox /> Automatically save values to <code>localStorage</code> on exit. <div id=dg-local-explain>The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>'s constructor. This makes it easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do. </div> </div> </div>"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(10),r=o(i),a=n(13),l=o(a),s=n(14),u=o(s),d=n(11),c=o(d),f=n(15),_=o(f),p=n(8),h=o(p),m=n(5),b=o(m),g=function(e,t){var n=e[t];return b["default"].isArray(arguments[2])||b["default"].isObject(arguments[2])?new r["default"](e,t,arguments[2]):b["default"].isNumber(n)?b["default"].isNumber(arguments[2])&&b["default"].isNumber(arguments[3])?b["default"].isNumber(arguments[4])?new u["default"](e,t,arguments[2],arguments[3],arguments[4]):new u["default"](e,t,arguments[2],arguments[3]):b["default"].isNumber(arguments[4])?new l["default"](e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new l["default"](e,t,{min:arguments[2],max:arguments[3]}):b["default"].isString(n)?new c["default"](e,t):b["default"].isFunction(n)?new _["default"](e,t,""):b["default"].isBoolean(n)?new h["default"](e,t):null};t["default"]=g},function(e,t){"use strict";function n(e){setTimeout(e,1e3/60)}t.__esModule=!0,t["default"]=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var r=n(9),a=o(r),l=n(5),s=o(l),u=function(){function e(){i(this,e),this.backgroundElement=document.createElement("div"),s["default"].extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),a["default"].makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),s["default"].extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var t=this;a["default"].bind(this.backgroundElement,"click",function(){t.hide()})}return e.prototype.show=function(){var e=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),s["default"].defer(function(){e.backgroundElement.style.opacity=1,e.domElement.style.opacity=1,e.domElement.style.webkitTransform="scale(1)"})},e.prototype.hide=function t(){var e=this,t=function n(){e.domElement.style.display="none",e.backgroundElement.style.display="none",a["default"].unbind(e.domElement,"webkitTransitionEnd",n),a["default"].unbind(e.domElement,"transitionend",n),a["default"].unbind(e.domElement,"oTransitionEnd",n)};a["default"].bind(this.domElement,"webkitTransitionEnd",t),a["default"].bind(this.domElement,"transitionend",t),a["default"].bind(this.domElement,"oTransitionEnd",t),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"},e.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-a["default"].getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-a["default"].getHeight(this.domElement)/2+"px"},e}();t["default"]=u},function(e,t,n){t=e.exports=n(24)(),t.push([e.id,".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1!important}.dg.main .close-button.drag,.dg.main:hover .close-button{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;transition:opacity .1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save>ul{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height .1s ease-out;transition:height .1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid transparent}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.boolean,.dg .cr.boolean *,.dg .cr.function,.dg .cr.function *,.dg .cr.function .property-name{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px Lucida Grande,sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid hsla(0,0%,100%,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.boolean:hover,.dg .cr.function:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}}])});

/***/ },
/* 6 */
/***/ function(module, exports) {

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ColladaLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.ColladaLoader.prototype = {

	constructor: THREE.ColladaLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		function getBaseUrl( url ) {

			var parts = url.split( '/' );
			parts.pop();
			return ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';

		}

		var scope = this;

		var loader = new THREE.XHRLoader( scope.manager );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text, getBaseUrl( url ) ) );

		}, onProgress, onError );

	},

	options: {

		set convertUpAxis ( value ) {

			console.log( 'ColladaLoder.options.convertUpAxis: TODO' );

		}

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	parse: function ( text, baseUrl ) {

		function getElementsByTagName( xml, name ) {

			// Non recursive xml.getElementsByTagName() ...

			var array = [];
			var childNodes = xml.childNodes;

			for ( var i = 0, l = childNodes.length; i < l; i ++ ) {

				var child = childNodes[ i ];

				if ( child.nodeName === name ) {

					array.push( child );

				}

			}

			return array;

		}

		function parseFloats( text ) {

			if ( text.length === 0 ) return [];

			var parts = text.trim().split( /\s+/ );
			var array = new Array( parts.length );

			for ( var i = 0, l = parts.length; i < l; i ++ ) {

				array[ i ] = parseFloat( parts[ i ] );

			}

			return array;

		}

		function parseInts( text ) {

			if ( text.length === 0 ) return [];

			var parts = text.trim().split( /\s+/ );
			var array = new Array( parts.length );

			for ( var i = 0, l = parts.length; i < l; i ++ ) {

				array[ i ] = parseInt( parts[ i ] );

			}

			return array;

		}

		function parseId( text ) {

			return text.substring( 1 );

		}

		// asset

		function parseAsset( xml ) {

			return {
				unit: parseAssetUnit( getElementsByTagName( xml, 'unit' )[ 0 ] ),
				upAxis: parseAssetUpAxis( getElementsByTagName( xml, 'up_axis' )[ 0 ] )
			};

		}

		function parseAssetUnit( xml ) {

			return xml !== undefined ? parseFloat( xml.getAttribute( 'meter' ) ) : 1;

		}

		function parseAssetUpAxis( xml ) {

			return xml !== undefined ? xml.textContent : 'Y_UP';

		}

		// library

		function parseLibrary( xml, libraryName, nodeName, parser ) {

			var library = getElementsByTagName( xml, libraryName )[ 0 ];

			if ( library !== undefined ) {

				var elements = getElementsByTagName( library, nodeName );

				for ( var i = 0; i < elements.length; i ++ ) {

					parser( elements[ i ] );

				}

			}

		}

		function buildLibrary( data, builder ) {

			for ( var name in data ) {

				var object = data[ name ];
				object.build = builder( data[ name ] );

			}

		}

		// get

		function getBuild( data, builder ) {

			if ( data.build !== undefined ) return data.build;

			data.build = builder( data );

			return data.build;

		}

		// image

		var imageLoader = new THREE.ImageLoader();
		imageLoader.setCrossOrigin( this.crossOrigin );

		function parseImage( xml ) {

			var data = {
				init_from: getElementsByTagName( xml, 'init_from' )[ 0 ].textContent
			};

			library.images[ xml.getAttribute( 'id' ) ] = data;

		}

		function buildImage( data ) {

			if ( data.build !== undefined ) return data.build;

			var url = data.init_from;

			if ( baseUrl !== undefined ) url = baseUrl + url;

			return imageLoader.load( url );

		}

		function getImage( id ) {

			return getBuild( library.images[ id ], buildImage );

		}

		// effect

		function parseEffect( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'profile_COMMON':
						data.profile = parseEffectProfileCOMMON( child );
						break;

				}

			}

			library.effects[ xml.getAttribute( 'id' ) ] = data;

		}

		function parseEffectProfileCOMMON( xml ) {

			var data = {
				surfaces: {},
				samplers: {}
			};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'newparam':
						parseEffectNewparam( child, data );
						break;

					case 'technique':
						data.technique = parseEffectTechnique( child );
						break;

				}

			}

			return data;

		}

		function parseEffectNewparam( xml, data ) {

			var sid = xml.getAttribute( 'sid' );

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'surface':
						data.surfaces[ sid ] = parseEffectSurface( child );
						break;

					case 'sampler2D':
						data.samplers[ sid ] = parseEffectSampler( child );
						break;

				}

			}

		}

		function parseEffectSurface( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'init_from':
						data.init_from = child.textContent;
						break;

				}

			}

			return data;

		}

		function parseEffectSampler( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'source':
						data.source = child.textContent;
						break;

				}

			}

			return data;

		}

		function parseEffectTechnique( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'constant':
					case 'lambert':
					case 'blinn':
					case 'phong':
						data.type = child.nodeName;
						data.parameters = parseEffectParameters( child );
						break;

				}

			}

			return data;

		}

		function parseEffectParameters( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'emission':
					case 'diffuse':
					case 'specular':
					case 'shininess':
					case 'transparency':
						data[ child.nodeName ] = parseEffectParameter( child );
						break;

				}

			}

			return data;

		}

		function parseEffectParameter( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'color':
						data[ child.nodeName ] = parseFloats( child.textContent );
						break;

					case 'float':
						data[ child.nodeName ] = parseFloat( child.textContent );
						break;

					case 'texture':
						data[ child.nodeName ] = { id: child.getAttribute( 'texture' ), extra: parseEffectParameterTexture( child ) };
						break;

				}

			}

			return data;

		}

		function parseEffectParameterTexture( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'extra':
						data = parseEffectParameterTextureExtra( child );
						break;

				}

			}

			return data;

		}

		function parseEffectParameterTextureExtra( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'technique':
						data[ child.nodeName ] = parseEffectParameterTextureExtraTechnique( child );
						break;

				}

			}

			return data;

		}

		function parseEffectParameterTextureExtraTechnique( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'repeatU':
					case 'repeatV':
					case 'offsetU':
					case 'offsetV':
						data[ child.nodeName ] = parseFloat( child.textContent );
						break;

					case 'wrapU':
					case 'wrapV':
						data[ child.nodeName ] = parseInt( child.textContent );
						break;

				}

			}

			return data;

		}

		function buildEffect( data ) {

			return data;

		}

		function getEffect( id ) {

			return getBuild( library.effects[ id ], buildEffect );

		}

		// material

		function parseMaterial( xml ) {

			var data = {
				name: xml.getAttribute( 'name' )
			};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'instance_effect':
						data.url = parseId( child.getAttribute( 'url' ) );
						break;

				}

			}

			library.materials[ xml.getAttribute( 'id' ) ] = data;

		}

		function buildMaterial( data ) {

			var effect = getEffect( data.url );
			var technique = effect.profile.technique;

			var material;

			switch ( technique.type ) {

				case 'phong':
				case 'blinn':
					material = new THREE.MeshPhongMaterial();
					break;

				case 'lambert':
					material = new THREE.MeshLambertMaterial();
					break;

				default:
					material = new THREE.MeshBasicMaterial();
					break;

			}

			material.name = data.name;

			function getTexture( textureObject ) {

				var sampler = effect.profile.samplers[ textureObject.id ];

				if ( sampler !== undefined ) {

					var surface = effect.profile.surfaces[ sampler.source ];

					var texture = new THREE.Texture( getImage( surface.init_from ) );

					var extra = textureObject.extra;

					if ( extra !== undefined && extra.technique !== undefined ) {

						var technique = extra.technique;

						texture.wrapS = technique.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
						texture.wrapT = technique.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

						texture.offset.set( technique.offsetU, technique.offsetV );
						texture.repeat.set( technique.repeatU, technique.repeatV );

					} else {

						texture.wrapS = THREE.RepeatWrapping;
						texture.wrapT = THREE.RepeatWrapping;

					}

					texture.needsUpdate = true;

					return texture;

				}

				console.error( 'ColladaLoder: Undefined sampler', textureObject.id );

				return null;

			}

			var parameters = technique.parameters;

			for ( var key in parameters ) {

				var parameter = parameters[ key ];

				switch ( key ) {
					case 'diffuse':
						if ( parameter.color ) material.color.fromArray( parameter.color );
						if ( parameter.texture ) material.map = getTexture( parameter.texture );
						break;
					case 'specular':
						if ( parameter.color && material.specular )
							material.specular.fromArray( parameter.color );
						break;
					case 'shininess':
						if ( parameter.float && material.shininess )
							material.shininess = parameter.float;
						break;
					case 'emission':
						if ( parameter.color && material.emissive )
							material.emissive.fromArray( parameter.color );
						break;
					case 'transparency':
						if ( parameter.float )
							material.opacity = parameter.float;
						if ( parameter.float !== 1 )
							material.transparent = true;
						break;
				}

			}

			return material;

		}

		function getMaterial( id ) {

			return getBuild( library.materials[ id ], buildMaterial );

		}

		// camera

		function parseCamera( xml ) {

			var data = {
				name: xml.getAttribute( 'name' )
			};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'optics':
						data.optics = parseCameraOptics( child );
						break;

				}

			}

			library.cameras[ xml.getAttribute( 'id' ) ] = data;

		}

		function parseCameraOptics( xml ) {

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'technique_common':
						return parseCameraTechnique( child );

				}

			}

			return {};

		}

		function parseCameraTechnique( xml ) {

			var data = {};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'perspective':
					case 'orthographic':

						data.technique = child.nodeName;
						data.parameters = parseCameraParameters( child );

						break;

				}

			}

			return data;

		}

		function parseCameraParameters( xml ) {

			var data = {};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'xfov':
					case 'yfov':
					case 'xmag':
					case 'ymag':
					case 'znear':
					case 'zfar':
					case 'aspect_ratio':
						data[ child.nodeName ] = parseFloat( child.textContent );
						break;

				}

			}

			return data;

		}

		function buildCamera( data ) {

			var camera;

			switch ( data.optics.technique ) {

				case 'perspective':
					camera = new THREE.PerspectiveCamera(
						data.optics.parameters.yfov,
						data.optics.parameters.aspect_ratio,
						data.optics.parameters.znear,
						data.optics.parameters.zfar
					);
					break;

				case 'orthographic':
					camera = new THREE.OrthographicCamera( /* TODO */ );
					break;

				default:
					camera = new THREE.PerspectiveCamera();
					break;

			}

			camera.name = data.name;

			return camera;

		}

		function getCamera( id ) {

			return getBuild( library.cameras[ id ], buildCamera );

		}

		// light

		function parseLight( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'technique_common':
						data = parseLightTechnique( child );
						break;

				}

			}

			library.lights[ xml.getAttribute( 'id' ) ] = data;

		}

		function parseLightTechnique( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'directional':
					case 'point':
					case 'spot':
					case 'ambient':

						data.technique = child.nodeName;
						data.parameters = parseLightParameters( child );

				}

			}

			return data;

		}

		function parseLightParameters( xml ) {

			var data = {};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'color':
						var array = parseFloats( child.textContent );
						data.color = new THREE.Color().fromArray( array );
						break;

					case 'falloff_angle':
						data.falloffAngle = parseFloat( child.textContent );
						break;

					case 'quadratic_attenuation':
						var f = parseFloat( child.textContent );
						data.distance = f ? Math.sqrt( 1 / f ) : 0;
						break;

				}

			}

			return data;

		}

		function buildLight( data ) {

			var light;

			switch ( data.technique ) {

				case 'directional':
					light = new THREE.DirectionalLight();
					break;

				case 'point':
					light = new THREE.PointLight();
					break;

				case 'spot':
					light = new THREE.SpotLight();
					break;

				case 'ambient':
					light = new THREE.AmbientLight();
					break;

			}

			if ( data.parameters.color ) light.color.copy( data.parameters.color );
			if ( data.parameters.distance ) light.distance = data.parameters.distance;

			return light;

		}

		function getLight( id ) {

			return getBuild( library.lights[ id ], buildLight );

		}

		// geometry

		function parseGeometry( xml ) {

			var data = {
				name: xml.getAttribute( 'name' ),
				sources: {},
				vertices: {},
				primitives: []
			};

			var mesh = getElementsByTagName( xml, 'mesh' )[ 0 ];

			for ( var i = 0; i < mesh.childNodes.length; i ++ ) {

				var child = mesh.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				var id = child.getAttribute( 'id' );

				switch ( child.nodeName ) {

					case 'source':
						data.sources[ id ] = parseGeometrySource( child );
						break;

					case 'vertices':
						// data.sources[ id ] = data.sources[ parseId( getElementsByTagName( child, 'input' )[ 0 ].getAttribute( 'source' ) ) ];
						data.vertices = parseGeometryVertices( child );
						break;

					case 'polygons':
						console.log( 'ColladaLoader: Unsupported primitive type: ', child.nodeName );
						break;

					case 'lines':
					case 'linestrips':
					case 'polylist':
					case 'triangles':
						data.primitives.push( parseGeometryPrimitive( child ) );
						break;

					default:
						console.log( child );

				}

			}

			library.geometries[ xml.getAttribute( 'id' ) ] = data;

		}

		function parseGeometrySource( xml ) {

			var data = {
				array: [],
				stride: 3
			};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'float_array':
						data.array = parseFloats( child.textContent );
						break;

					case 'technique_common':
						var accessor = getElementsByTagName( child, 'accessor' )[ 0 ];

						if ( accessor !== undefined ) {

							data.stride = parseInt( accessor.getAttribute( 'stride' ) );

						}
						break;

					default:
						console.log( child );

				}

			}

			return data;

		}

		function parseGeometryVertices( xml ) {

			var data = {};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				data[ child.getAttribute( 'semantic' ) ] = parseId( child.getAttribute( 'source' ) );

			}

			return data;

		}

		function parseGeometryPrimitive( xml ) {

			var primitive = {
				type: xml.nodeName,
				material: xml.getAttribute( 'material' ),
				inputs: {},
				stride: 0
			};

			for ( var i = 0, l = xml.childNodes.length; i < l; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'input':
						var id = parseId( child.getAttribute( 'source' ) );
						var semantic = child.getAttribute( 'semantic' );
						var offset = parseInt( child.getAttribute( 'offset' ) );
						primitive.inputs[ semantic ] = { id: id, offset: offset };
						primitive.stride = Math.max( primitive.stride, offset + 1 );
						break;

					case 'vcount':
						primitive.vcount = parseInts( child.textContent );
						break;

					case 'p':
						primitive.p = parseInts( child.textContent );
						break;

				}

			}

			return primitive;

		}

		var DEFAULT_LINEMATERIAL = new THREE.LineBasicMaterial();
		var DEFAULT_MESHMATERIAL = new THREE.MeshPhongMaterial();

		function buildGeometry( data ) {

			var group = {};

			var sources = data.sources;
			var vertices = data.vertices;
			var primitives = data.primitives;

			if ( primitives.length === 0 ) return group;

			for ( var p = 0; p < primitives.length; p ++ ) {

				var primitive = primitives[ p ];
				var inputs = primitive.inputs;

				var geometry = new THREE.BufferGeometry();

				if ( data.name ) geometry.name = data.name;

				for ( var name in inputs ) {

					var input = inputs[ name ];

					switch ( name )	{

						case 'VERTEX':
							for ( var key in vertices ) {

								geometry.addAttribute( key.toLowerCase(), buildGeometryAttribute( primitive, sources[ vertices[ key ] ], input.offset ) );

							}
							break;

						case 'NORMAL':
							geometry.addAttribute( 'normal', buildGeometryAttribute( primitive, sources[ input.id ], input.offset ) );
							break;

						case 'COLOR':
							geometry.addAttribute( 'color', buildGeometryAttribute( primitive, sources[ input.id ], input.offset ) );
							break;

						case 'TEXCOORD':
							geometry.addAttribute( 'uv', buildGeometryAttribute( primitive, sources[ input.id ], input.offset ) );
							break;

					}

				}

				var object;

				switch ( primitive.type ) {

					case 'lines':
						object = new THREE.LineSegments( geometry, DEFAULT_LINEMATERIAL );
						break;

					case 'linestrips':
						object = new THREE.Line( geometry, DEFAULT_LINEMATERIAL );
						break;

					case 'triangles':
					case 'polylist':
						object = new THREE.Mesh( geometry, DEFAULT_MESHMATERIAL );
						break;

				}

				group[ primitive.material ] = object;

			}

			return group;

		}

		function buildGeometryAttribute( primitive, source, offset ) {

			var indices = primitive.p;
			var stride = primitive.stride;
			var vcount = primitive.vcount;

			function pushVector( i ) {

				var index = indices[ i + offset ] * sourceStride;
				var length = index + sourceStride;

				for ( ; index < length; index ++ ) {

					array.push( sourceArray[ index ] );

				}

			}

			var maxcount = 0;

			var sourceArray = source.array;
			var sourceStride = source.stride;

			var array = [];

			if ( primitive.vcount !== undefined ) {

				var index = 0;

				for ( var i = 0, l = vcount.length; i < l; i ++ ) {

					var count = vcount[ i ];

					if ( count === 4 ) {

						var a = index + stride * 0;
						var b = index + stride * 1;
						var c = index + stride * 2;
						var d = index + stride * 3;

						pushVector( a ); pushVector( b ); pushVector( d );
						pushVector( b ); pushVector( c ); pushVector( d );

					} else if ( count === 3 ) {

						var a = index + stride * 0;
						var b = index + stride * 1;
						var c = index + stride * 2;

						pushVector( a ); pushVector( b ); pushVector( c );

					} else {

						maxcount = Math.max( maxcount, count );

					}

					index += stride * count;

				}

				if ( maxcount > 0 ) {

					console.log( 'ColladaLoader: Geometry has faces with more than 4 vertices.' );

				}

			} else {

				for ( var i = 0, l = indices.length; i < l; i += stride ) {

					pushVector( i );

				}

			}

			return new THREE.Float32Attribute( array, sourceStride );

		}

		function getGeometry( id ) {

			return getBuild( library.geometries[ id ], buildGeometry );

		}

		// nodes

		var matrix = new THREE.Matrix4();
		var vector = new THREE.Vector3();

		function parseNode( xml ) {

			var data = {
				name: xml.getAttribute( 'name' ),
				matrix: new THREE.Matrix4(),
				nodes: [],
				instanceCameras: [],
				instanceLights: [],
				instanceGeometries: [],
				instanceNodes: []
			};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeType !== 1 ) continue;

				switch ( child.nodeName ) {

					case 'node':
						parseNode( child );
						data.nodes.push( child.getAttribute( 'id' ) );
						break;

					case 'instance_camera':
						data.instanceCameras.push( parseId( child.getAttribute( 'url' ) ) );
						break;

					case 'instance_light':
						data.instanceLights.push( parseId( child.getAttribute( 'url' ) ) );
						break;

					case 'instance_geometry':
						data.instanceGeometries.push( parseNodeInstanceGeometry( child ) );
						break;

					case 'instance_node':
						data.instanceNodes.push( parseId( child.getAttribute( 'url' ) ) );
						break;

					case 'matrix':
						var array = parseFloats( child.textContent );
						data.matrix.multiply( matrix.fromArray( array ).transpose() ); // .transpose() when Z_UP?
						break;

					case 'translate':
						var array = parseFloats( child.textContent );
						vector.fromArray( array );
						data.matrix.multiply( matrix.makeTranslation( vector.x, vector.y, vector.z ) );
						break;

					case 'rotate':
						var array = parseFloats( child.textContent );
						var angle = THREE.Math.degToRad( array[ 3 ] );
						data.matrix.multiply( matrix.makeRotationAxis( vector.fromArray( array ), angle ) );
						break;

					case 'scale':
						var array = parseFloats( child.textContent );
						data.matrix.scale( vector.fromArray( array ) );
						break;

					case 'extra':
						break;

					default:
						console.log( child );

				}

			}

			if ( xml.getAttribute( 'id' ) !== null ) {

				library.nodes[ xml.getAttribute( 'id' ) ] = data;

			}

			return data;

		}

		function parseNodeInstanceGeometry( xml ) {

			var data = {
				id: parseId( xml.getAttribute( 'url' ) ),
				materials: {}
			};

			for ( var i = 0; i < xml.childNodes.length; i ++ ) {

				var child = xml.childNodes[ i ];

				if ( child.nodeName === 'bind_material' ) {

					var instances = child.getElementsByTagName( 'instance_material' );

					for ( var j = 0; j < instances.length; j ++ ) {

						var instance = instances[ j ];
						var symbol = instance.getAttribute( 'symbol' );
						var target = instance.getAttribute( 'target' );

						data.materials[ symbol ] = parseId( target );

					}

					break;

				}

			}

			return data;

		}

		function buildNode( data ) {

			var objects = [];

			var matrix = data.matrix;
			var nodes = data.nodes;
			var instanceCameras = data.instanceCameras;
			var instanceLights = data.instanceLights;
			var instanceGeometries = data.instanceGeometries;
			var instanceNodes = data.instanceNodes;

			for ( var i = 0, l = nodes.length; i < l; i ++ ) {

				objects.push( getNode( nodes[ i ] ).clone() );

			}

			for ( var i = 0, l = instanceCameras.length; i < l; i ++ ) {

				objects.push( getCamera( instanceCameras[ i ] ).clone() );

			}

			for ( var i = 0, l = instanceLights.length; i < l; i ++ ) {

				objects.push( getLight( instanceLights[ i ] ).clone() );

			}

			for ( var i = 0, l = instanceGeometries.length; i < l; i ++ ) {

				var instance = instanceGeometries[ i ];
				var geometries = getGeometry( instance.id );

				for ( var key in geometries ) {

					var object = geometries[ key ].clone();

					if ( instance.materials[ key ] !== undefined ) {

						object.material = getMaterial( instance.materials[ key ] );

					}

					objects.push( object );

				}

			}

			for ( var i = 0, l = instanceNodes.length; i < l; i ++ ) {

				objects.push( getNode( instanceNodes[ i ] ).clone() );

			}

			var object;

			if ( nodes.length === 0 && objects.length === 1 ) {

				object = objects[ 0 ];

			} else {

				object = new THREE.Group();

				for ( var i = 0; i < objects.length; i ++ ) {

					object.add( objects[ i ] );

				}

			}

			object.name = data.name;
			matrix.decompose( object.position, object.quaternion, object.scale );

			return object;

		}

		function getNode( id ) {

			return getBuild( library.nodes[ id ], buildNode );

		}

		// visual scenes

		function parseVisualScene( xml ) {

			var data = {
				name: xml.getAttribute( 'name' ),
				children: []
			};

			var elements = getElementsByTagName( xml, 'node' );

			for ( var i = 0; i < elements.length; i ++ ) {

				data.children.push( parseNode( elements[ i ] ) );

			}

			library.visualScenes[ xml.getAttribute( 'id' ) ] = data;

		}

		function buildVisualScene( data ) {

			var group = new THREE.Group();
			group.name = data.name;

			var children = data.children;

			for ( var i = 0; i < children.length; i ++ ) {

				group.add( buildNode( children[ i ] ) );

			}

			return group;

		}

		function getVisualScene( id ) {

			return getBuild( library.visualScenes[ id ], buildVisualScene );

		}

		// scenes

		function parseScene( xml ) {

			var instance = getElementsByTagName( xml, 'instance_visual_scene' )[ 0 ];
			return getVisualScene( parseId( instance.getAttribute( 'url' ) ) );

		}

		console.time( 'ColladaLoader' );

		if ( text.length === 0 ) {

			return { scene: new THREE.Scene() };

		}

		console.time( 'ColladaLoader: DOMParser' );

		var xml = new DOMParser().parseFromString( text, 'application/xml' );

		console.timeEnd( 'ColladaLoader: DOMParser' );

		var collada = getElementsByTagName( xml, 'COLLADA' )[ 0 ];

		// metadata

		var version = collada.getAttribute( 'version' );
		console.log( 'ColladaLoader: File version', version );

		var asset = parseAsset( getElementsByTagName( collada, 'asset' )[ 0 ] );

		//

		var library = {
			images: {},
			effects: {},
			materials: {},
			cameras: {},
			lights: {},
			geometries: {},
			nodes: {},
			visualScenes: {}
		};

		console.time( 'ColladaLoader: Parse' );

		parseLibrary( collada, 'library_images', 'image', parseImage );
		parseLibrary( collada, 'library_effects', 'effect', parseEffect );
		parseLibrary( collada, 'library_materials', 'material', parseMaterial );
		parseLibrary( collada, 'library_cameras', 'camera', parseCamera );
		parseLibrary( collada, 'library_lights', 'light', parseLight );
		parseLibrary( collada, 'library_geometries', 'geometry', parseGeometry );
		parseLibrary( collada, 'library_nodes', 'node', parseNode );
		parseLibrary( collada, 'library_visual_scenes', 'visual_scene', parseVisualScene );

		console.timeEnd( 'ColladaLoader: Parse' );

		console.time( 'ColladaLoader: Build' );

		buildLibrary( library.images, buildImage );
		buildLibrary( library.effects, buildEffect );
		buildLibrary( library.materials, buildMaterial );
		buildLibrary( library.cameras, buildCamera );
		buildLibrary( library.lights, buildLight );
		buildLibrary( library.geometries, buildGeometry );
		buildLibrary( library.nodes, buildNode );
		buildLibrary( library.visualScenes, buildVisualScene );

		console.timeEnd( 'ColladaLoader: Build' );

		// console.log( library );

		var scene = parseScene( getElementsByTagName( collada, 'scene' )[ 0 ] );

		if ( asset.upAxis === 'Z_UP' ) {

			scene.rotation.x = - Math.PI / 2;

		}

		scene.scale.multiplyScalar( asset.unit );

		console.timeEnd( 'ColladaLoader' );

		// console.log( scene );

		return {
			animations: [],
			kinematics: { joints: [] },
			scene: scene
		};

	}

};


/***/ },
/* 7 */
/***/ function(module, exports) {

/**
 * @author mrdoob / http://mrdoob.com/
 */
/* global THREE */
THREE.OBJLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	this.materials = null;

	this.regexp = {
		// v float float float
		vertex_pattern           : /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vn float float float
		normal_pattern           : /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vt float float
		uv_pattern               : /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// f vertex vertex vertex
		face_vertex              : /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
		// f vertex/uv vertex/uv vertex/uv
		face_vertex_uv           : /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
		face_vertex_uv_normal    : /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
		// f vertex//normal vertex//normal vertex//normal
		face_vertex_normal       : /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
		// sketchUP style f vertex//uv/normal
		sketchup_style_f_v_n     : /^f(?:\s+(?:\d+)\/(?:\d+)?\/(?:\d+)){3}.{2,}/,
		// o object_name | g group_name
		object_pattern           : /^[og]\s*(.+)?/,
		// s boolean
		smoothing_pattern        : /^s\s+(\d+|on|off)/,
		// mtllib file_reference
		material_library_pattern : /^mtllib /,
		// usemtl material_name
		material_use_pattern     : /^usemtl /
	};

};

THREE.OBJLoader.prototype = {

	constructor: THREE.OBJLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		let scope = this;

		let loader = new THREE.FileLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;

	},

	setMaterials: function ( materials ) {

		this.materials = materials;

	},

	_createParserState : function () {

		let state = {
			objects  : [],
			object   : {},

			vertices : [],
			normals  : [],
			uvs      : [],

			materialLibraries : [],

			startObject: function ( name, fromDeclaration ) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if ( this.object && this.object.fromDeclaration === false ) {

					this.object.name = name;
					this.object.fromDeclaration = ( fromDeclaration !== false );
					return;

				}

				let previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

				this.object = {
					name : name || '',
					fromDeclaration : ( fromDeclaration !== false ),

					geometry : {
						vertices : [],
						normals  : [],
						uvs      : []
					},
					materials : [],
					smooth : true,

					startMaterial : function( name, libraries ) {

						let previous = this._finalize( false );

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

							this.materials.splice( previous.index, 1 );

						}

						let material = {
							index      : this.materials.length,
							name       : name || '',
							mtllib     : ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
							smooth     : ( previous !== undefined ? previous.smooth : this.smooth ),
							groupStart : ( previous !== undefined ? previous.groupEnd : 0 ),
							groupEnd   : -1,
							groupCount : -1,
							inherited  : false,

							clone : function( index ) {
								let cloned = {
									index      : ( typeof index === 'number' ? index : this.index ),
									name       : this.name,
									mtllib     : this.mtllib,
									smooth     : this.smooth,
									groupStart : 0,
									groupEnd   : -1,
									groupCount : -1,
									inherited  : false
								};
								cloned.clone = this.clone.bind(cloned);
								return cloned;
							}
						};

						this.materials.push( material );

						return material;

					},

					currentMaterial : function() {

						if ( this.materials.length > 0 ) {
							return this.materials[ this.materials.length - 1 ];
						}

						return undefined;

					},

					_finalize : function( end ) {

						let lastMultiMaterial = this.currentMaterial();
						if ( lastMultiMaterial && lastMultiMaterial.groupEnd === -1 ) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Ignore objects tail materials if no face declarations followed them before a new o/g started.
						if ( end && this.materials.length > 1 ) {

							for ( let mi = this.materials.length - 1; mi >= 0; mi-- ) {
								if ( this.materials[mi].groupCount <= 0 ) {
									this.materials.splice( mi, 1 );
								}
							}

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if ( end && this.materials.length === 0 ) {

							this.materials.push({
								name   : '',
								smooth : this.smooth
							});

						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function' ) {

					let declared = previousMaterial.clone( 0 );
					declared.inherited = true;
					this.object.materials.push( declared );

				}

				this.objects.push( this.object );

			},

			finalize : function() {

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

			},

			parseVertexIndex: function ( value, len ) {

				let index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseNormalIndex: function ( value, len ) {

				let index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseUVIndex: function ( value, len ) {

				let index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

			},

			addVertex: function ( a, b, c ) {

				let src = this.vertices;
				let dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addVertexLine: function ( a ) {

				let src = this.vertices;
				let dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );

			},

			addNormal : function ( a, b, c ) {

				let src = this.normals;
				let dst = this.object.geometry.normals;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addUV: function ( a, b, c ) {

				let src = this.uvs;
				let dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );

			},

			addUVLine: function ( a ) {

				let src = this.uvs;
				let dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );

			},

			addFace: function ( a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd ) {

				let vLen = this.vertices.length;

				let ia = this.parseVertexIndex( a, vLen );
				let ib = this.parseVertexIndex( b, vLen );
				let ic = this.parseVertexIndex( c, vLen );
				let id;

				if ( d === undefined ) {

					this.addVertex( ia, ib, ic );

				} else {

					id = this.parseVertexIndex( d, vLen );

					this.addVertex( ia, ib, id );
					this.addVertex( ib, ic, id );

				}

				if ( ua !== undefined ) {

					let uvLen = this.uvs.length;

					ia = this.parseUVIndex( ua, uvLen );
					ib = this.parseUVIndex( ub, uvLen );
					ic = this.parseUVIndex( uc, uvLen );

					if ( d === undefined ) {

						this.addUV( ia, ib, ic );

					} else {

						id = this.parseUVIndex( ud, uvLen );

						this.addUV( ia, ib, id );
						this.addUV( ib, ic, id );

					}

				}

				if ( na !== undefined ) {

					// Normals are many times the same. If so, skip function call and parseInt.
					let nLen = this.normals.length;
					ia = this.parseNormalIndex( na, nLen );

					ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
					ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

					if ( d === undefined ) {

						this.addNormal( ia, ib, ic );

					} else {

						id = this.parseNormalIndex( nd, nLen );

						this.addNormal( ia, ib, id );
						this.addNormal( ib, ic, id );

					}

				}

			},

			addLineGeometry: function ( vertices, uvs ) {

				this.object.geometry.type = 'Line';

				let vLen = this.vertices.length;
				let uvLen = this.uvs.length;

				for ( let vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

				for ( let uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

					this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

				}

			}

		};

		state.startObject( '', false );

		return state;

	},

	parse: function ( text ) {

		console.time( 'OBJLoader' );

		let state = this._createParserState();

		if ( text.indexOf( '\r\n' ) !== - 1 ) {

			// This is faster than String.split with regex that splits on both
			text = text.replace( /\r\n/g, '\n' );

		}

		if ( text.indexOf( '\\\n' ) !== - 1) {

			// join lines separated by a line continuation character (\)
			text = text.replace( /\\\n/g, '' );

		}

		let lines = text.split( '\n' );
		let line = '', lineFirstChar = '', lineSecondChar = '';
		let lineLength = 0;
		let result = [];

		// Faster to just trim left side of the line. Use if available.
		let trimLeft = ( typeof ''.trimLeft === 'function' );

		for ( let i = 0, l = lines.length; i < l; i ++ ) {

			line = lines[ i ];

			line = trimLeft ? line.trimLeft() : line.trim();

			lineLength = line.length;

			if ( lineLength === 0 ) continue;

			lineFirstChar = line.charAt( 0 );

			// @todo invoke passed in handler if any
			if ( lineFirstChar === '#' ) continue;

			if ( lineFirstChar === 'v' ) {

				lineSecondChar = line.charAt( 1 );

				if ( lineSecondChar === ' ' && ( result = this.regexp.vertex_pattern.exec( line ) ) !== null ) {

					// 0                  1      2      3
					// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.vertices.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 'n' && ( result = this.regexp.normal_pattern.exec( line ) ) !== null ) {

					// 0                   1      2      3
					// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.normals.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 't' && ( result = this.regexp.uv_pattern.exec( line ) ) !== null ) {

					// 0               1      2
					// ["vt 0.1 0.2", "0.1", "0.2"]

					state.uvs.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] )
					);

				} else {

					throw new Error( 'Unexpected vertex/normal/uv line: \'' + line  + '\'' );

				}

			} else if ( lineFirstChar === 'f' ) {
				//f ( 1/1/1 2/2/2 3/3/3 )+ 
				// 0                        1    2    3    4    5    6    7    8    9   10         11         12
				// ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]
				if( this.regexp.sketchup_style_f_v_n.test(line) ) {
					let faces = line.split(' ');
					faces.shift();//to remove "f" character
					while(faces.length > 0) {
						// state.startObject('');
						const a = faces[0].split('/');
						const b = faces[1].split('/');
						const c = faces[2].split('/'); 
						state.addFace(
							a[ 0 ], b[ 0 ], c[ 0 ], undefined,
							a[ 1 ], b[ 1 ], c[ 1 ], undefined,
							a[ 2 ], b[ 2 ], c[ 2 ], undefined
						);
						faces = faces.slice(0,3);
					}
					
				}
				else if ( ( result = this.regexp.face_vertex_uv_normal.exec( line ) ) !== null ) {

					// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
					// 0                        1    2    3    4    5    6    7    8    9   10         11         12
					// ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 4 ], result[ 7 ], result[ 10 ],
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);

				} else if ( ( result = this.regexp.face_vertex_uv.exec( line ) ) !== null ) {

					// f vertex/uv vertex/uv vertex/uv
					// 0                  1    2    3    4    5    6   7          8
					// ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex_normal.exec( line ) ) !== null ) {

					// f vertex//normal vertex//normal vertex//normal
					// 0                     1    2    3    4    5    6   7          8
					// ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						undefined, undefined, undefined, undefined,
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex.exec( line ) ) !== null ) {

					// f vertex vertex vertex
					// 0            1    2    3   4
					// ["f 1 2 3", "1", "2", "3", undefined]

					state.addFace(
						result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
					);

				} else {

					throw new Error( 'Unexpected face line: \'' + line  + '\'' );

				}

			} else if ( lineFirstChar === 'l' ) {

				let lineParts = line.substring( 1 ).trim().split( ' ' );
				let lineVertices = [], lineUVs = [];

				if ( line.indexOf( '/' ) === - 1 ) {

					lineVertices = lineParts;

				} else {

					for ( let li = 0, llen = lineParts.length; li < llen; li ++ ) {

						let parts = lineParts[ li ].split( '/' );

						if ( parts[ 0 ] !== '' ) lineVertices.push( parts[ 0 ] );
						if ( parts[ 1 ] !== '' ) lineUVs.push( parts[ 1 ] );

					}

				}
				state.addLineGeometry( lineVertices, lineUVs );

			} else if ( ( result = this.regexp.object_pattern.exec( line ) ) !== null ) {

				// o object_name
				// or
				// g group_name

				// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
				// let name = result[ 0 ].substr( 1 ).trim();
				let name = ( ' ' + result[ 0 ].substr( 1 ).trim() ).substr( 1 );

				state.startObject( name );

			} else if ( this.regexp.material_use_pattern.test( line ) ) {

				// material

				state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

			} else if ( this.regexp.material_library_pattern.test( line ) ) {

				// mtl file

				state.materialLibraries.push( line.substring( 7 ).trim() );

			} else if ( ( result = this.regexp.smoothing_pattern.exec( line ) ) !== null ) {

				// smooth shading

				// @todo Handle files that have letying smooth values for a set of faces inside one geometry,
				// but does not define a usemtl for each face set.
				// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
				// This requires some care to not create extra material on each smooth value for "normal" obj files.
				// where explicit usemtl defines geometry groups.
				// Example asset: examples/models/obj/cerberus/Cerberus.obj

				let value = result[ 1 ].trim().toLowerCase();
				state.object.smooth = ( value === '1' || value === 'on' );

				let material = state.object.currentMaterial();
				if ( material ) {

					material.smooth = state.object.smooth;

				}

			} else {

				// Handle null terminated files without exception
				if ( line === '\0' ) continue;

				throw new Error( 'Unexpected line: \'' + line  + '\'' );

			}

		}

		state.finalize();

		let container = new THREE.Group();
		container.materialLibraries = [].concat( state.materialLibraries );

		for ( let i = 0, l = state.objects.length; i < l; i ++ ) {

			let object = state.objects[ i ];
			let geometry = object.geometry;
			let materials = object.materials;
			let isLine = ( geometry.type === 'Line' );

			// Skip o/g line declarations that did not follow with any faces
			if ( geometry.vertices.length === 0 ) continue;

			let buffergeometry = new THREE.BufferGeometry();

			buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );

			if ( geometry.normals.length > 0 ) {

				buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );

			} else {

				buffergeometry.computeVertexNormals();

			}

			if ( geometry.uvs.length > 0 ) {

				buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );

			}

			// Create materials

			let createdMaterials = [];

			for ( let mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

				let sourceMaterial = materials[mi];
				let material = undefined;

				if ( this.materials !== null ) {

					material = this.materials.create( sourceMaterial.name );

					// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
					if ( isLine && material && ! ( material instanceof THREE.LineBasicMaterial ) ) {

						let materialLine = new THREE.LineBasicMaterial();
						materialLine.copy( material );
						material = materialLine;

					}

				}

				if ( ! material ) {

					material = ( ! isLine ? new THREE.MeshPhongMaterial() : new THREE.LineBasicMaterial() );
					material.name = sourceMaterial.name;

				}

				material.shading = sourceMaterial.smooth ? THREE.SmoothShading : THREE.FlatShading;

				createdMaterials.push(material);

			}

			// Create mesh

			let mesh;

			if ( createdMaterials.length > 1 ) {

				for ( let mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

					let sourceMaterial = materials[mi];
					buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

				}

				let multiMaterial = new THREE.MultiMaterial( createdMaterials );
				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, multiMaterial ) : new THREE.LineSegments( buffergeometry, multiMaterial ) );

			} else {

				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, createdMaterials[ 0 ] ) : new THREE.LineSegments( buffergeometry, createdMaterials[ 0 ] ) );
			}

			mesh.name = object.name;

			container.add( mesh );

		}

		console.timeEnd( 'OBJLoader' );

		return container;

	}

};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ },
/* 9 */
/***/ function(module, exports) {

/**
 * @param {THREE.Scene} _scene
 * @param {THREE.Geometry} object
 */
function drawNormalOn(object) {
	let group = new THREE.Group();
	object.faces.forEach(f => {
		group.add( lineoOnFace(f, object.vertices) );
	});
	return group;
}
/**
 * @param {THREE.Face3} f
 * @param {THREE.Vector3[]} vertices
 */
function lineoOnFace(f, vertices){
	var material = new THREE.LineBasicMaterial({color: 0x0000ff});

	var geometry = new THREE.Geometry();
	let p1 = new THREE.Vector3();
	let p2 = new THREE.Vector3();
	geometry.vertices.push(
		//三角形重心
		p1.copy( vertices[f.a] )
			.add( vertices[f.b] )
			.add( vertices[f.c] )
			.divideScalar( 3 ),
		p2.copy(p1).add( f.normal.normalize().multiplyScalar(0.5))
	);

	const line = new THREE.LineSegments( geometry, material );
	return line;
}
module.exports = {drawNormalOn};


/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_ObjectView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__View_UnfoldView__ = __webpack_require__(2);



init();
function init(){
	let model_view = new __WEBPACK_IMPORTED_MODULE_0__View_ObjectView__["a" /* default */]();
	model_view.appendTo(document.getElementById('model_view'));
	model_view.animate();


	let texture_View = new __WEBPACK_IMPORTED_MODULE_1__View_UnfoldView__["a" /* default */]();
	texture_View.appendTo(document.getElementById('unfold_view'));
	texture_View.animate();
}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**@type {THREE.Scene} scene */
let scene;

/** @callback 
 *  @param {THREE.Group} group
*/
let _callback;
/* harmony default export */ exports["a"] = function (_scene) {
	scene = _scene;
	setLight();
	setPlane();
	loadObj();

	return { onObjectFileLoaded	}
};

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
		const green = new THREE.MeshPhongMaterial({color: 0x00ff00});
		let c = group.children[0];
		
		const geometry = new THREE.Geometry().fromBufferGeometry(c.geometry);
		let cube = new THREE.Mesh(geometry, green);
		cube.name = 'cube'
		cube.castShadow = true;
		scene.add( cube );
		
		_callback(cube.geometry);
	});
}

function onObjectFileLoaded(callback) {
	_callback = callback;
}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map