class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound, with: :render_404
  rescue_from ActiveRecord::RecordInvalid, with: :render_custom_error

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from CustomException, with: :render_custom_error
  rescue_from ForbiddenException, with: :render_403_error

  helper_method :current_user

  private

  def current_user
    warden.user
  end

  def redirect_back
    redirect_to(request.referer || root_path)
  end

  def warden
    request.env['warden']
  end

  def render_custom_error(e)
    respond_to do |format|
      format.js { render json: { error: e.message }, status: 422 }
    end
  end

  def render_403_error(e)
    respond_to do |format|
      format.js { render json: { error: e.message }, status: 403 }
    end
  end

  def render_404
    respond_to do |format|
      format.html { render file: Rails.root.join('public', '404'), layout: false, status: :not_found }
      format.js { head :not_found }
    end
  end

  def verify_rucaptcha!
    raise(ForbiddenException, t('rucaptcha.invalid')) && return unless verify_rucaptcha?
  end

  def user_not_authorized
    flash[:alert] = 'You are not authorized to perform this action.'
    redirect_back
  end

  def set_request_variant
    request.variant = :mobile if browser.device.ipad? || browser.device.mobile?
  end
end
