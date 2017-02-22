$(function (){
	  $(".register").find(".btn").click(function(){
		window.location.href = "login.html";
	});
});

function register(){
	  	var 
	  	    name = $("#register_name").val(),
	  	    psw = $("#register_psw").val(),
	  	    repsw = $("#register_repsw").val();
	  	if(name == ""){
	  		alert("请输入用户名");
	  	}else {
	  		if(psw == ""){
	  			alert("请输入密码");
	  		}else{
	  			if(repsw != psw){
	  				alert("两次输入密码不一致，请重新输入");
	  			}else{
	  				//执行提交数据
	  				var user = getUser(name,psw);
	  				toRegister(user);
	  				$("#register_name").val("");
	  				$("#register_psw").val("");
	  				$("#register_repsw").val("");
	  				
	  			}
	  		}
	  	}
	  }


function getUser(name,psw){
	var user = {
		userID :name,
		password:psw
	}
	
	return user;
}

function toRegister(user){
	//测试
	//console.log(user.userID+","+user.password);
	//引入请求数据
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		async:true,
		data:{
			status:"register",
			userID:user.userID,
			password:user.password
		},
		success:function(deta){
			if(deta == 1){
				alert("注册成功");
			}
			
			if(deta == 0){
				alert("用户名重名");
			}
			
			if(deta ==2){
				alert("数据库错误");
			}
		}
	});
}
