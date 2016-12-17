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
