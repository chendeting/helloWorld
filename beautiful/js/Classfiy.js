$(function(){
	//分类栏
	var click = true;
	$(".all p").children("i").click(function() {
		if (click) {
			click = false;
			$(this).attr("class", "fa fa-angle-down");
			$(".link").show();
		} else {
			click = true;
			$(this).attr("class", "fa fa-angle-right");
			$(".link").hide();
		}
	});
});
