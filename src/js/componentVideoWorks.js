import commonVideoPlayer from './commonVideoPlayer';

export default function componentVideoWorks() {
  const hostElem = document.querySelector('#video-works-host');
  if (hostElem) {
    commonVideoPlayer(hostElem);
  }
};
