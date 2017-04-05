class UsersController < ApplicationController
  layout 'sessions'

  def new
    redirect_to root_path if current_user
  end

  def create
    @user = User.new user_params
    if @user.save
      render json: @user, status: 200
    else
      render json: @user.errors, status: 403
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :mobile, :email, :phone_verify_code)
  end
end
