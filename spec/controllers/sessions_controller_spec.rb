require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  let(:user) { create(:basic_user) }

  describe 'Login from cookies' do
    it 'returns user from cookie' do
      request.cookies[:remember_user] = user.id
      request.cookies[:remember_token] = user.remember_tokens.create.token
      get :new
      expect(warden.user).to eq(user)
    end
  end

  describe 'Get #new' do
    it 'render success' do
      get :new
      expect(response).to be_success
    end

    context 'when already login' do
      before { warden.set_user(user) }
      it 'redirect root' do
        get :new
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'Post #create' do
    it 'login fail with wrong password' do
      post :create, params: { login_name: user.email, password: 'wrong password' }
      expect(warden.user).to eq nil
    end

    it 'login success when with right password' do
      post :create, params: { login_name: user.email, password: user.password }
      expect(response).to redirect_to(root_path)
      expect(warden.user).to eq user
    end

    it 'save cookies if remember_me checked' do
      post :create, params: { login_name: user.email, password: user.password, remember_me: true }
      token = user.remember_tokens.first
      expect(token).to be_present
    end
  end

  describe 'Delete #destroy' do
    before { warden.set_user(user) }

    it 'should logout user' do
      delete :destroy
      expect(warden.user).to eq nil
    end

    it 'should destroy remember_token' do
      request.cookies[:remember_token] = user.remember_tokens.create.token
      request.cookies[:remember_user] = user.id
      delete :destroy

      expect(request.cookies[:remember_token]).to be_nil
      expect(request.cookies[:remember_user]).to be_nil
      expect(user.reload.remember_tokens.length).to eq(0)
    end
  end
end
