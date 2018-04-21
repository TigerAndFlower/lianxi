$(function () {

    course_btn();
    translation();
    record();
    noWord();
    fivestep_model()
    first_audio();
    micro_audio();
    follow_audio();
    zhongdu()
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
    // 点击查看答案，发送请求保存数据然后答案出现
    // 点击下一步  然后跳转至跟读训练
    function translation() {
        var addName = $("#translate .translation-step textarea")
        for (var i = 0; i < addName.length; i++) {
            addName.eq(i).attr("name", i);
        }

        $("#translation-btn").on("click", function () {
            $(this).parent().hide();
            $(".translation-next").show();
            $(".translation-answer").show();
            $(".textarea").addClass("noAllowed");
            $(".textarea").attr("disabled", "disabled");

            var val = $(".translation-step textarea");
            var arr = [];
            for (var i = 0; i < val.length; i++) {
                arr.push(val.eq(i).val());
            }

            // $.ajax({
            //     url: "",
            //     type: "post",
            //     dataType: "json",
            //     data: {}, 
            //     success: function (data) {
            //         if (data.status === 1) {
            //             location.reload();
            //         } else {
            //             return;
            //         }
            //     }
            // })
        })
        $("#translation-next").on("click", function () {
            $("#translate").hide();
            $("#follow").show();
            $(".stepbar li:nth-of-type(4)").addClass("completed");
        })

    }
    // 如果没有添加的内容时 noWord 显示 分别在开始时 添加生词时 删除时调用
    function noWord() {
        if ($("#wordlist .wordNoteList li").length == 1) {
            $(".noWord").show();
        } else {
            $(".noWord").hide();
        }
    }
    // 弹出框
    function wordlist_show(e) {
        $(".wrapper_wordlist").show();
        $(".js-zsgc").hide();
        $(e).show();
    }
    // 记录生词
    function record() {
        var that
        // 关闭弹窗
        $("body").on("click", ".m-act-del , .close-btn", function () {
            $(".wrapper_wordlist").hide();
        })
        // 添加弹窗
        $(".record-right .record-add-btn").on("click", function () {
            wordlist_show("#add_word")
            $(".titleBar-title").text("添加单词");

        })
        // 点击确认
        $(".add-affirm").on("click", function () {
            var wordVal = $(".add-word").val();
            var paraphraseVal = $(".add-paraphrase").val();
            var zuoye_buzhi_id = $("#record").attr("id");
            $.ajax({
                url: "http://lianxi.ieduchina.com/lianxi/jintin/ajaxShengci.html",
                type: "post",
                dataType: "json",
                data: {},
                success: function (data) {
                    if (data.status === 1) {
                        location.reload();
                    } else {
                        return;
                    }
                }
            })
            $(".wrapper_wordlist .add-word , .wrapper_wordlist .add-paraphrase").val("");
            $(".wrapper_wordlist").hide();
            noWord();
        })

        // 删除
        $("body").on("click", ".record-right .deleteItem", function () {
            wordlist_show("#delete_word")
            that = $(this);
            $(".titleBar-title").text("删除本句");
            $("#del-btn").on("click", function () {
                $(".wrapper_wordlist").hide();
                that.parents(".js-word-list").remove();
                noWord();
            })
        })
        // 修改
        // 获取到本次编辑的单词和释义内容 赋值给弹出框
        $("body").on("click", ".record-right .editItem", function () {
            that = $(this);
            wordlist_show("#edit_word")
            $(".titleBar-title").text("修改本句")
            // 旧值
            var oldWord = that.parents(".js-word-list").children(".listElement").eq(0).text();
            var oldParaphrase = that.parents(".js-word-list").children(".listElement").eq(1).text();
            $("#edit_word .edit-word").val(oldWord);
            $("#edit_word .edit-paraphrase").val(oldParaphrase);
        })
        //点击确认获取到新值 发送请求
        $("body").on("click", ".edit-affirm", function () {
            // 新值
            var newWord = $("#edit_word").find(".edit-word").val();
            var newParaphrase = $("#edit_word").find(".edit-paraphrase").val();
            $.ajax({
                url: "http://lianxi.ieduchina.com/lianxi/jintin/ajaxShengci.html",
                type: "post",
                dataType: "json",
                data: {},
                success: function (data) {
                    if (data.status === 1) {
                        location.reload();
                    } else {
                        return;
                    }
                }
            })
        })
    
        // 记录生词的下一步
        $("body").on("click","#word_next",function(){
            $("#record").hide();
            $("#translate").show();
            $(".stepbar li:nth-of-type(3)").addClass("completed");
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
        stop_audio()
    })
    // 预听原文 点击播放音频 图片变色
    function first_audio() {
        $("#js-pre-listen").on("click", function () {
            if (true) {
                var audio = document.querySelector(".first-audio");
                var begin = $(".js-pre-duration");
                var over = $('.js-pre-current-time');
                var line = $('.pre_timeline');
                var currentTime
                $(this).addClass("playing");
                audio.play();
                // 设置播放时间　　
                // js修改下面的时间 
                audio_style(audio, begin, over, line);
                audio.addEventListener('ended', function () {
                    $("#js-pre-listen").removeClass("playing");
                    $(".js-listening-btn").addClass("btn-ok");
                    $.ajax({
                        url: "",
                        type: "post",
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            if (data.status === 1) {
                                location.reload();
                            } else {
                                return;
                            }
                        }
                    })
                }, false);
            } else {
                return;
            }

        })
        $("#js-pre-btn").on("click", function () {
            if (true) {
                $(".pre-content").hide();
                $(".record-content").show();
                $(".stepbar li:nth-of-type(2)").addClass("completed");
            } else {
                return;
            }
        })　　　
    }
    // 精听原文
    function micro_audio() {
        $("#micro_btn").on("click", function () {
            if (true) {
                var audio = document.querySelector(".micro_audio");
                var over = $(".js-micro-duration");
                var begin = $('.js-micro-current-time');
                var line = $('.micro_timeline');
                var currentTime;

                $(this).addClass("playing");
                audio.play();
                // 设置播放时间　　
                // js修改下面的时间 
                audio_style(audio, begin, over, line);
                audio.addEventListener('ended', function () {
                    $("#micro_btn").removeClass("playing");
                    $("#micro-wancheng").addClass("isok").removeClass("disabled").addClass("btn-ok");
                    $(".btn-backplan").addClass("isok");
                    $(".micro-degree").text(1);

                }, false);
            } else {
                return;
            }

        })　

        $("#micro-wancheng").on("click", function () {
            if (a == 20) {
                $.ajax({
                    url: "",
                    type: "post",
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        if (data.status === 1) {
                            window.location.href = url;
                        } else {
                            return;
                        }
                    }
                })
                
            } else {
                return;
            }
        })

    }
    // 音频样式
    // 4个参数: 音频，开始，结束，进度条
    function audio_style(audio, begin, over, line) {
        begin.text(secondToMin(audio.duration));
        setInterval(function () {　　　　　　　　　　
            var currentTime = audio.currentTime;　　　　　　　　　　
            var t;
            t = Math.floor(currentTime);　　　　　　　　　　　　　　　　　　　　　　　　
            over.text(secondToMin(t));　
            line.children().css({　　　　　　　　　　　　
                width: (t / audio.duration).toFixed(4) * 100 + "%"　　　　　　　　　　
            })　　　　　　　　　　　　　　　　　　
        }, 1000);
    }
    // 计算时间　　　　　　　　
    function secondToMin(s) {　　　　　　　　　　
        var MM = Math.floor(s / 60);　　　　　　　　　　
        var SS = s % 60;　　　　　　　　　　
        if (MM < 10) {
            MM = "0" + MM;　
        }　　　　　　　　　　　　　　　　　　　　　
        if (SS < 10) {
            SS = "0" + SS;　　
        }　　　　　　　　　　　　　　　　　　　　
        var min = MM + ":" + SS;　　　　　　　　　　
        return min.split('.')[0];　　　　　　　　　　
    }　　
    
    // 跟读训练第三部分
    function follow_audio() {
        
        // 初级
        $("body").on("click", ".grade-box .grade-step i", function () {
            for (var index = 0; index < document.querySelectorAll("audio").length; index++) {
                document.querySelectorAll("audio")[index].pause();
            }
            $(this).children("audio")[0].play();
        })
        $("#grade-btn").on("click", function () {
            $(".grade-box").hide();
            $(".grade-middle-box").show();
            $(".grade-list li").removeClass("grade-select");
            $(".grade-list li").eq(1).addClass("grade-select");
        })
        // 中级
        $("#grade_middle_btn").on("click", function () {
            var audio = document.querySelector(".grade_middle_audio");
            var over = $(".js-middle-duration");
            var begin = $('.js-middle-current-time');
            var line = $('.grade_middle_timeline');
            var currentTime;
            $(this).addClass("playing");
            audio.play();
            // 设置播放时间　　
            // js修改下面的时间 
            audio_style(audio, begin, over, line);
            audio.addEventListener('ended', function () {
                $("#grade_middle_btn").removeClass("playing");
                // $.ajax({
                //     url: "",
                //     type: "post",
                //     dataType: "json",
                //     data: {},
                //     success: function (data) {
                //         if (data.status === 1) {
                //             location.reload();
                //         } else {
                //             return;
                //         }
                //     }
                // })
            }, false);

        })　
        $(".grade_middle_next").on("click", function () {
            var audio = document.querySelector(".grade_middle_audio");
            var over = $(".js-middle-duration");
            var begin = $('.js-middle-current-time');
            var line = $('.grade_middle_timeline');
            var playing = $("#grade_middle_btn");
            $(".grade-middle-box").hide();
            stop_audio();
            $(".grade-high-box").show();
            $(".grade-list li").removeClass("grade-select");
            $(".grade-list li").eq(2).addClass("grade-select");
            $(".stepbar li:nth-of-type(5)").addClass("completed");
        })
        // 高级
        $("#grade_high_btn").on("click", function () {
            var audio = document.querySelector(".grade_high_audio");
            var over = $(".js-high-duration");
            var begin = $('.js-high-current-time');
            var line = $('.grade_high_timeline');
            var currentTime;
            $(this).addClass("playing");
            audio.play();
            // 设置播放时间　　
            // js修改下面的时间 
            audio_style(audio, begin, over, line);
            audio.addEventListener('ended', function () {
                $("#grade_high_btn").removeClass("playing");
                // $.ajax({
                //     url: "",
                //     type: "post",
                //     dataType: "json",
                //     data: {},
                //     success: function (data) {
                //         if (data.status === 1) {
                //             location.reload();
                //         } else {
                //             return;
                //         }
                //     }
                // })
            }, false);
        })　
        $("#grade_high_next").on("click", function () {
            var audio = document.querySelector(".grade_high_audio");
            var over = $(".js-high-duration");
            var begin = $('.js-high-current-time');
            var line = $('.high');
            var playing = $("#grade_high_btn");
            $("#follow").hide();
            stop_audio();
            $("#micro_listen").show();
        })

    }
    // 初中高切换
    $(".grade-list li").on("click", function () {
        $(".grade-list li").removeClass("grade-select");
        $(this).addClass("grade-select");
        stop_audio();
        $(".grade-box-step").hide();
        $(".grade-box-step").eq($(this).index()).show();
    })
    
    
    // 停止播放
    function stop_audio() {
        var over = $(".jp-duration-new");
        var begin = $('.jp-current-time-new');
        var line = $('.timeline span');
        var playing = $(".playinghorn");
        playing.removeClass("playing");
        over.html("00:00");
        begin.html("00:00");
        line.css("width", "0")
        for (var index = 0; index < document.querySelectorAll("audio").length; index++) {
            document.querySelectorAll("audio")[index].pause();
            document.querySelectorAll("audio")[index].currentTime = 0;
        }
    }
    // 跟读训练说明弹出框交互
    function fivestep_model() {
        $("#specification").on("click", function () {
            $("#fivestep-model").show();
        })
        $(".modal-backdrop").on("click", function () {
            $("#fivestep-model").hide();
        })
        $("#fivestep-model .title-nav li").on("click", function () {
            $("#fivestep-model .title-nav li").removeClass("on");
            $(this).addClass("on");
            $("#fivestep-model .details .item").hide();
            $("#fivestep-model .details .item").eq($(this).index()).show();
        })
    }
    //跟读训练第二部分
    function zhongdu() {
        $("body").on("click",".js-zhongdutimu span",function(){
           if($(this).hasClass("tag_str")){
                $(this).removeClass("tag_str");
           }else{
                $(this).addClass("tag_str");
           }
        })
        $("body").on("click","#zhongdu_chakan",function(){
            var arr = [];
            var key,
                val,
                b
            for (var i = 0; i < $(".js-zhongdutimu").length; i++) {
                key = $(".js-zhongdutimu").eq(i).attr("data-num");
                val = $(".js-zhongdutimu").eq(i).html();
                arr.push(key+':'+val)
                b = arr.join("[aaa]");
            }
            b = b.replace(/\s+/g,"");         
            $.ajax({
                url: "",
                type: "post",
                dataType: "json",
                data: {b},
                success: function (data) {
                    if (data.status === 1) {
                        $(".js-zhongdudaan").show();
                        $(this).parent().hide();
                        $("#zhongdu-next").parent().show();
                    } else {
                        return;
                    }
                }
            })

        })
        $("body").on("click","#zhongdu-next",function(){
            $(".training-stress").hide();
            $(".grade-content").show();
        })

    }
    // 跟读训练第一部分
    var that	
    	
    $(".training-tag .training-step i").on("click",function(e){
        e.stopPropagation();
        var wid = $("#popover").outerWidth();
        var hei = $("#popover").outerWidth();
        var lef = $(this).parent().position().left-100;
        var top = $(this).parents(".training-step").position().top-140;
        that = $(this);
        $("#popover").show().css("left",lef).css("top",top);
       
        $("#popover li").on("click",function(){
            var newClass = $(this).attr("name");
            that.removeClass();
            that.addClass(newClass);
            $("#popover").hide();
        })
       
    })
    $("body").on("click",function(){
        $("#popover").hide();
    })

    $("body").on("click","#liandu-btn",function(){
        var arr = [];
        var key,
            val,
            b
        for (var i = 0; i < $(".liancu_list").length; i++) {
            key = $(".liancu_list").eq(i).attr("data-id");
            val = $(".liancu_list").eq(i).html();
            arr.push(key+':'+val)
            b = arr.join("[AAA]");
        }
        b = b.replace(/\s+/g,"");   
        $.ajax({
            url: "",
            type: "post",
            dataType: "json",
            data: {b},
            success: function (data) {
                if (data.status === 1) {
                    $(".liandu_daan").show();
                    $(this).parent().hide();
                    $("#liandu_next").parent().show();
                } else {
                    return;
                }
            }
        })

    })
    $("body").on("click","#liandu_next",function(){
        $(".training-tag").hide();
        $(".training-stress").show();
    })	
});