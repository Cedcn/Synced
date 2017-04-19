class CookieStrategy < ::Warden::Strategies::Base
  def valid?
    cookies[:remember_token].present? && cookies[:remember_user].present?
  end

  def authenticate!
    user = User.find(cookies[:remember_user])
    if (token = user.remember_tokens.find_by(token: cookies[:remember_token]))
      token.refresh_active(request)
      success!(user)
    else
      cookies.delete(:remember_token)
      cookies.delete(:remember_user)
      fail!
    end
  end
end
