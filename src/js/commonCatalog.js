// fixme берем соотношение блоков 16/9 (примерное соотношение стандратных видео)

export default function commonCatalog(hostElem) {
  const catalogListElem = hostElem.querySelector('.gl-catalog__list');
  const cardTitleWrapper = hostElem.querySelectorAll('.gl-catalog__card-title-wrapper');

  const catalogItem = hostElem.querySelectorAll('.gl-catalog__item');

  const GRID_GAP = 20;

  const onResize = () => {
    let width;
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

    let height;
    let ratio; // 9 / 16 у видосов
    let columnWidth;
    catalogItem.forEach((elem, i) => {
      switch (true) {
        case elem.className.includes('gl-catalog__item--poster-vertical'): // fixme постер
          columnWidth = 1;
          ratio = window.innerWidth > 576 ? 690 / 500 : 1;
          break;

        case elem.className.includes('gl-catalog__item--poster-square'): // fixme квадрат
          columnWidth = 1;
          ratio = 1;
          break;

          case elem.className.includes('gl-catalog__item--video-small'): // fixme маленькое видео
            columnWidth = 1;
            ratio = 280 / 500;
            break;

        case elem.className.includes('gl-catalog__item--video-medium'): // fixme среднее видео
          ratio = 600 / 1020;
          columnWidth = window.innerWidth > 576 ? 2 : 1;
          break;

        case elem.className.includes('gl-catalog__item--video-large'): // fixme большое видео
          ratio = 875 / 1540;
          if (window.innerWidth > 1024) {
            columnWidth = 3;
          } else if (window.innerWidth > 576) {
            columnWidth = 2;
          } else {
            columnWidth = 1;
          }
          break;
      }

      height = (((width * columnWidth + GRID_GAP * (columnWidth - 1)) * ratio) + cardTitleWrapper[i].clientHeight);
      elem.style.height = `${ height }px`;
    })
  }

  onResize();

  window.addEventListener('resize', onResize);
}
