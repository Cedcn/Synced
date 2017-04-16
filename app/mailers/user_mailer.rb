class UserMailer < ApplicationMailer
  def welcome_email(user)
    mail(to: user.email, subject: 'welcome')
  end

  def reset_token_email(user)
    mail(to: user.email, subject: 'reset password')
  end
end
