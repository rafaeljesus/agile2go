Agile2go::Application.routes.draw do
  get 'current_user', to: 'current_user#index'
  resources :projects, :users, :tasks, :sprints
  resource :user_sessions, only: [:create, :new, :destroy]
  root to: 'home#index'
end
