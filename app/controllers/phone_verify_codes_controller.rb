class PhoneVerifyCodesController < ApplicationController
  before_action :verify_rucaptcha!

  def create
    ShortMessageService.send_verify_code(params[:mobile])
    render json: { success: 'sended' }
  end
end
