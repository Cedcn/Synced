require 'rails_helper'

RSpec.describe ShortMessageService do
  describe 'send_verify_code' do
    it 'should cache code' do
      ShortMessageService.send_verify_code('10000000000')
      expect(Rails.cache.fetch('phone_verify_code:10000000000')).not_to be_nil
    end
  end

  describe 'send_login_verification_code' do
    it 'should generated code' do
      user = create(:user, :with_mobile, :with_password, :without_validation)
      ShortMessageService.send_login_verification_code(user)
      expect(Rails.cache.fetch("reset_code:#{user.id}")).not_to be_nil
    end
  end
end
