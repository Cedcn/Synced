class UserMailer < ApplicationMailer
  def welcome_email(user)
    mail(to: user.email, subject: 'welcome')
  end

  def send_login_verification_code(user)
    @code = user.generate_reset_code
    mail(to: user.email, subject: 'reset password')
  end
end
