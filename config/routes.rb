Agile2go::Application.routes.draw do
  resources :projects
  resources :users
  resource :user_sessions, only: [:create, :new, :destroy]

  root to: 'home#index'
end
