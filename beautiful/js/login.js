$(function(){
	var data = localStorage.getItem("user");//获取出字符串
	if(data && data !=""){
		$("#login_name").val(JSON.parse(data).userID);//把字符串转换为JSON对象
		$("#login_password").val(JSON.parse(data).password);
	}
	
	$(".login").find(".btn").click(function(){
		window.location.href = "register.html";
	});
});

function login(){
	var 
	    name = $("#login_name").val(),
	    psw = $("#login_password").val();
	
	if(name == ""){
		alert("请输入用户名");
	}else{
		if(psw == ""){
			alert("请输入密码");
		}else{
			var user = getUser(name,psw);
			toLogin(user);
			$("#login_name").val("");
	        $("#login_password").val("");
		}
	}
}

function getUser(name,psw){
	var user = {
		userID:name,
		password:psw
	}
	return user;
}

function toLogin(user){
	var  checked = $("#checks").attr("checked");
	if(checked){
		var str = '{"userID":"'+ user.userID +'","password":"'+user.password+'"}';
		localStorage.setItem("user",str);
	}
	$.get(
		"http://datainfo.duapp.com/shopdata/userinfo.php",
	    {
		status:"login",
		userID:user.userID,
		password:user.password
		},
	    function(data){
	    	console.log(data);
	    	if(data.charAt(0) == '{' ){
	    		alert("登陆成功");
	    	}
	    	if(data == 0){
	    		alert("用户名不存在");
	    	}
	    	if(data == 2){
	    		alert("用户名密码不符");
	    	}
	    })
}
