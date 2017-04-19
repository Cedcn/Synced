require 'rails_helper'

RSpec.describe RememberToken, type: :model do
  before do
    user = create(:basic_user)
    @token = user.remember_tokens.create
  end

  describe 'default value' do
    it 'should has default values' do
      expect(@token.token).to be_present
      expect(@token.last_actived_at).to be_present
    end
  end
end
