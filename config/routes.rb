Rails.application.routes.draw do
  root :to => 'pages#landing'

  resources :users
  resources :decks
  resources :comics
  resources :favourites

  get '/current_user' => 'session#current_user'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

end
