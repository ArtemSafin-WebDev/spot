import commonCatalog from './commonCatalog';
import commonVideo from './commonVideo';
import { ModalVideo } from './modalVideo';

export default function componentTalents() {
  const hostElem = document.querySelector('#talent-host');

  if (hostElem) {
    const descriptionPhoto = hostElem.querySelector('.talent__description-photo');
    const titleContainerElem = hostElem.querySelector('.gl-personal-page-name-wrapper');
    const titleElem = hostElem.querySelector('.talent__title');
    const videoItemElems = hostElem.querySelectorAll('.gl-catalog__item');

    commonCatalog(hostElem);
    commonVideo(hostElem);

    descriptionPhoto.style.height = `${ descriptionPhoto.clientWidth }px`;

    if (window.innerWidth > 1024) {
      let titleFontSize = 50;
      let titleLineHeight = 60;

      let interval;
      interval = setInterval(() => {

        const titleContainerWidth = titleContainerElem.offsetWidth - 30;
        const titleElemWidth = titleElem.offsetWidth;

        if (titleElemWidth > titleContainerWidth) {

          titleFontSize--;
          titleLineHeight--;
          titleElem.style.fontSize = `${ titleFontSize }px`;
          titleElem.style.lineHeight = `${ titleLineHeight }px`;
        } else {
          clearInterval(interval);
        }
      }, 2);
    }

    videoItemElems.forEach(video => {
      video.onclick = () => {
        const videoLink = video.getAttribute('data-modal-video');
        const videoTitle = video.getAttribute('data-modal-title');
        const videoProvider = video.getAttribute('data-modal-video-provider');
        const modal = new ModalVideo();
        modal.onOpenModal(videoLink, videoTitle, videoProvider);
      }
    })
  }
}
