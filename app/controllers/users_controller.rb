class UsersController < ApplicationController
  layout 'sessions'

  before_action :not_login

  def create
    @user = User.new user_params
    verify_rucaptcha(@user) if @user.email.present?

    if @user.save
      render json: @user, status: 200
    else
      render json: @user.errors, status: 403
    end
  end

  private

  def not_login
    redirect_to root_path if current_user
  end

  def user_params
    params.require(:user).permit(:name, :password, :mobile, :email, :phone_verify_code)
  end
end
