Rails.application.routes.draw do
  root to: 'homes#top'
  devise_for :users
  devise_scope :user do
    post "users/guest_sign_in", to: "users/sessions#guest_sign_in"
  end
  
  resources :users
  
  resources :posts do
    resources :comments, only: [:create, :destroy]
    resources :favorites, only: [:create, :destroy]
  end 
  
  
  resources :maps, only: [:show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end