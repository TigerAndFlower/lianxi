$(function(){
    var tab_id = $("#tabList").attr("data-id");
    if(tab_id >= 9){
        $(".right-box li:lt(5)").addClass("completed");
        $("#micro_listen").show();
    }else if(tab_id >= 8){
         $(".right-box li:lt(4)").addClass("completed");
        $("#follow").show();
        $(".grade-content").show();
        $(".grade-high-box").show();
        $(".grade-list li").removeClass("grade-select");
        $(".grade-list li").eq(2).addClass("grade-select");
    }else if(tab_id >= 7){
         $(".right-box li:lt(4)").addClass("completed");
        $("#follow").show();
        $(".grade-content").show();
        $(".grade-middle-box").show();
        $(".grade-list li").removeClass("grade-select");
        $(".grade-list li").eq(1).addClass("grade-select");
    }else if(tab_id >= 6){
         $(".right-box li:lt(4)").addClass("completed");
        $("#follow").show();
        $(".grade-content").show();
        $(".grade-box").show();
        
    }else if(tab_id >= 5){
         $(".right-box li:lt(4)").addClass("completed");
        $("#follow").show();
        $(".training-stress").show();
        
    }else if(tab_id >= 4){
         $(".right-box li:lt(4)").addClass("completed");       
        $("#follow").show();       
        $(".training-tag").show();
       
    }else if(tab_id >= 3){
        $(".right-box li:lt(3)").addClass("completed");
        $("#translate").show();
       
    }else  if(tab_id >= 2){
         $(".right-box li:lt(2)").addClass("completed");
        $("#record").show();
       
    }else if(tab_id >= 1){
         $(".right-box li:lt(1)").addClass("completed");
        $("#pre_listen").show();
        
    }
    // 根据显示的是哪个页面给tab添加字体加粗的class
    for(var i = 0; i<5; i++){
        if($(".JsContent").eq(i).css("display") == "block"){
            $(".right-box li").eq(i).addClass("current");
        }
    }
    
})
