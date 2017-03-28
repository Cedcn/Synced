class ShortMessageService
  class << self
    def send_verify_code(number)
      code = Rails.cache.fetch "phone_verify_code:#{number}", expires_in: 5.minutes do
        rand(100_000..999_999).to_s
      end

      Rails.logger.info code
    end
  end
end
