Rails.application.routes.draw do
  root to: 'homes#top'
  

  devise_for :users
  
  devise_scope :user do
    post "users/guest_sign_in", to: "users/session#guest_sign_in"
  end
  
  resources :posts do
    resources :comments, only: [:create, :destroy]
  end 
  
  resources :users
  
  resource :map, only: [:show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
