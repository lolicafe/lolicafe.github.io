function save(){

}

function init(){

}

$(function () {
    init();//初始化
    $(".option").click(function () {
        if ($(this).index() == 1) return;
        if ($(this).index() == 0) {
            save();
            window.location.href = "index.html";
        }
        if ($(this).index() == 2){
            alert("更多功能开发中，如果您有好主意的话，欢迎加右下角的群联系作者！")
        }
    })
})