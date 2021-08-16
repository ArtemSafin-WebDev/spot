// fixme берем соотношение блоков 16/9 (примерное соотношение стандратных видео)

export default function commonCatalog(hostElem) {
  const catalogListElem = hostElem.querySelector('.gl-catalog__list');
  const cardTitleWrapper = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper');

  const cardsVerticalElems = hostElem.querySelectorAll('.gl-catalog__item--poster-vertical');
  const cardsSquareElems = hostElem.querySelectorAll('.gl-catalog__item--poster-square');
  const cardsVideoSmallElems = hostElem.querySelectorAll('.gl-catalog__item--video-small');
  const cardsVideoMediumElems = hostElem.querySelectorAll('.gl-catalog__item--video-medium');
  const cardsVideoLargeElems = hostElem.querySelectorAll('.gl-catalog__item--video-large');

  const GRID_GAP = 20;

  const onResize = () => {
    const HEIGHT_CAPTION = cardTitleWrapper[0].clientHeight;
    let width;
    let height;
    switch (true) {
      case window.innerWidth > 1024:
        width = (catalogListElem.clientWidth - GRID_GAP * 2) / 3;
        catalogListElem.style.gridTemplateColumns = `repeat(3, minmax(0, ${ width }px))`;
        break;

      case window.innerWidth > 576:
        width = (catalogListElem.clientWidth - GRID_GAP) / 2;
        catalogListElem.style.gridTemplateColumns = `repeat(2, minmax(0, ${ width }px))`;
        break;

      default:
        width = catalogListElem.clientWidth;
        catalogListElem.style.gridTemplateColumns = `repeat(1, minmax(0, ${ width }px))`;
    }

    cardsVerticalElems.forEach((card, i) => {
      if (window.innerWidth > 1024) {
        height = ((width * 2 - GRID_GAP * 690 / 500) + cardTitleWrapper[i].clientHeight);
      } else if (window.innerWidth > 576) {
        height = ((width * 690 / 500) + cardTitleWrapper[i].clientHeight);
      } else {
        height = width + cardTitleWrapper[i].clientHeight;
      }
      card.style.height = `${ height }px`;
    })

    cardsSquareElems.forEach((card, i) => {
      height = width + cardTitleWrapper[i].clientHeight;
      card.style.height = `${ height }px`;
    })

    cardsVideoSmallElems.forEach((card, i) => {
      height = ((width * 9 / 16) + cardTitleWrapper[i].clientHeight);
      card.style.height = `${ height }px`;
    })

    cardsVideoMediumElems.forEach((card, i) => {
      if (window.innerWidth > 576) {
        height = (((width * 2 - GRID_GAP) * 9 / 16) + cardTitleWrapper[i].clientHeight);
      } else {
        height = ((width * 9 / 16) + cardTitleWrapper[i].clientHeight);
      }
      card.style.height = `${ height }px`;
      card.style.height = `${ height }px`;
    })

    cardsVideoLargeElems.forEach((card, i) => {
      if (window.innerWidth > 1024) {
        height = (((width * 3 - GRID_GAP * 2) * 9 / 16) + cardTitleWrapper[i].clientHeight);
      } else if (window.innerWidth > 576) {
        height = (((width * 2 - GRID_GAP) * 9 / 16) + cardTitleWrapper[i].clientHeight);
      } else {
        height = ((width * 9 / 16) + cardTitleWrapper[i].clientHeight);
      }
      card.style.height = `${ height }px`;
    })
  }

  onResize();

  window.addEventListener('resize', onResize);
}
