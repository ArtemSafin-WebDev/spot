import Plyr from 'plyr';
import { primaryInput } from 'detect-it';
import axios from 'axios';
import getVideoId from 'get-video-id';

export default function commonVideo(hostElem) {
    const videosElems = hostElem.querySelectorAll('.gl-catalog__card-video');

    videosElems.forEach(elem => {
        const parent = elem.parentElement.parentElement;
        const wrapper = elem.parentElement;
        const provider = elem.getAttribute('data-plyr-provider');
        const previewImage = document.createElement('img');
        previewImage.className = 'gl-catalog__card-video-preview lazyload';
        previewImage.setAttribute('data-sizes', 'auto');
        let videoId = elem.getAttribute('data-plyr-embed-id');
        const loader = parent.querySelector('.gl-catalog__card-video-loader');
        const VIMEO_ACCESS_TOKEN = '789cd673e927f06aa64ab27f4c06ce19';

        // console.log('Video ID', videoId);

        if (videoId.includes('vimeo') || videoId.includes('youtu')) {
            videoId = getVideoId(videoId).id;
        }

        if (provider === 'vimeo') {
            axios
                .get(`https://api.vimeo.com/videos/${videoId}?fields=pictures`, {
                    headers: {
                        Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
                        Accept: 'application/vnd.vimeo.*+json;version=3.4'
                    }
                })
                .then(res => {
                    // console.log('Video info', res.data);

                    const sizes = res.data.pictures.sizes;

                    if (sizes.length) {
                        const maximumSize = sizes[sizes.length - 1];

                        console.log('Maximum size', maximumSize);

                        previewImage.dataset.src = maximumSize.link;
                        const srcSet = sizes.map(size => `${size.link} ${size.width}w`).join(',');

                        previewImage.dataset.srcset = srcSet;

                        // console.log(srcSet)

                        parent.insertBefore(previewImage, loader);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else if (provider === 'youtube') {
            previewImage.dataset.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            parent.insertBefore(previewImage, loader);
        }

        if (primaryInput === 'touch') return;

        let plyr = null;

        let ready = false;

        let hovered = false;

        parent.onmouseenter = () => {
            // console.log('Mouseentered');

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

                // console.log('Play promise', playPromise);
                if (playPromise) {
                    playPromise
                        .then(() => {
                            wrapper.classList.add('active');
                            loader.classList.remove('active');
                            previewImage.classList.add('hidden');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    setTimeout(() => {
                        if (hovered) {
                            wrapper.classList.add('active');
                            loader.classList.remove('active');
                            previewImage.classList.add('hidden');
                        }
                    }, 1500);
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
                    wrapper.classList.remove('active');
                    loader.classList.remove('active');
                    previewImage.classList.remove('hidden');
                }
                wrapper.removeEventListener('transitionend', onTransitionEnd);
            };

            wrapper.addEventListener('transitionend', onTransitionEnd);
            wrapper.classList.remove('active');
            loader.classList.remove('active');
            previewImage.classList.remove('hidden');
        };
    });
}
