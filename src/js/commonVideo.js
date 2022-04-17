import Plyr from 'plyr';
import { primaryInput } from 'detect-it';

export default function commonVideo(hostElem) {
    if (primaryInput === 'touch') return;
    const videosElems = hostElem.querySelectorAll('.gl-catalog__card-video');

    videosElems.forEach(elem => {
        const parent = elem.parentElement.parentElement;
        const wrapper = elem.parentElement;
        const loader = parent.querySelector('.gl-catalog__card-video-loader');

        let plyr = null;

        let ready = false;

        let hovered = false;

        parent.onmouseenter = () => {
            console.log('Mouseentered');

            hovered = true;
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
                    playPromise
                        .then(() => {
                            wrapper.classList.add('active');
                            loader.classList.remove('active');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            };
            plyr.on('ready', event => {
                if (plyr && hovered) {
                    play();
                }

                ready = true;

                if (!hovered && plyr) {
                    plyr.destroy();
                    plyr = null;
                    ready = false;
                }
            });

            if (ready) {
                play();
            }
        };

        parent.onmouseleave = () => {
            hovered = false;
            if (plyr) {
                plyr.stop();
            }

            const onTransitionEnd = () => {
                if (plyr && !hovered) {
                    plyr.destroy();
                    plyr = null;
                    ready = false;
                }
                wrapper.removeEventListener('transitionend', onTransitionEnd);
            };

            wrapper.addEventListener('transitionend', onTransitionEnd);
            wrapper.classList.remove('active');
            loader.classList.remove('active');
        };
    });
}
