require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:basic_user) }

  describe 'validation' do
    it 'should not valid without email and mobile' do
      user = build(:user)
      user.valid?
      expect(user.errors[:base]).to include('用户名和邮箱不能同时为空')
    end

    it 'should not valid with both email and mobile' do
      user = build(:user, :with_email, :with_mobile)
      user.valid?
      expect(user.errors[:base]).to include('用户名或邮箱只能填写一项')
    end
  end

  describe 'pinyinable' do
    it 'should generate pinyin' do
      expect(user.pinyin).to eq('jiqizhixin')
      expect(user.pinyin_abbr).to eq('jqzx')
    end
  end

  describe 'username' do
    it 'should autogenerate on create' do
      expect(user.username).to eq('jiqizhixin')
    end

    it 'should random username when username exists' do
      expect(create(:basic_user).username).not_to eq('jiqizhixin')
    end

    it 'should sliced when pinyin is too long' do
      user2 = create(:basic_user, name: '机器之心' * 5)
      expect(user2.username.length).to eq(20)
    end
  end
end
