function sassylogo() {
	var keyframes = [];
	var atmos_logo_svg = document.getElementById('atmos_logo').contentDocument;
	console.log(atmos_logo_svg);
	keyframes[0] = atmos_logo_svg.getElementById('atmos_logo_keyframe_1');
	keyframes[1] = atmos_logo_svg.getElementById('atmos_logo_keyframe_2');
	var tl = new TimelineLite();
	tl.to(keyframes[0], 1, {morphSVG:keyframes[1]});
}