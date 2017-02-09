/**
 * Created by 93203 on 2016/10/13.
 */
window.onload = function () {
    var smallPic = document.querySelector('.smallPic');
    var preview = document.querySelector('.smallPic .preview');
    var bigPicArea = document.querySelector('.bigPicArea');

    //鼠标移入可视区时，显示预览窗和大图都显示
    smallPic.onmouseover = function () {
        preview.style.display = 'block';
        bigPicArea.style.display = 'block';
    };
    //鼠标移出可视区时，显示预览窗和大图都隐藏
    smallPic.onmouseout = function () {
        preview.style.display = 'none';
        bigPicArea.style.display = 'none';
    };

    //预览窗中心点跟随鼠标移动
    smallPic.onmousemove = function (ev) {
        ev = ev || window.event;
        var mouseTop = ev.clientY;
        var mouseLeft = ev.clientX;

        var toBottom = (mouseTop - preview.clientHeight / 2) - smallPic.offsetTop;
        var toLeft = (mouseLeft - preview.clientWidth / 2) - smallPic.offsetLeft;

        //预览窗不应该越过小图可视区域
        if (toLeft < 0) {
            toLeft = 0;
        } else if (toLeft > (smallPic.clientWidth - preview.clientWidth)) {
            toLeft = (smallPic.clientWidth - preview.clientWidth) + 'px';
        }

        if (toBottom < 0) {
            toBottom = 0;
        } else if (toBottom > (smallPic.clientHeight - preview.clientHeight)) {
            toBottom = (smallPic.clientHeight - preview.clientHeight) + 'px';
        }

        preview.style.left = toLeft + 'px';
        preview.style.top = toBottom + 'px';

        //调用放大镜预览窗移动函数,并传递放大镜的X/Y轴的移动距离
        movePreview(toBottom,toLeft);
    };

    //放大镜移动效果,t获取小方块上方距离，l左方距离
    function movePreview(t, l){
        //获取大图片元素
        var bigImg = document.querySelector('.bigPicArea img');
        /*
        * 这里的计算方式：设大图Y轴移动距离为ry,X轴移动距离rx,按照比例,列出方程
        * ry / 大图Y轴移动总距离 = 放大镜Y轴移动的距离 / 放大镜Y轴移动的总距离 ==》ry = 大图Y轴移动总距离 * 放大镜Y轴移动的距离 / 放大镜Y轴移动的总距离
        * rx / 大图X轴移动总距离 = 放大镜X轴移动的距离 / 放大镜X轴移动的总距离 ==》rx = 小图Y轴移动总距离 * 放大镜X轴移动的距离 / 放大镜X轴移动的总距离
        * */

        bigImg.style.top = -(bigImg.clientHeight-bigPicArea.clientHeight) * t / (smallPic.clientHeight - preview.clientHeight) + 'px';
        bigImg.style.left = -(bigImg.clientWidth-bigPicArea.clientWidth) * l / (smallPic.clientWidth - preview.clientWidth) + 'px';
    }
};