class SessionsController < ApplicationController
  layout 'sessions'

  def new
    redirect_to root_path if current_user
  end

  def create
    warden.authenticate!
    redirect_back
  end

  def destroy
    warden.logout if current_user
    redirect_back
  end
end
