var amount,price;
$(function(){
   var data = localStorage.getItem("user");
   if(data){
       if(JSON.parse(data).userID ){
         $(".cart").show();
         $(".empty").hide();

         $.get("data/data.json",{},function(res){
                   var dom = $("#cart");
                   render(dom,res);
             });
        //加载template模板
         function render(dom,res){
               var html = template("cart_temp",res);
               dom.html(html);
          }
         var data = new Date();
         var time = data.setDate(data.getDate() + 3);//往后延三天
         add();
         reduce(); 
         total();
      }
   }else{
      $(".empty").show();
      $(".cart").hide();
   }    
});

   
 
   function  add(){    
       $("#cart").on("click",'.add',function(){

            amount = $(".number").text();
            console.log( amount);
            //console.log( $(this));
            amount ++; 
          $(this).siblings(".number").text(amount);
       });
   }

   function reduce(){
     $("#cart").on("click",'.reduce',function(){
           amount = $(".number").text();
           amount --; 
           if(amount <=1){
             amount = 1;
           }
          $(this).siblings(".number").text(amount);
       });
   }


  // function delete(){}
   function total(){
       $("#cart").on("click",function(){
            amount = $(".number").text();
            price = $(".info_price").find("i").text();
          $(".num").text(amount);
          $(".total_price").text("￥" + amount * price);
      });
   }

 