import $ from 'jquery';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

const video = () => {
  const player = videojs('gmis-player', {
    controls: true,
    autoplay: false,
    techOrder: ['html5', 'flash'],
    preload: 'auto'
  });

  const $overlay = $('#video-hero-overlay');
  const $video = $overlay.closest('.video');
  player.on(['play', 'playing'], () => {
    $overlay.addClass('transparent');
    $video.removeClass('hide-video');
  });

  player.on('pause', () => {
    $overlay.removeClass('transparent');
  });

  player.on('ended', () => {
    player.load();
    $video.addClass('hide-video');
  });
};

export default video;
