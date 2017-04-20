import $ from 'jquery';
import ModalLayer from 'modal-layer';
import noty from 'noty';

import { updateRucaptcha } from './util';

const resetPassword = () => {
  const modal = new ModalLayer('#js-reset-password-modal', {
    maskcolor: 'rgba(0, 0, 0, 0.4)',
    openStartFun: () => {
      $('.step').first().addClass('active').siblings()
        .removeClass('active');
      updateRucaptcha();
    }
  });
  const $forgetBtn = $('.forget_password');
  $forgetBtn.on('click', () => { modal.open(); });

  let loginName = '';
  const $nextStepBtn = $('.next-step');
  $nextStepBtn.on('click', function () {
    const $this = $(this);
    const $currentStep = $this.closest('.step');
    const name = $currentStep.find('input[name="login_name"]').val();
    const piccode = $currentStep.find('input[name="_rucaptcha"]').val();
    $.ajax({
      url: '/send_login_verification_code',
      method: 'POST',
      data: {
        login_name: name,
        _rucaptcha: piccode
      }
    })
    .done(() => {
      loginName = name;
      $currentStep.next().find('.login-name').text(loginName);

      $currentStep.removeClass('active').next().addClass('active');
    })
    .fail(xhr => {
      updateRucaptcha();
      noty({
        text: xhr.responseJSON.error,
        type: 'error'
      });
    });
  });

  const $prevStepBtn = $('.prev-step');
  $prevStepBtn.on('click', function () {
    const $this = $(this);
    const $currentStep = $this.closest('.step');
    $currentStep.removeClass('active').prev().addClass('active');
    updateRucaptcha();
  });

  const $passwordReset = $('#js-password-reset');
  $passwordReset.on('click', function () {
    const $this = $(this);
    const $currentStep = $this.closest('.step');

    $.ajax({
      url: '/password_reset',
      method: 'POST',
      data: {
        login_name: loginName,
        password: $currentStep.find('input[name="password"]').val(),
        reset_code: $currentStep.find('input[name="reset_code"]').val()
      }
    })
    .done(() => {
      noty({
        text: '密码重置成功',
        type: 'success'
      });
      modal.close();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    })
    .fail(xhr => {
      noty({
        text: xhr.responseJSON.error,
        type: 'error'
      });
    });
  });
};

export default resetPassword;
