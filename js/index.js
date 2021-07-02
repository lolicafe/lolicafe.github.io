var timer, MVPtimer;
var timeInterval;//倒计时间隔
var normalToggle, MVPToggle;
var normalSEOrder, MVPSEOrder;//默认音效的选择
var normalSE, MVPSE;
var lastMVP, msMVP;
var MVPon;
function formatZero(num, len) {
    if (String(num).length > len) return num;
    return (Array(len).join(0) + num).slice(-len);
}
function normalSEPlay() {
    if (normalToggle == 0)
        $(".normalSEPlay")[0].play();
    else
        normalSE.play();
}

function MVPSEPlay() {
    if (MVPToggle == 0)
        $(".MVPSEPlay")[0].play();
    if (MVPToggle == 1) {
        if (parseInt(lastMVP % 10) == 0) {
            $(".MVPVoicePlay").attr("src", "./se/mvp0.mp3")
        } else {
            $(".MVPVoicePlay").attr("src", "./se/mvp" + msMVP + ".mp3")
        }
        $(".MVPVoicePlay")[0].play();
    }
    if (MVPToggle == 2)
        MVPSE.play();
}
function setMsChannel() {
    if (msMVP == 0)
        $(".channel").text("暂无MsMVP信息。")
    else
        $(".channel").text("Ms频道："+ msMVP+"线")
}
function save() {
    if (typeof (Storage) !== "undefined") {
        localStorage.hr = $(".timeTot").children(".hr").text();
        localStorage.min = $(".timeTot").children(".min").text();
        localStorage.s = $(".timeTot").children(".s").text();
        localStorage.timeInterval = timeInterval;
        if (normalToggle == 0) {
            localStorage.normalSEOrder = normalSEOrder;
        }
        if (MVPToggle == 0) {
            localStorage.MVPSEOrder = MVPSEOrder;
        }
        if (MVPToggle != 2) {
            localStorage.MVPToggle = MVPToggle;
        }
    }
}

function init() {
    normalToggle = 0;
    MVPToggle = 1;
    MVPon = true;
    msMVP = 0;
    if (typeof (Storage) !== "undefined") {
        $(".timeTot").children(".hr").text(formatZero(localStorage.hr, 3));
        $(".timeTot").children(".min").text(formatZero(localStorage.min, 2));
        $(".timeTot").children(".s").text(formatZero(localStorage.s, 2));
        timeInterval = localStorage.timeInterval || 120;
        normalSEOrder = localStorage.normalSEOrder || 0;
        MVPSEOrder = localStorage.MVPSEOrder || 0;
        MVPToggle = localStorage.MVPToggle || 1;
    }//读取历史记录
    timeInterval = timeInterval || 120;

    $(".timeInterval").change(function () {
        timeInterval = $(".timeInterval").val() || 120;
        if (!$(".begin").hasClass("on")) {
            $(".countDown").text(timeInterval);
        }
    })
    $(".countDown").text(timeInterval);
    $.getJSON('https://www.virtualfans.club/mvp.php?callback=?', function (jsondata) {
        lastMVP = jsondata.mvp;
        msMVP = jsondata.ms;
        setMsChannel();
    })
    MVPtimer = setInterval(function () {
        $.getJSON('https://www.virtualfans.club/mvp.php?callback=?', function (jsondata) {
            var tmp = jsondata.mvp;
            msMVP = jsondata.ms
            setMsChannel();
            if (tmp != lastMVP) {
                lastMVP = tmp;
                MVPSEPlay()
            }
        })
    }, 3000);

    $(".normalMusic .btn").eq(normalSEOrder).addClass("active");
    $(".normalSEPlay").attr("src", "./se/" + normalSEOrder + ".ogg")
    if (MVPToggle == 1)
        $(".MVPMusic .btn").eq(4).addClass("active");
    else {
        $(".MVPMusic .btn").eq(MVPSEOrder).addClass("active");
        $(".MVPSEPlay").attr("src", "./se/" + MVPSEOrder + ".ogg")
    }

}



function SEupload1() {
    var files = $("#1")[0].files;

    for (file of files) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            normalSE = new Audio(this.result);
            console.log(this.result);
            console.log(normalSE);
            //normalSE.src="data:audio/x-mpeg;base64,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//MoxCsNIULgAFFKcP/8lX/0U//sGJr6iYC5zXwXm/FbfCMlr6CNZF9FhuVjrfnWeSsHRUM8bCpUaXDe56PbvuCbaF1////6//MoxDEMyPLcADnQcCz0VfzMNbp8qI340bW4ODpxtgXkrscaC0ut6qdqudt315uatx10HXke/T/1rxc0////vTofQtX8XhIZ//MoxDgM0U7cAGnOcJmmhNG/zho3QKIFsbrU8KEOkiHFzpYv80z1Wn2/NSdzCc94z///9////6lfPOfTRA2kmikv2YRnqPF///MoxD8LsUrcAFKUcCyP3v/9l0hW6s8RQASyV1dk91p/9elihoClX////yyV1///7+j9QroRAldMZpDJ6WwW8kkHXwoIAFux//MoxEsNQS7UymvOcEKAggZwiCoaAi8VvYsaS3FFq//////Z///SKUIV/mhOAGw2UuYZ4xKyOHbbne8/Cahll9/DW2jRYIgf//MoxFEMkJLEAIPETOhUD776ORmVGsOCzwm3/////+hWW//cPlzYgWcIKtqa2pJbttYAzuajucAsU9l/02nj//8+5ATGe7ri//MoxFkOyQbAAIYKcJpfEnMZw1jGt0YE5Lv7vrMdjJOWUbCdzB8CYaFroGSR6jQaK1rVPdn7zDD39r/6f6v+ZQxao088bmhg//MoxFgYSjsSXjvOmpzgoMv//rkqi1X/J0BtFtvMxyxcVn/4zIchABjP9UvQ9xbwfJtMqzd/ZWHIhTDMxa0/T6Hp05ldDZ7w//MoxDEUSlrMAIvEuDtj51NnXy51Nm7f/////////Syql1Bi5cI/7ldIs9SFKv1j4D2Ql/tARUqv3vHsUgJjrrXNCDNsW0sK//MoxBoQgP7MAGrecN4ViGGghqHNrLJRyVjxzZbVxKwKxlfNqt0BaKf/////50Glv//6huvaBPlO+QqIZZirdMCJ86jPcItn//MoxBMNWPrYwlpMcNi11CYtJTokBwBs6clpmdz4pRFCVuug2f//////////3pM10blIwDw+GyRlgFJgCoV4ClwxqpcrGFjx//MoxBgNEQLRlDDGcIMcAulSYCE8b/b4aulBM0t//////5KHC3//nodVIPoOgDwT2SFglPscAgYhTCpSDDr1dS1UUFEUEPHo//MoxB4M6PaplDjGcBHD9vqwVgIkrNt//////4aq///yoKoW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"
        }
    }
}

