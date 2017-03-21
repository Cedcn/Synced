class UsersController < ApplicationController
  def new
    redirect_to root_path if current_user
  end

  def create
    @user = User.new user_params
    if verify_rucaptcha?(@user) && @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :mobile, :email)
  end
end
