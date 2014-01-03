SimpleRails::Application.routes.draw do

  devise_for :users
  get '/phones(/*rest)' => 'phones#index'

  resources :phones
  resource :auth, :only => [:new, :create]

  namespace :api do
    resources :phones
    resources :details
  end

  root :to => 'phones#index'

end
