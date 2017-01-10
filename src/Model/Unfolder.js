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
	let groupedFaces = groupBy(faces, (a, b)=> samePlane(a, b) );
	let meshies = groupedFaces.map(g => makeMesh(g) );
	return meshies;
}
/**
 * @param {(function(THREE.Face3,THREE.Face3))} cb
 */
function groupBy(_array, cb){
	let adj = makeAdjacencyList(_array, cb);
	let groupedFaces = dfs(_array, adj);
	
	return groupedFaces;
}

function makeAdjacencyList(_array, cb){
	let map = new Map();
	/**
	 * input
	 * 1 -> 2 -> 3
	 * 
	 * 4 -> 5
	 * output
	 * {
	 * 	1 : {[2], visited: false},
	 * 	2 : [3],
	 * 	3 : [],
	 *  4 : [5],
	 *  5 : []
	 * }
	 * 
	 */
	let i, j;
	for(i=0 ; i < _array.length ; i++) {
		map.set(i, {neighbor:[], visited: false});

		for(j= 0 ; j < _array.length ; j++) {
			if(i==j) continue;
			else if( cb(_array[i], _array[j]) ) {
				map.get(i).neighbor.push(j);
			}
		}
	}
	return map;
}

function dfs(_array, adj){
	let groupedFaces = new Set();
	
	/**
	result
	[  [1, 2, 3], [4, 5], [...], ...  ]
	 */
	for(let key of adj.keys() ){
		if( adj.get(key).visited ) continue;
		let subgroup = findConnect( key );
		groupedFaces.add( subgroup.map( i => _array[i]) );
	}
	for(let g of groupedFaces) {
		if( g.length === 0 ) groupedFaces.delete( g );
	}
	function findConnect(key){
		
		if( adj.get(key).visited ) return [];
		adj.get(key).visited = true;

		let subgroup = [key];

		for(let i of adj.get(key).neighbor) {
			subgroup = subgroup.concat( findConnect(i) );
		}
		return subgroup;
	}
	return Array.from(groupedFaces.values() );
}

function samePlane(face_a, face_b) {
	// return false;
	return normalEqual(face_a, face_b) && connected( face_a, face_b );
	// return normalEqual(face_a, face_b) && vertical( face_a.normal, face_a, face_b );
}

function vertical(n, face_a, face_b){
	let p_a = scope.geometry.vertices[face_a.a];
	let p_b = scope.geometry.vertices[face_b.a];
	let v = p_a.clone().sub(p_b);

	return n.dot( v ) < 0.001;
}
/**
 * @param {THREE.Face3} face_a
 * @param {THREE.Face3} face_aface_b
 */
function normalEqual( face_a, face_b ) {
	
	let n_a = computeFaceNormals(face_a);
	let n_b = computeFaceNormals(face_b);
	
	return vector_equal(n_a, n_b, Math.PI * 0.1 / 180);
}

/**
 * @param {THREE.Face3} face_a
 * @param {THREE.Face3} face_aface_b
 */
function connected( face_a, face_b ) {
	// connected triangles have 2 same point.
	let a = [ face_a.a, face_a.b, face_a.c ];
	let b = [ face_b.a, face_b.b, face_b.c ];
	let count = 0;
	let list = scope.geometry.vertices;

	for(let v of a) {
		for(let u of b)
			if( vector_equal( list[v], list[u] )) count++;
	}
	return (count > 1);
}

function vector_equal(vertex_1,vertex_2, deviation = 0.1){
	
	return (
		close(vertex_1.x, vertex_2.x, deviation)
		&&close(vertex_1.y, vertex_2.y, deviation)
		&&close(vertex_1.z, vertex_2.z, deviation)
	);
}
/**
 * @param {number} a,b
 */
function close(a,b, deviation){
	return Math.abs(a - b) < deviation;
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

function computeFaceNormals(face) {

	var cb = new THREE.Vector3(), ab = new THREE.Vector3();


		var vA = scope.geometry.vertices[ face.a ];
		var vB = scope.geometry.vertices[ face.b ];
		var vC = scope.geometry.vertices[ face.c ];

		cb.subVectors( vC, vB );
		ab.subVectors( vA, vB );
		cb.cross( ab );

		cb.normalize();

		return cb;
}