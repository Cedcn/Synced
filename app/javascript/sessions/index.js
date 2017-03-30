import $ from 'jquery';
import particlesBG from './particlesBG';

const sessions = () => {
  particlesBG();

  const $eye = $('#switch-password');

  $eye.on('click', function () {
    const $this = $(this);
    const $input = $this.siblings('input');
    const isShow = $input.attr('type') === 'password';

    $this.closest('.field').toggleClass('show');
    $input.attr('type', isShow ? 'text' : 'password');
  });
};

export default sessions;
