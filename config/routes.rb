Rails.application.routes.draw do
  root :to => 'pages#landing'
  
  resources :users

  namespace :api do
    resources :decks do
      resources :comics
    end
    resources :favourites
  end

  get '/current_user' => 'session#current_user'

  get '/front_page_images' =>'pages#front_page_images'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

end
