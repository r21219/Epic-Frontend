

var sdegree = 0;

var doc = document;
if (doc.addEventListener) {
    // IE9, Chrome, Safari, Opera
    doc.addEventListener("mousewheel", MouseWheelHandler, false);
    // Firefox
    doc.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else doc.attachEvent("onmousewheel", MouseWheelHandler);

function MouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    sdegree += 0.5 * delta;

    var o = animateText(sdegree);

    $('.crawl').css({
        'top': o.top + 'px',
        'transform': 'rotateX(' + o.rotateX + 'deg) translateZ(' + o.translateZ + 'px)'
    });

    return false;
}

function animateText(step){

    var limit = {'min': 0, 'max': 100};

    var top_l = {'min': 0, 'max': -6000};
    var rotateX_l = {'min': 20, 'max': 25};
    var translateZ_l = {'min': 0, 'max': -2500};

    //

    var m_top = (top_l.max - top_l.min) / (limit.max - limit.min);
    var m_rotateX = (rotateX_l.max - rotateX_l.min) / (limit.max - limit.min);
    var m_translateZ = (translateZ_l.max - translateZ_l.min) / (limit.max - limit.min);

    var top = m_top * step + top_l.min;
    var rotateX = m_rotateX * step + rotateX_l.min;
    var translateZ = m_translateZ * step + translateZ_l.min;

    var output = {
        'top': top,
        'rotateX': rotateX,
        'translateZ': translateZ
    };

    return output;

}

// Path: src\testing-data\animate.js

export default animateText;