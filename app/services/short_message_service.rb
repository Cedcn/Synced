class ShortMessageService
  class << self
    def send_verify_code(number)
      raise(CustomException, I18n.t(:mobile_number_exists)) if User.exists?(mobile: number)
      code = Rails.cache.fetch "phone_verify_code:#{number}", expires_in: 5.minutes do
        rand(100_000..999_999).to_s
      end
      Rails.logger.info code
    end

    def send_login_verification_code(user)
      code = user.generate_reset_code
      Rails.logger.info code
    end
  end
end