function SEupload2() {
    var files = $("#2")[0].files;
    console.log(files);
    for (file of files) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            MVPSE = new Audio(this.result);
        }
    }
}

$(function () {
    init();//初始化
    $(".musicToggle .btn").click(function () {
        $(this).addClass("active").siblings().removeClass("active");;
        var parent = $(this).parent().parent();
        if (parent.hasClass("normalMusic")) {
            if ($(this).hasClass("default")) {
                $(".normalSEPlay").attr("src", "./se/" + $(this).index() + ".ogg")
                normalSEOrder = $(this).index();
                $(".normalSEPlay")[0].play()
            }
            else
                normalSE.play();

        }
        else {
            if ($(this).hasClass("default")) {
                $(".MVPSEPlay").attr("src", "./se/" + $(this).index() + ".ogg")
                MVPSEOrder = $(this).index();
                $(".MVPSEPlay")[0].play();
            } else {
                if ($(this).hasClass("voice")) {
                    $(".MVPVoicePlay")[0].play();
                } else {
                    MVPSE.play();
                }
            }
        }

    })//设置栏中切换默认和自定义音效事件

    $(".save .btn").click(function () {
        var f = $(this).parent().parent();
        f.css("display", "none").siblings().css("display", "flex");

        if ($(".normalMusic .default").hasClass("active")) {
            normalToggle = 0;
        } else {
            normalToggle = 1;
        }

        if ($(".MVPMusic .default").hasClass("active")) {
            MVPToggle = 0;
        } else {
            if ($(".MVPMusic .voice").hasClass("active"))
                MVPToggle = 1;
            else
                MVPToggle = 2;
        }
        save();
    })//设置保存

    $(".begin").click(function () {
        if ($(this).hasClass("on")) {
            clearInterval(timer);
            $(".countDown").text(timeInterval);
            $(".thisTime").children().text("00");
            $(this).text("开始计时")
            $(".offPlay")[0].play();
            save();
        } //结束计时时的操作。
        else {
            $(".onPlay")[0].play();
            timer = setInterval(function () {
                var t = $(".countDown").text();
                t--;
                if (t == 0) {
                    t = timeInterval;
                    normalSEPlay();
                }
                $(".countDown").text(t);
                $.each($(".time"), function (index, val) {
                    var hr = $(val).children(".hr").text();
                    var min = $(val).children(".min").text();
                    var s = $(val).children(".s").text();
                    s++;
                    if (s == 60) {
                        s = 0;
                        min++;
                        save();
                        if (min == 60) {
                            min = 0;
                            hr++;
                        }
                    }
                    if (t)
                        if ($(val).parent().hasClass("btime")) {
                            $(val).children(".hr").text(formatZero(hr, 2));
                        } else {
                            $(val).children(".hr").text(formatZero(hr, 3));
                        }
                    $(val).children(".min").text(formatZero(min, 2));
                    $(val).children(".s").text(formatZero(s, 2));
                })
            }, 1000)
            $(this).text("结束计时")
        }//开始计时时的操作。
        $(this).toggleClass("on");
    })//处理开始/结束计时的事件

    $(".settingbtn").click(function () {
        var f = $(this).parent();
        console.log(f);
        f.css("display", "none").siblings().css("display", "flex");

    })//设置

    $(".mvpToggle").click(function () {
        if (MVPon) {
            $(this).text(" 已关闭");
            MVPon = false;
            clearInterval(MVPtimer);
        } else {
            $(this).text(" 已开启");
            MVPon = true;
            MVPtimer = setInterval(function () {
                $.getJSON('https://www.virtualfans.club/mvp.php?callback=?', function (jsondata) {
                    var tmp = jsondata.mvp;
                    msMVP = jsondata.ms
                    setMsChannel();
                    if (tmp != lastMVP) {
                        lastMVP = tmp;
                        MVPSEPlay()
                    }
                })
            }, 3000);
        }
    })

    $(".countDown").change(function () {
        save();
    })//提醒间隔改变事件
    $(".option").click(function () {
        if ($(this).index() == 0) return;
        if ($(this).index() == 1) {
            alert("还在做，没啥人用先鸽会儿=-=")
            //save();
            //window.location.href = "core.html";
        }
        if ($(this).index() == 2) {
            alert("更多功能开发中，如果您有好主意的话，欢迎加右下角的群联系作者！")
        }
    })

    $(".return").click(function(){
        $(".support").css("display","none");
    })
    $(".supbtn").click(function(){
        console.log(1);
        $(".support").css("display","flex");
    })
})