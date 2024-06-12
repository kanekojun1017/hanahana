Rails.application.routes.draw do
 
  scope module: :public do
    devise_for :users, controllers: {
      sessions: 'public/sessions'
    }
    root to: 'homes#top'
    get '/search', to: 'searches#search'
  
    resources :posts do
      resources :comments, only: [:create, :destroy]
      resources :favorites, only: [:create, :index, :destroy]
    end
  
    
  
    resources :users do
      resource :relationships, only: [:create, :destroy]
      get 'followings' => 'relationships#followings', as: 'followings'
      get 'followers' => 'relationships#followers', as: 'followers'
    end
  
    resources :maps, only: [:show]
  end 
  
  devise_for :admin, skip: [:registrations, :password], controllers: {
    sessions: 'admin/sessions'
  }
  namespace :admin do
    get 'dashboards', to: 'dashboards#index'
    resources :users, only: [:destroy]
  end
  devise_scope :user do
      post "users/guest_sign_in", to: "public/sessions#guest_sign_in"
  end
end
  

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html