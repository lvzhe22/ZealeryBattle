function resizeImage() {
	document.getElementById("image").style.height="35%";
	document.getElementById("image").style.height="35%";
	
}

$(window).on('load resize', function(){
    $('#div').width($(this).width());
});