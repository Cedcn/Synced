Rails.application.config.middleware.insert_after ActionDispatch::Flash, Warden::Manager do |manager|
  manager.default_scope = :user
  manager.failure_app = UnauthorizedController
  manager.scope_defaults :user, strategies: %i[password omniauth]
  manager.scope_defaults :cookie, strategies: [:cookie]
end

Warden::Strategies.add(:password, PasswordStrategy)
Warden::Strategies.add(:omniauth, OmniauthStrategy)
Warden::Strategies.add(:cookie, CookieStrategy)

Warden::Manager.serialize_into_session(&:id)

Warden::Manager.serialize_from_session do |id|
  User.find_by(id: id)
end

Warden::Manager.before_logout do |user, auth, _opts|
  auth.cookies.delete(:remember_user)
  token = auth.cookies.delete(:remember_token)
  if token.present?
    remember_token = user.remember_tokens.find_by(token: token)
    remember_token&.destroy
  end
end

# Warden mixins
module Warden::Mixins::Common
  def request
    @request ||= ActionDispatch::Request.new(env)
  end

  def cookies
    request.cookie_jar
  end
end

class Warden::Strategies::Base
  def store_cookie(user)
    remember_token = user.remember_tokens.create
    cookies[:remember_user] = user.id
    cookies[:remember_token] = remember_token.token
    remember_token.refresh_active(request)
  end
end
