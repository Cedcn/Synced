require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET#new' do
    context 'user logged in' do
      before { warden.set_user create(:basic_user) }

      it 'should redirect to root_path' do
        expect(get(:new)).to redirect_to(root_url)
      end
    end

    context 'user not login' do
      it 'should be success' do
        expect(get(:new)).to be_success
      end
    end
  end

  describe 'POST#create' do
  end
end
