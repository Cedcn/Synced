import $ from 'jquery';
import 'jquery-ujs';
import 'jquery-form';
import { validation } from 'value-validate';
import ModalLayer from 'modal-layer';
import 'modal-layer/dist/style.css';

import forEach from 'lodash/forEach';
import noty from 'noty';
import particlesBG from './particlesBG';
import resetPassword from './resetPassword';


const sessions = () => {
  particlesBG();
  resetPassword();

  $('.zoom').addClass('active');

  $.ajaxSetup({ dataType: 'json' });

  // set noty
  $.noty.defaults.layout = 'topCenter';
  $.noty.defaults.timeout = 1800;

  // Show or hide password
  const $eye = $('.js-switch-password');
  $eye.on('click', function () {
    const $this = $(this);
    const $input = $this.siblings('input');
    const isShow = $input.attr('type') === 'password';

    $this.closest('.field').toggleClass('active');
    $input.attr('type', isShow ? 'text' : 'password');
  });

  // Slide
  const $slideContainer = $('.slide-container');
  $slideContainer.each((index, item) => {
    const $item = $(item);
    const $anchor = $item.find('.slide-tabs .anchor-btn');
    const $anchorContent = $item.find('.slide-content .anchor-content');
    const $bar = $item.find('.slide-tabs .anchor-bar');

    $anchor.on('click', function () {
      const $this = $(this);
      const seat = $this.position().left;
      const $content = $anchorContent.eq($this.index());

      $bar.animate({ left: seat });
      $this.addClass('active').siblings().removeClass('active');
      $content.addClass('active').siblings().removeClass('active');
    });
  });

  // refresh picture code
  const $rucaptchaImg = $('.rucaptcha-image');
  $rucaptchaImg.on('click', () => updateRucaptcha());


  const piccodeModal = new ModalLayer('#js-piccode-modal', {
    openStartFun: () => updateRucaptcha()
  });

  $('#phone-form, #email-form').ajaxForm({
    error: xhr => {
      const msgArr = xhr.responseJSON;
      forEach(msgArr, arr => {
        forEach(arr, item => {
          noty({ text: item, type: 'error' });
        });
      });
    },
    success: () => {
      window.location.href = `${window.location.origin}/account`;
      noty({ text: '注册成功', type: 'success' });
    }
  });

  // send phone verification code
  (() => {
    const $phoneForm = $('#phone-form');
    const $sendCode = $phoneForm.find('#js-send-code');
    const $phone = $phoneForm.find('input[id="mobile"]');

    const codeCycle = 30;
    let status = 'default';

    $sendCode.on('click', () => {
      if (status === 'await') return;

      // verify phone correct
      const result = validation($phone.val(), ['required', 'phone']);
      if (!result.isPass) {
        noty({ text: '请输入正确的手机号', type: 'error' });
        return;
      }

      piccodeModal.open();
    });

    const $acceptMsg = $('#js-accept-msg');
    $acceptMsg.on('click', function () {
      const $input = $(this).closest('.piccode-modal').find('input[name="_rucaptcha"]');

      $.ajax({
        url: '/phone_verify_code',
        method: 'POST',
        data: {
          mobile: $phone.val(),
          _rucaptcha: $input.val()
        }
      }).done(() => {
        piccodeModal.close();
        $input.val('');
        noty({ text: '验证码已发送', type: 'success' });

        status = 'await';
        $sendCode.addClass('disable');

        let time = codeCycle;
        $sendCode.text(`重新发送(${time}s)`);

        const countdown = setInterval(() => {
          time -= 1;
          if (time <= 0) {
            status = 'default';
            $sendCode.removeClass('disable');
            $sendCode.text('重新发送');
            clearInterval(countdown);
            return;
          }
          $sendCode.text(`重新发送(${time}s)`);
        }, 1000);
      }).fail(xhr => {
        noty({
          text: xhr.responseJSON.error || '异常错误',
          type: 'error'
        });
      });
    });
  })();

  function updateRucaptcha() {
    const $rucaptcha = $('.rucaptcha-image');
    $rucaptcha.attr('src', $rucaptcha.attr('src'));
  }
};

export default sessions;
