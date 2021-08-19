import Plyr from 'plyr';

export default function commonVideoPlayer(hostElem) {
  const videoPlayerElems = hostElem.querySelectorAll('.gl-catalog__card-video');

  videoPlayerElems.forEach(elem => {
    new Plyr(elem);
  });
}
