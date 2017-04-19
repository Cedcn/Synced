Rails.application.routes.draw do
  require 'sidekiq/web'
  # User account
  get 'login',  to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'
  get 'check_exist', to: 'users#check_exist'
  resource :phone_verify_code, only: :create
  # Omniauth
  get '/auth/:provider/callback', to: 'sessions#create'
  # ResetPassword
  post 'send_login_verification_code', to: 'users#send_login_verification_code'
  post 'password_reset', to: 'users#password_reset'

  namespace :settings do
    resource :profile, only: %i[index update]
    resource :security, only: :index
  end

  match 'vote_up/:id', to: 'votes#vote_up', via: %i[post put patch]

  constraints subdomain: 'gmis' do
    root 'gmis#index', as: :gmis
    get ':year', to: 'gmis#show', constraints: { year: /2017/ }
  end

  namespace :admin do
    resources :users, only: :index
    resources :articles, except: %i[show new edit]
    resources :categories, only: :index
    resources :events, except: :show do
      scope module: 'events' do
        resources :guests, except: %i[show new edit]
        resources :partner_categories, except: %i[show new edit] do
          resources :partners, except: %i[show new edit]
        end
      end
    end
    resources :guests, except: :show
    resources :partners, except: :show
    mount Sidekiq::Web => '/sidekiq', constraints: AdminConstraint.new
  end

  # just for front-end page test
  get 'category/topic', to: 'home#topic'
  get 'category/video', to: 'home#video'
  get 'article/show'

  root to: 'home#index'
end
