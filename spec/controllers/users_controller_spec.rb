require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user) { create(:basic_user, :with_mobile, :without_validation) }

  describe 'GET#new' do
    context 'user logged in' do
      before { warden.set_user user }

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
    context 'signup with email' do
      it 'should return error it captcha wrong' do
        post :create, params: { user: { email: 'test@jiqizhixin.com', password: '123123' }, format: :js }
        expect(JSON.parse(response.body)['error']).to eq('验证码不正确')
      end

      it 'should create a new user' do
        allow_any_instance_of(ActionController::Base).to receive(:verify_rucaptcha?).and_return(true)
        expect { post :create, params: { user: { email: 'test@jiqizhixin.com', password: '123123' }, format: :js } }
          .to change { User.count }.by(1)
      end
    end

    context 'sighup with mobile' do
      it 'should return error without verify_code' do
        post :create, params: { user: { mobile: '13011111111', password: '123123' }, format: :js }
        expect(JSON.parse(response.body)['error']).to include('手机验证码错误')
      end

      it 'should create a new user' do
        allow_any_instance_of(User).to receive(:check_phone_verify_code).and_return(true)
        expect { post :create, params: { user: { mobile: '13011111111', password: '123123' }, format: :js } }
          .to change { User.count }.by(1)
      end
    end
  end

  describe 'POST#send_login_verification_code' do
    context 'invalid captcha' do
      it 'should return invalid captcha' do
        post :send_login_verification_code, params: { login_name: user.email, format: :js }
        expect(JSON.parse(response.body)['error']).to eq('验证码不正确')
      end
    end

    context 'right captcha' do
      before { allow_any_instance_of(ActionController::Base).to receive(:verify_rucaptcha?).and_return(true) }

      it 'sended by email' do
        expect(post(:send_login_verification_code, params: { login_name: user.email, format: :js }))
          .to be_success
      end

      it 'sended by mobile' do
        expect(post(:send_login_verification_code, params: { login_name: user.mobile, format: :js }))
          .to be_success
      end

      it 'return error with incorrect way' do
        post :send_login_verification_code, params: { login_name: 'test', format: :js }
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'POST#password_reset' do
    let(:code) { user.generate_reset_code }
    it 'should successful reset password' do
      expect(post(:password_reset, params:
                  { login_name: user.email, reset_code: code, password: 'jiqizhixin', format: :js }))
        .to be_success
      expect(user.reload.authenticate('jiqizhixin')).to eq(user)
    end

    it 'wont reset password with wrong code' do
      wrong_code = code + '1'
      post :password_reset,
        params: { login_name: user.email, reset_code: wrong_code, password: 'jiqizhixin', format: :js }
      expect(response.status).to eq(422)
    end
  end
end
