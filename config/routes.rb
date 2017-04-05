Rails.application.routes.draw do
  root to: 'gmis#index'

  get 'login',  to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  match 'vote_up/:id', to: 'votes#vote_up', via: [:post, :put, :patch]

  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'

  resource :phone_verify_code, only: :create

  namespace :settings do
    resource :profile, only: [:index, :update]
    resource :security, only: :index
  end

  constraints subdomain: 'gmis' do
    root 'gmis#index', as: :gmis
    get ':year', to: 'gmis#show', constraints: { year: /2017/ }
  end

  namespace :admin do
    resources :articles
    resources :events, except: :show do
      scope module: 'events' do
        resources :guests, except: [:show, :new, :edit]
        resources :partner_categories, except: [:show, :new, :edit] do
          resources :partners, except: [:show, :new, :edit]
        end
      end
    end
    resources :guests, except: :show
    resources :partners, except: :show
  end
end
