import $ from 'jquery';
import ModalLayer from 'modal-layer';
import noty from 'noty';

const resetPassword = () => {
  const modal = new ModalLayer('#js-reset-password-modal');
  const $forgetBtn = $('.forget_password');
  $forgetBtn.on('click', () => { modal.open(); });

  const $nextStepBtn = $('.next-step');
  $nextStepBtn.on('click', function () {
    const $this = $(this);
    const $currentStep = $this.closest('.step');
    $.ajax({
      url: '/send_login_verification_code',
      method: 'POST',
      data: {
        login_name: $currentStep.find('input[name="login_name"]').val(),
        _rucaptcha: $currentStep.find('input[name="_rucaptcha"]').val()
      }
    })
    .done(() => {
      $currentStep.removeClass('active').next().addClass('active');
    })
    .fail(xhr => {
      noty({
        text: xhr.responseJSON.error,
        type: 'error'
      });
    });
  });

  const $passwordReset = $('#js-password-reset');
  $passwordReset.on('click', function () {
    const $this = $(this);
    const $currentStep = $this.closest('.step');

    $.ajax({
      url: '/send_login_verification_code',
      method: 'POST',
      data: {
        login_name: $currentStep.prev().find('input[name="login_name"]').val(),
        reset_code: $currentStep.find('input[name="reset_code"]').val(),
        password: $currentStep.find('input[name="password"]').val()
      }
    })
    .done(() => {
      $currentStep.removeClass('active').next().addClass('active');
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
