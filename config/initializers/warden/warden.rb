Rails.application.config.middleware.insert_after ActionDispatch::Flash, Warden::Manager do |manager|
  manager.default_scope = :user
  manager.failure_app = UnauthorizedController
  manager.scope_defaults :user, strategies: %i[password omniauth]
end

Warden::Strategies.add(:password, PasswordStrategy)
Warden::Strategies.add(:omniauth, OmniauthStrategy)

Warden::Manager.serialize_into_session(&:id)

Warden::Manager.serialize_from_session do |id|
  User.find_by(id: id)
end
