import ObjectView from './View/ObjectView';
import UnfoldView from './View/UnfoldView';

init();
function init(){
	let model_view = new ObjectView();
	model_view.appendTo(document.getElementById('model_view'));
	model_view.animate();


	let texture_View = new UnfoldView();
	texture_View.appendTo(document.getElementById('unfold_view'));
	texture_View.animate();
}