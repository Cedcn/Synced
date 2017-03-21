Rails.application.routes.draw do
  root to: 'gmis#index'

  get 'login',  to: 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'signup', to: 'users#new'
  post 'signup', to: 'users#create'
  match 'vote_up/:id', to: 'votes#vote_up', via: [:post, :put, :patch]

  constraints subdomain: 'gmis' do
    root 'gmis#index', as: :gmis
    get ':year', to: 'gmis#show', constraints: { year: /2017/ }
  end

  namespace :admin do
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
