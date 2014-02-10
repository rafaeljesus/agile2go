Agile2go::Application.routes.draw do
  resources :sprints

  get 'current_user', to: 'current_user#index'
  resources :projects, :users
  resource :user_sessions, only: [:create, :new, :destroy]

  root to: 'home#index'
end
