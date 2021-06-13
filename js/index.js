var timer, MVPtimer;
var timeInterval;//倒计时间隔
var normalToggle, MVPToggle;
var normalSE, MVPSE;
var lastMVP;
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
    else
        MVPSE.play();
}

function init() {
    normalToggle = 0;
    MVPToggle = 0;
    MVPon = true;
    timeInterval = $(".timeInterval").val() || 120;
    $(".timeInterval").change(function () {
        timeInterval = $(".timeInterval").val() || 120;
        if (!$(".begin").hasClass("on")) {
            $(".countDown").text(timeInterval);
        }
    })
    $(".countDown").text(timeInterval);
    $.getJSON('http://www.virtualfans.club/mvp.php?callback=?', function (jsondata) {
        lastMVP = jsondata.mvp;
    })
    MVPtimer = setInterval(function () {
        $.getJSON('http://www.virtualfans.club/mvp.php?callback=?', function (jsondata) {
            var tmp = jsondata.mvp;
            if (tmp != lastMVP) {
                MVPSEPlay()
                lastMVP = tmp;
            }
        })
    }, 3000);
}



function SEupload1() {
    var files = $("#1")[0].files;
    for (file of files) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            normalSE = new Audio(this.result);
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
            normalSEPlay();
        }
        else {
            if ($(this).hasClass("default")) {
                $(".MVPSEPlay")[0].play();
            } else {
                MVPSE.play();
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
            MVPToggle = 1;
        }
    })//设置保存


    $(".begin").click(function () {
        if ($(this).hasClass("on")) {
            clearInterval(timer);
            $(".countDown").text(timeInterval);
            $(".thisTime").children().text("00");
            $(this).text("开始计时")
        } //结束计时时的操作。
        else {
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


            }, 3000);
        }
    })
})