class Admin::UsersController < Admin::BaseController
  def index
    load_users
    authorize :user
    render json: @users
  end

  private

  def load_users
    @q = User.ransack(params[:q])
    @users = @q.result.page(params[:page]).per(10)
  end
end
