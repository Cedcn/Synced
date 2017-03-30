class PhoneVerifyCodesController < ApplicationController
  def create
    if verify_rucaptcha?(nil, keep_session: true)
      ShortMessageService.send_verify_code(params[:mobile])
      render json: { success: 'sended' }
    else
      render json: { error: t(:wrong_captcha) }, status: 403
    end
  end
end