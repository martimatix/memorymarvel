Rails.application.routes.draw do
  root :to => 'pages#landing'

  namespace :api do
    resources :users
    resources :decks
    resources :comics
    resources :favourites
  end

  get '/current_user' => 'session#current_user'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

end
