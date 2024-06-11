Rails.application.routes.draw do
  get '/search', to: 'searches#search'
  root to: 'homes#top'
  devise_for :users
  
  devise_scope :user do
    post "users/guest_sign_in", to: "users/sessions#guest_sign_in"
  end
  
  devise_for :admin, skip: [:registrations, :password], controllers: {
    sessions: 'admin/session'
  }
  namespace :admin do
    get 'dashboards', to: 'dashboards#index'
    resources :users, only: [:destroy]
  end
  
  resources :users do
    resource :relationships, only: [:create, :destroy]
    get 'followings' => 'relationships#followings', as: 'followings'
    get 'followers' => 'relationships#followers', as: 'followers'
  end
  
  resources :posts do
    resources :comments, only: [:create, :destroy]
    resources :favorites, only: [:create, :index, :destroy]
  end 
  
  
  resources :maps, only: [:show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end