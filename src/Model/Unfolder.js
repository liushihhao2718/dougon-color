/**
 * @param {THREE.Geometry} geometry
 */
let scope = this;
/**
 * @return {Array<THREE.Mesh>}
 */
function unfold(geometry) {
	scope.geometry = geometry;
	let faces = geometry.faces;
	// [ [f,f...] , [f,f...] ]
	let groupedFaces = groupBy(faces, (a, b)=> normalEqual(a, b) && connected(a, b) );
	let meshies = groupedFaces.map(g => makeMesh(g) );
	return meshies;
}
/**
 * @param {(function(THREE.Face3,THREE.Face3))} cb
 */
function groupBy(_array, cb){
	let groupedFaces = [];
	let map = {};
	/**
	 * input
	 * 1 -> 2 -> 3
	 * 
	 * 4 -> 5
	 * output
	 * {
	 * 	1 : [2],
	 * 	2 : [3],
	 * 	3 : [],
	 *  4 : [5],
	 *  5 : []
	 * }
	 * 
	 */
	let i, j;
	for(i=0 ; i < _array.length ; i++) {
		map[i] = [];

		for(j= i+1 ; j < _array.length ; j++) {

			if( cb(_array[i], _array[j]) ) {
				map[i].push(j);
			}
		}
	}

	/**
	 * result
	 * {
	 * 1:[2,3]
	 * 4:[5]
	 * }
	 */

	for( key in map) {
		let subgroup = [];
		
	}
	return groupedFaces;
}

/**
 * @param {THREE.Face3} face_a
 * @param {THREE.Face3} face_aface_b
 */
function normalEqual( face_a, face_b ) {
	let n_a = face_a.normal.normalize();
	let n_b = face_b.normal.normalize()
	
	return n_a.equals( n_b );
}

/**
 * @param {THREE.Face3} face_a
 * @param {THREE.Face3} face_aface_b
 */
function connected( face_a, face_b ) {
// connected triangles have 2 same point.

	let a = [ face_a.a, face_a.b, face_a.c ];
	let count = 0;
	if( a.some(v => eq(v, face_b.a)) ) count++;
	if( a.some(v => eq(v, face_b.b)) ) count++;
	if( a.some(v => eq(v, face_b.c)) ) count++;

	return (count === 2);
}

function eq(a,b){
	let geometry = scope.geometry;

/**
 * @type {THREE.Vector3} vertex_1,vertex_2
 */
	let vertex_1 = geometry.vertices[a];
	let vertex_2 = geometry.vertices[b];


	
	return (
		close(vertex_1.x, vertex_2.x)
		&&close(vertex_1.y, vertex_2.y)
		&&close(vertex_1.z, vertex_2.z)
	);
}
/**
 * @param {number} a,b
 */
function close(a,b){
	return Math.abs(a - b) < 0.001;
}
/**
 * @returns {THREE.MeshBasicMaterial}
 */
function randomMaterial(){
	return new THREE.MeshBasicMaterial({
		color: Math.random() * 0xffffff, 
		side: THREE.FrontSide
	});
}

/**
 * @param {THREE.Face3[]} groupedFaces
 * @return {THREE.Mesh}
 */
function makeMesh(groupedFaces){
	let geometry = scope.geometry;
	let unfold_face_geo = new THREE.Geometry();

	unfold_face_geo.vertices = groupedFaces.map(f=>[ f.a,f.b,f.c ])
		.reduce((a,b) => a.concat(b) )
		.map(v => geometry.vertices[v]);
	unfold_face_geo.faces = groupedFaces.map((_,i)=>i*3).map(i=>new THREE.Face3(i, i+1, i+2));

	let n = groupedFaces[0].normal.normalize().multiplyScalar(0.1);
	unfold_face_geo.translate(n.x, n.y, n.z);
	let mesh = new THREE.Mesh( unfold_face_geo, randomMaterial() );

	return mesh;
}
export default {unfold};