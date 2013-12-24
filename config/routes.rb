Agile2go::Application.routes.draw do
  get "user_sessions/new"
  get "user_sessions/create"
  get "user_sessions/destroy"
  resources :users

  get "home/index"
  root to: 'home#index'
end
