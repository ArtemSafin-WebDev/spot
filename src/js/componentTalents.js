import commonCatalog from './commonCatalog';
import commonVideo from './commonVideo';

export default function componentTalents() {
  const hostElem = document.querySelector('#talent-host');

  if (hostElem) {
    const descriptionPhoto = hostElem.querySelector('.talent__description-photo');

    commonCatalog(hostElem);
    commonVideo(hostElem);

    const setPhotoHeight = () => {
      descriptionPhoto.style.height = `${ descriptionPhoto.clientWidth }px`;
    }

    setPhotoHeight();

    window.addEventListener('resize', setPhotoHeight);
  }
}
