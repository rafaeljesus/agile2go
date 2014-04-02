Agile2go::Application.routes.draw do

  get 'auth/:provider/callback', to: 'user_sessions#create_from_omniauth'
  get 'auth/failure', to: redirect('user_sessions#new')

  get 'current_user', to: 'current_user#index'
  get 'dashboard', to: 'dashboard#index'

  resources :projects, :users, :tasks, :sprints
  resource :user_sessions, only: [:create, :new, :destroy]

  root to: 'home#index'
end
