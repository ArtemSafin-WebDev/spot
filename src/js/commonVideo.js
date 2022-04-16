import Plyr from 'plyr';

export default function commonVideo(hostElem) {
    const videosElems = hostElem.querySelectorAll('.gl-catalog__card-video');

    videosElems.forEach(elem => {
        const parent = elem.parentElement.parentElement;
        const wrapper = elem.parentElement;
        const loader = parent.querySelector('.gl-catalog__card-video-loader')

        let plyr = null;

        let ready = false;

        parent.onmouseenter = () => {
            console.log('Mouseentered');
            loader.classList.add('active');
            if (!plyr) {
                plyr = new Plyr(parent.querySelector('.gl-catalog__card-video'), {
                    controls: [],
                    loadSprite: false,
                    volume: 0
                });

                plyr.muted = true;
            }

            const play = () => {
                const playPromise = plyr.play();
                if (playPromise) {
                    playPromise.then(() => {
                        wrapper.classList.add('active');
                        loader.classList.remove('active');
                    });
                }
            };
            plyr.on('ready', event => {
                play();
                ready = true;
            });

            if (ready) {
                play();
            }
        };

        parent.onmouseleave = () => {
            if (!plyr) return;

            const onTransitionEnd = () => {
                plyr.destroy();
                plyr = null;
                wrapper.removeEventListener('transitionend', onTransitionEnd);
                
            };
            plyr.stop();
            wrapper.addEventListener('transitionend', onTransitionEnd);
            wrapper.classList.remove('active');
            loader.classList.remove('active');
        };
    });
}
