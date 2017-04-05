require 'rails_helper'

RSpec.describe Admin::ArticlesController, type: :controller do
  before { warden.set_user create(:organizer) }

  describe 'Get #index' do
    it 'return 200' do
      get :index
      expect(response).to be_success
    end
  end

  describe 'Post #create' do
    it 'create a article' do
      expect { post :create, params: { article: attributes_for(:article) } }.to change { Article.count }.by(1)
    end
  end
end
