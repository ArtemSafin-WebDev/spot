import { Navigation, Swiper, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function componentContent() {
  const hostElem = document.querySelector('#content-host');
  if (!hostElem) return;

  const sliderElem = hostElem.querySelector('.js-swiper-container');
  const btnPrev = hostElem.querySelector('.js-btn-prev');
  const btnNext = hostElem.querySelector('.js-btn-next');
  const btnsContent = hostElem.querySelectorAll('.js-btn-content');

  const sliderTabletElem = hostElem.querySelector('.js-swiper-container-tablet');
  const btnPrevTablet = hostElem.querySelector('.js-btn-prev-tablet');
  const btnNextTablet = hostElem.querySelector('.js-btn-next-tablet');
  const contentElems = hostElem.querySelectorAll('.js-content');

  const swiperDesk = new Swiper(sliderElem, {
    slidesPerView: 1,
    lazy: true,
    keyboard: true,
    speed: 400,
    navigation: {
      prevEl: btnPrev,
      nextEl: btnNext
    }
  })

  const swiperMobile = new Swiper(sliderTabletElem, {
    slidesPerView: 1,
    lazy: true,
    keyboard: true,
    speed: 400,
    navigation: {
      prevEl: btnPrevTablet,
      nextEl: btnNextTablet
    }
  })

  btnsContent.forEach(btn => {
    btn.onclick = () => {
      contentElems.forEach(elem => {
        if (elem.hasAttribute(`data-${ btn.value }`)) {
          elem.classList.add('mod-show');
        } else {
          elem.classList.remove('mod-show');
        }
      })
    }
  })

  swiperMobile.on('slideChange', () => {
  })

  swiperMobile.on('slideNextTransitionStart', () => {
    contentElems[swiperMobile.activeIndex].classList.add('mod-show')
    contentElems[swiperMobile.activeIndex - 1].classList.remove('mod-show')
  })

  swiperMobile.on('slidePrevTransitionStart', () => {
    contentElems[swiperMobile.activeIndex].classList.add('mod-show')
    contentElems[swiperMobile.activeIndex + 1].classList.remove('mod-show')
  })
}
