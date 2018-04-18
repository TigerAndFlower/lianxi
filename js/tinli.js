$(function () {

    course_btn();
    translation();
    record();
    noWord();
    // first_audio();
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
    // 翻译原文
    // 点击查看答案，答案出现
    // 点击下一步 发送请求保存数据 然后跳转至跟读训练
    function translation() {
        $("#translation-btn").on("click", function () {
            $(this).parent().hide();
            $(".translation-next").show();
            $(".translation-answer").show();
            $(".textarea").addClass("noAllowed");
            $(".textarea").attr("disabled", "disabled");

        })
    }
     // 如果没有添加的内容时 noWord 显示 分别在开始时 添加生词时 删除时调用
     function noWord(){
        if($("#wordlist .wordNoteList li").length == 1){
            $(".noWord").show();
        }else{
            $(".noWord").hide();
        }
    }
    // 记录生词
    function record(){
        var that
        // 关闭弹窗
        $("body").on("click",".m-act-del , .close-btn",function(){
            $(".wrapper_wordlist").hide();
        })

        // 添加弹窗
        $(".record-right .record-add-btn").on("click",function(){
            $(".wrapper_wordlist").show();
            $(".js-zsgc").hide();
            $("#add_word").show();
            $(".titleBar-title").text("添加单词");

        })
        // 点击确认
        $(".add-affirm").on("click",function(){
            var wordVal = $(".add-word").val();
            var paraphraseVal = $(".add-paraphrase").val();
            var zuoye_buzhi_id = $("#record").attr("id");
            
            console.log(zuoye_buzhi_id)
            $.ajax({
                url: "http://lianxi.ieduchina.com/lianxi/jintin/ajaxShengci.html",
                type: "post",
                dataType: "json",
                data: {
                    
                }, 
                success: function (data) {
                    if (data.status === 1) {
                        location.reload();
                    } else {
                        $("#errorKeyword").text('"' + data.info + '"').show();
                        imgUpdate()
                    }
                }
            })
           
            $(".wrapper_wordlist .add-word , .wrapper_wordlist .add-paraphrase").val("");
            $(".wrapper_wordlist").hide();
            noWord();
        })

        // 删除
        $("body").on("click",".record-right .deleteItem",function(){
            $(".wrapper_wordlist").show();
            $(".js-zsgc").hide();
            $("#delete_word").show();
            that = $(this);
            $(".titleBar-title").text("删除本句");
            $("#del-btn").on("click",function(){
                $(".wrapper_wordlist").hide();
                that.parents(".js-word-list").remove();
                noWord();
            })
        })

        // 修改
        // 获取到本次编辑的单词和释义内容 赋值给弹出框
        // 编辑弹出框点击确认家那个框内值赋值给内容区
        $("body").on("click",".record-right .editItem",function(){
            that = $(this);
            $(".wrapper_wordlist").show();
            $(".js-zsgc").hide();
            $("#edit_word").show();
            $(".titleBar-title").text("修改本句")
            // var wordVal = $(".add-word").val();
            // var paraphraseVal = $(".add-paraphrase").val();
            // var new_li = $("#new_li").html();
            // $("#wordlist .wordNoteList").append('<li class="js-word-list">'+ new_li +'</li>')
            // $("#wordlist .wordNoteList .js-word-list:last .listElement").eq(0).text(wordVal);
            // $("#wordlist .wordNoteList .js-word-list:last .listElement").eq(1).text(paraphraseVal);
            // $(".wrapper_wordlist .add-word , .wrapper_wordlist .add-paraphrase").val("");
            // $(".wrapper_wordlist").hide();
        })
    }
    // 五步精听右侧切换
    $(".right-box li").on("click", function () {
        var ind = $(this).index();
        $(".caption .left-box").hide();
        $(".caption .left-box").eq(ind).show();
        $(".JsContent").hide();
        $(".JsContent").eq(ind).show();
        $(".right-box li").removeClass("current");
        $(this).addClass("current");
    })
    // 预听原文 点击播放音频 图片变色
    // function first_audio(){
    //     var flag = true;
    //     $("#js-first-audio .playinghorn").on("click",function(){
    //         if(flag){
    //             var audio = document.querySelector(".first-audio")
    //             console.log(audio.duration)
    //             audio.play();
    //             flag = false;
    //         }else{
    //             console.log(111)
    //         }

    //     })
    // }
    
});