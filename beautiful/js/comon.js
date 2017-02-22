$(function(){
	
	$(".footer div").click(function(){
		var txt = $(this).find("p").text();
		 if( txt == "我的乐美"){
		 	 window.location.href = "MyIndex.html";
		 }else if( txt == "购物车"){
		 	 window.location.href = "shoppingCart.html";
		 }else if( txt == "更多"){
		 	 window.location.href = "More.html";
		 }else if( txt == "分类"){
		 	 window.location.href = "Classfiy.html";
		 }
		 
		 
	});
	
	$(".direction").click(function(){
		 window.history.back();
	});
});