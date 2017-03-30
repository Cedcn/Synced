require 'rails_helper'

RSpec.describe PhoneVerifyCodesController, type: :controller do
  describe 'POST#create' do
    before { allow_any_instance_of(ActionController::Base).to receive(:verify_rucaptcha?).and_return(true) }

    it 'should return success response' do
      post :create, params: { mobile: '10000000000' }
      expect(response).to be_success
    end

    it 'should return error when mobile exists' do
      build(:basic_user, mobile: '10000000000').save(validate: false)
      post :create, params: { mobile: '10000000000' }, xhr: true
      expect(response.status).to eq(422)
      expect(JSON.parse(response.body)).to eq('error' => '手机号码已被注册。')
    end
  end
end
