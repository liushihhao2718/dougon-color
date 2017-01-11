function computeFaceNormals(face, vertices) {
	let cb = new THREE.Vector3()
	let ab = new THREE.Vector3();
	const vA = vertices[ face.a ];
	const vB = vertices[ face.b ];
	const vC = vertices[ face.c ];

	cb.subVectors( vC, vB );
	ab.subVectors( vA, vB );
	cb.cross( ab );

	cb.normalize();

	return cb;
}

function vector_equal(vertex_1, vertex_2, deviation = 0.1){
	
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
export {computeFaceNormals, vector_equal}