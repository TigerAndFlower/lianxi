$(function () {

    course_btn();
    first_audio();
    // 免费课程 切换
    function course_btn() {

        $("#course-wrap").on("mouseover", function () {

            $(".course-nav").show();

        })
        $("#course-wrap").on("mouseout", function () {

            $(".course-nav").hide();

        })
        $(".course-nav").on("click", function () {
            $(".course-nav").hide();

        })
    }　
    // 五步精听右侧切换
    $(".right-box li").on("click",function(){
        var ind = $(this).index();
        $(".caption .left-box").hide();
        $(".caption .left-box").eq(ind).show();
        $(".JsContent").hide();
        $(".JsContent").eq(ind).show();
        $(".right-box li").removeClass("current");
        $(this).addClass("current");
    })
    // 预听原文 点击播放音频 图片变色
    function first_audio(){
        var flag = true;
        $("#js-first-audio .playinghorn").on("click",function(){
            if(flag){
                var audio = document.querySelector(".first-audio")
                console.log(audio.duration)
                audio.play();
                flag = false;
            }else{
                console.log(111)
            }
           
        })
    }
});