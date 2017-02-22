/*获取URL参数方法*/
function GetQueryString(name) {
  /*定义正则，用于获取相应参数*/
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  /*字符串截取，获取匹配参数值*/
  var r = window.location.search.substr(1).match(reg);
  /*返回参数值*/
  if (r != null){ 
  	return decodeURI(r[2]);
  }
  return null;
}

function GetUrlString(name){
	var r = window.location.search.substr(1);
	var preAll=[];
	preAll=r.split("&");
	for(var i=0;i<preAll.length;i++){
		pra=preAll[i].split("=");
		if(pra[0]==name){
			return pra[1];
		}
	}
	return null;
}

function getGoods_ajax(opt){
	var pre={
		classID:0,
		goodsID:0,
		pageCode:0,
		linenumber:10,
		callBack:null
	}
	$.extend(pre,opt);
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{
			classID:pre.classID,
			goodsID:pre.goodsID,
			pageCode:pre.pageCode,
			linenumber:pre.linenumber
		},
		dataType:"jsonp",
		success:function(data){
			if(typeof pre.callBack=="function"){
				pre.callBack(data);
			}
		}
	})
}
