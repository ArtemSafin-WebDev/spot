import { Navigation, Swiper, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function componentContent() {
  const hostElem = document.querySelector('#content-host');
  const sliderElem = hostElem.querySelector('.js-swiper-container');
  const btnPrev = hostElem.querySelector('.js-btn-prev');
  const btnNext = hostElem.querySelector('.js-btn-next');
  const btnsContent = hostElem.querySelectorAll('.js-btn-content');
  const contentElems = hostElem.querySelectorAll('.js-content');

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

  btnsContent.forEach(btn => {
    btn.onmouseenter = () => {
      contentElems.forEach(elem => {
        if (elem.hasAttribute(`data-${ btn.value }`)) {
          elem.classList.add('mod-show');
        } else {
          elem.classList.remove('mod-show');
        }
      })
    }
  })
}
