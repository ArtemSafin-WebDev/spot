import Swiper from '../../node_modules/swiper/swiper';

export default function someSlider() {
    new Swiper(container, {
        autoHeight: true,
        breakpoins: {
            641: {
                autoHeight: false
            }
        }
    });
}
