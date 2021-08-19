import commonVideoPlayer from './commonVideoPlayer';

export default function componentVideoFilms() {
  const hostElem = document.querySelector('#video-films-host');
  if (hostElem) {
    commonVideoPlayer(hostElem);
  }
};
