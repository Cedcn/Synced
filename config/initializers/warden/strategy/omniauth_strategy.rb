class OmniauthStrategy < ::Warden::Strategies::Base
  def valid?
    request.env['omniauth.auth']
  end

  def authenticate!
    auth = request.env['omniauth.auth']
    authorization = Authorization.find_by(auth['provider'], auth['uid'])
    user = authorization.try(:user) || User.create_with_omniauth(auth)
    success!(user)
  end
end
