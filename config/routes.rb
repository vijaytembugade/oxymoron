# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root "home#index"
  constraints(lambda { |req| req.format == :json }) do
    resources :tasks, except: %i[new edit], param: :slug, defaults: { format: 'json' }
    resources :users, only: %i[index create]
    resources :sessions, only: %i[create]
  end
  # defaults format: :json do 
  #   resources :tasks, except: %i[new edit], param: :slug, defaults: { format: 'json' }
  #   get 'users', to: 'users#index'
  #   post 'users', to: 'users#create'
  # end

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
