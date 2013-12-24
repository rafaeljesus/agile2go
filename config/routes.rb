Agile2go::Application.routes.draw do
  get "user_sessions_controllers/new"
  get "user_sessions_controllers/create"
  get "user_sessions_controllers/destroy"
  resources :users

  get "home/index"
  root to: 'home#index'
end
