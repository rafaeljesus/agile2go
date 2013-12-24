Agile2go::Application.routes.draw do
  resources :users

  get "home/index"
  root to: 'home#index'
end
