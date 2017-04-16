class UsersController < ApplicationController
  layout 'sessions'

  before_action :not_login

  def create
    @user = User.new user_params
    verify_rucaptcha(@user) if @user.email.present?

    if @user.save
      warden.set_user(@user)
      render json: @user, status: 200
    else
      render json: @user.errors, status: 403
    end
  end

  def check_exist
    user = User.search_by_login_name(login_name)
    render json: { exist: user.present?, avatar_url: user&.avatar_url }
  end

  private

  def not_login
    redirect_to root_path if current_user
  end

  def login_name
    params[:user][:mobile] || params[:user][:email]
  end

  def user_params
    params.require(:user).permit(:password, :mobile, :email, :phone_verify_code)
  end
end
