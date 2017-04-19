class UsersController < ApplicationController
  layout 'sessions'

  before_action :not_login

  def create
    @user = User.new user_params
    verify_rucaptcha! if @user.email.present?

    if @user.save
      warden.set_user(@user)
      render json: @user, status: 200
    else
      render json: { error: @user.errors.full_messages }, status: 403
    end
  end

  def send_login_verification_code
    verify_rucaptcha!
    case params[:login_name]
    when /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
      user = User.find_by!(email: params[:login_name])
      UserMailer.send_login_verification_code(user).deliver_later
    when /\A\d{11}\z/
      user = User.find_by!(mobile: params[:login_name])
      ShortMessageService.send_login_verification_code(user)
    else
      raise(CustomException, t(:wrong_paramter))
    end
    render json: { success: true }
  end

  def password_reset
    user = User.search_by_login_name(params[:login_name])
    raise(CustomException, t(:invalid_reset_code)) unless user&.verify_reset_code(params[:reset_code])
    user.update!(reset_password_params)
    warden.set_user(user)
    render json: { success: true }
  end

  def check_exist
    user = User.search_by_login_name(params[:login_name])
    render json: { exist: user.present?, avatar_url: user&.avatar_url }
  end

  private

  def not_login
    redirect_to(root_path) && return if current_user
  end

  def user_params
    params.require(:user).permit(:password, :mobile, :email, :phone_verify_code)
  end

  def reset_password_params
    params.permit(:password)
  end
end
