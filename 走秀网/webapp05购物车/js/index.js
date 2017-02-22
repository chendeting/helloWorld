var myScroll;
var navScroll;
var $title=$(".mainPage header h1");
$(window).resize(function(){
	var $imgBox=$(".imgBox");
	$imgBox.height($imgBox.width());
})
getData(1,0);
loaded ();
addNavScroll();
getcar({userID:"941212",callback:function(data){
	$(".carpop").html(data.length);
}});
getNavData(function(data){
	var navWidth=0;
	var $scrollBox=$("#scrollBox");
	//console.log(data);
	if(data){
		var thisData=JSON.parse(data);
		var $nav=$(".mainPage-nav div");
		$.each(thisData, function(i) {
			var $icon=$("<i class='iconfont navBtn'>"+thisData[i].icon+"</i>");
			$nav.append($icon);
			navWidth+=50;
			$icon.on("click",function(){
				//console.log(thisData[i].classID);
				$scrollBox.html("");
				getData(thisData[i].classID,0);
				$title.text(thisData[i].className);
				$title[0].pageCode=0;
			})
		});
		$nav.width(navWidth);
		navScroll.refresh();
	}
	
});

function loaded () {
	myScroll = new IScroll('#wrapper', { 
		scrollbars: false, 
		mouseWheel: true, 
		interactiveScrollbars: true,
		click:true
	});
}
myScroll.on("scrollStart",function(){
				
})
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function getData(classID,pageCode){
	var thispageCode=pageCode?pageCode:0;
	var thisclassID=classID?classID:0;
	$title[0].classID=thisclassID;
	//console.log($title[0].classID);
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:thisclassID,pageCode:thispageCode},
		dataType:"jsonp",
		success:function(data){
//			<div class="prodBox">
//						<div><img src=""></div>
//						<div class="prodname"></div>
//						<div class="picBox"><span></span><span></span></div>
//					</div>
			var $scrollBox=$("#scrollBox");
			//console.log($scrollBox.width());
			//var proH=$scrollBox.width()*0.5-10;
			if(data.length){
				$.each(data, function(index) {

					createList(index,data,$scrollBox);
					
				});
				
			}
		}
	})
}
function createList(index,data,$scrollBox){
	var $prodBox=$("<div class='prodBox'>");
					var imgBox=$("<div class='imgBox'>图片加载中</div>");
					var thisimg=$("<img src='"+data[index].goodsListImg+"' />");
					var prodname=$("<div class='prodname'>"+data[index].goodsName+"</div>");
					var picBox=$("<div class='picBox'>"+data[index].price+"</div>");
					
					$prodBox.append(imgBox);
					$prodBox.append(prodname);
					$prodBox.append(picBox);
					$scrollBox.append($prodBox);
					imgBox.height(imgBox.width());
					thisimg.on("load",function(){
						myScroll.refresh();
						imgBox.html(thisimg);
					})
					thisimg.on("click",function(){
						addcar(data[index].goodsID);
						//window.location="html/goods.html?goodsID="+encodeURI(data[index].goodsID);
					})
					
}

function addcar(goodsID){
	//console.log(window.localStorage["user"]);
	//941212
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
		userID:"941212",
		goodsID:goodsID,
		number:1
	},function(data){
		if(data){
			getcar({userID:"941212",callback:function(data){
				$(".carpop").html(data.length);
			}});
		}else{
			console.log(data);
		}
	})
	
}
$("#showcar").on("click",function(){
	window.location="html/car.html";
})
$(document).on("touchend",function(){
	//console.log("touchend");
	if(myScroll.y>50){
		update();
	}
	if(myScroll.y<myScroll.maxScrollY-50){
		addload();
	}
})

function update(){
	console.log("正在下拉刷新");
}

function addload(){
	console.log("正在上拉加载");
	console.log($title[0].classID);
	getData($title[0].classID,$title[0].pageCode+1);
}

function getNavData(fn){
	$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
		if(data){
			fn(data);
		}
	})
}

function addNavScroll(){
	navScroll=new IScroll(".mainPage-nav",{
		 scrollX: true, 
		 scrollY: false,
		 click:true
	})
}

