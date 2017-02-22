var myScroll;
 $(function (){
	 load();
	 getData();
	 navScroll();
	 getIcondata();
   //去掉默认的touch事件,
   document.addEventListener("touchmove",function(e){
   	 e.preventDefault();
   },false);
    //触摸结束触发此事件
    $("#wrapper").on("touchend",function(){
    	 if(myScroll.y>0){
    	 	//console.log("上拉刷新");
    	 	//window.reload(true);
    	 	//实际上的刷新
         $("#scrollBox").html("");
    	 	getData(1,1)
    	 }
    	 if(myScroll.y<myScroll.maxScrollY-50){
    	 	//console.log("下拉刷新");
    	 	//在原来的基础上追加
         		var num = $("#num").val();
    	 		console.log(num);
    	 	  getData(num++,0);
    	 	  $("#num").val(num++);
    	 }
    });
});

function load(){
	myScroll = new IScroll("#wrapper",{
		 mouseWheel:true,
		 scrollbars:true,
		 //禁止控制滚动条滚动
		 interactivScrollbars:false
	});
}
function navScroll(){

	 navscroll = new IScroll("#main_nav",{
		scrollX:true,
		click:true//允许点击
		
	});
		
}
function getData(row,page){
	$.ajax({
		type:"get",//ajax下默认请求格式是get，即该句话可以省略
		dataType:"jsonp",//请求jsonp数据，jQuery自动把数据转换为json数据，供用户使用
		url:" http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		data:{
			classID:row
		},
		success:function(data){
			/*$.each(data,function(index){
			 var thisImg = $("<img  src='" +data[index].goodsListImg+ "'/>"),
			     imgBox = $(".imgbox");
			thisImg.on("load",function(){
					    	myScroll.refresh();
					    	imgBox.html("");
					    	imgBox.append(thisImg);
					    });
		});*/
			 var dom = $("#scrollBox");
			 render(dom,{"goods":data})
			/*if(data.length){
				
				//for(var i=0,len=data.length;i<len;i++)
				//each有性能损耗
				var $scrollBox = $("#scrollBox");
				$.each(data,function(index){
					//拼接字符串
		            var 
					     $probox = $("<div class='prodbox'>"),
					     imgBox = $("<div class='imgBox'>图片加载中.....</div>"),
					     thisImg = $("<img  src='" +data[index].goodsListImg+ "'/>"),
					     proname_dt = $("<dt><p>"+data[index].goodsName+"</p><p>限时打折</p></dt>"),
					     priceBox_dd_p1 = $("<p>单价：<span class='price'>￥<strong >"+data[index].price+"</strong></span></p>"),
					     priceBox_dd_p2 = $("<p class='bot'><span class='discount'>"+data[index].discount+"</span>折<a class='line_throug' href='javascript:;'>￥499</a></p>"),
					     prodname = $("<dl class='prodname'>"),
					     priceBox = $("<dd class='priceBox'>"),
					     shoppingCart = $("<div class='shoppingBox'><i class='fa fa-shopping-cart'></i></div>");
					     
					     priceBox.append(priceBox_dd_p1);
					     priceBox.append(priceBox_dd_p2);
					     prodname.append(proname_dt);
					     prodname.append(priceBox);
					     prodname.append(shoppingCart);
					     $probox.append(imgBox);
					     $probox.append(prodname);
					     //加载时需要刷新iscroll
					    thisImg.on("load",function(){
					    	myScroll.refresh();
					    	imgBox.html("");
					    	imgBox.append(thisImg);
					    });
					    $scrollBox.append($probox);
					
				});
			}*/
		}
	});
}

function render(dom,data){
   var html = template("goodsList",data);
   dom.html(html);
   myScroll.refresh();
}

function getIcondata(){
	var navWidth = 0;
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		success:function (data){
			var thisData = JSON.parse(data);
			var $main_nav = $("#main_nav");
			var $group = $("#iconfontGroup");
			$.each(thisData, function(index,element) {
				    navWidth += 50;
	          		var	$icons = $("<i class='iconfont iconbox'> "+ thisData[index].icon+" </i>");
	          		//$("#title").text(thisData[index].className);
	          		$group.append($icons);
	          		$icons.on("click",function (){
	          			$("#scrollBox").html("");
	          			$("#title").text(element.className);
	          			getData(thisData[index].classID);
	          		});
			});
			
			$group.width(navWidth);
			 navscroll.refresh();
		}
	});
}
