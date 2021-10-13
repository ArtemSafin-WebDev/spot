import { Navigation, Swiper, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function componentContent() {
  const hostElem = document.querySelector('#content-host');
  const sliderElem = hostElem.querySelector('.js-swiper-container');
  const btnPrev = hostElem.querySelector('.js-btn-prev');
  const btnNext = hostElem.querySelector('.js-btn-next');

  if (!hostElem) return;

  new Swiper(sliderElem, {
    slidesPerView: 1,
    lazy: true,
    keyboard: true,
    speed: 400,
    navigation: {
      prevEl: btnPrev,
      nextEl: btnNext
    }
  })
}
