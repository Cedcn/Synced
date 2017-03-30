require 'rails_helper'

RSpec.describe ShortMessageService do
  describe 'send_verify_code' do
    it 'should cache code' do
      ShortMessageService.send_verify_code('10000000000')
      expect(Rails.cache.fetch('phone_verify_code:10000000000')).not_to be_nil
    end
  end
end
