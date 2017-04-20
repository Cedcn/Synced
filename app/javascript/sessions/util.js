import $ from 'jquery';

export const updateRucaptcha = () => {
  const $rucaptcha = $('.rucaptcha-image');
  $rucaptcha.attr('src', $rucaptcha.attr('src'));
};
