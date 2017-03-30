import $ from 'jquery';
import particlesBG from './particlesBG';

const sessions = () => {
  particlesBG();

  $('.zoom').addClass('active');
  //
  const $eye = $('.js-switch-password');
  $eye.on('click', function () {
    const $this = $(this);
    const $input = $this.siblings('input');
    const isShow = $input.attr('type') === 'password';

    $this.closest('.field').toggleClass('active');
    $input.attr('type', isShow ? 'text' : 'password');
  });

  //
  const $slideContainer = $('.slide-container');
  $slideContainer.each((index, item) => {
    const $item = $(item);
    const $anchor = $item.find('.slide-tabs .anchor-btn');
    const $anchorContent = $item.find('.slide-content .anchor-content');
    const $bar = $item.find('.slide-tabs .anchor-bar');

    $anchor.on('click', function () {
      const $this = $(this);
      const seat = $this.position().left;

      $bar.animate({ left: seat });
      $this.addClass('active').siblings().removeClass('active');
      $anchorContent.eq($this.index()).addClass('active').siblings().removeClass('active');
    });
  });

  //
  (() => {
    const $sendCode = $('#js-send-code');
    const cycle = 30;
    let status = 'default';

    $sendCode.on('click', function () {
      if (status === 'await') return;
      const $this = $(this);

      // $.ajax({
      //   url: 'http://www.jiqizhixin.com',
      //   method: 'GET'
      // }).done(() => {
      //
      // });
      status = 'await';
      $this.addClass('disable');
      let time = cycle;
      $this.text(`重新发送(${time}s)`);

      const countdown = setInterval(() => {
        time -= 1;
        if (time <= 0) {
          status = 'default';
          $this.removeClass('disable');
          $this.text('重新发送');
          clearInterval(countdown);
          return;
        }
        $this.text(`重新发送(${time}s)`);
      }, 1000);
    });
  })();
};

export default sessions;
