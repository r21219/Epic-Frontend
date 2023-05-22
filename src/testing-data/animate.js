export const animate = () => {
    let sdegree = 0;

    const MouseWheelHandler = (e) => {
        // cross-browser wheel delta
        const event = window.event || e; // old IE support
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        sdegree += 0.5 * delta;

        const o = animateText(sdegree);

        const accordion = document.querySelector('.accordion');
        if (accordion) {
            accordion.style.top = `${o.top}px`;
            accordion.style.transform = `rotateX(${o.rotateX}deg) translateZ(${o.translateZ}px)`;
        }

        return false;
    }

    const animateText = (step) => {
        // you can adjust these values to fine-tune the animation
        const limit = {'min': 0, 'max': 100};
        const top_l = {'min': 0, 'max': -6000};
        const rotateX_l = {'min': 20, 'max': 25};
        const translateZ_l = {'min': 0, 'max': -2500};

        const m_top = (top_l.max - top_l.min) / (limit.max - limit.min);
        const m_rotateX = (rotateX_l.max - rotateX_l.min) / (limit.max - limit.min);
        const m_translateZ = (translateZ_l.max - translateZ_l.min) / (limit.max - limit.min);

        const top = m_top * step + top_l.min;
        const rotateX = m_rotateX * step + rotateX_l.min;
        const translateZ = m_translateZ * step + translateZ_l.min;

        const output = {
            'top': top,
            'rotateX': rotateX,
            'translateZ': translateZ
        };

        return output;
    }

    return MouseWheelHandler;
}
