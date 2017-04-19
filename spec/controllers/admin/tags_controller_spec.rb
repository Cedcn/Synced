require 'rails_helper'

RSpec.describe Admin::TagsController, type: :controller do
  before { warden.set_user create(:editor) }

  describe 'Get #index' do
    it 'return 200' do
      get :index
      expect(response).to be_success
    end
  end

  describe 'Post #create' do
    it 'create a tag' do
      expect { post :create, params: { tag: { name: 'abc' } } }.to change { ActsAsTaggableOn::Tag.count }.by(1)
    end
  end
end
