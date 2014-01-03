require 'omniauth'

class AuthsController < ApplicationController

  def initialize
    client_id = "client_id"
    client_secret = "client_secret"
    client_url = 'app_url'
    client_redirect_url = 'redirect_uri'

    client = OAuth2::Client.new(client_id, client_secret, :token_url => '/auth/facebook', :site =>'https://facebook.com')

    token_request = client.auth_code.get_token('authorization_code_value', :redirect_uri => 'http://localhost:3000/auth/callback')
    token_request.options[:header_format] = "OAuth %s"
    token_string = token_request.token
  end

  def new
    render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
  end

  def create
    render :file => File.join(Rails.root, 'public', 'index.html'), :layout => nil
  end

end

    # client = OAuth2::Client.new('client_id', 'client_secret', :site => 'https://facebook.com')
    # p '------------------------'
    # p client
    # client.auth_code.authorize_url(:redirect_uri => 'http://localhost:3000/auth/callback')
    # p 'OOOOOOOOOOOOOOOOOO'
    # p client
    # token = client.auth_code.get_token('authorization_code_value', :redirect_uri => 'http://localhost:3000/auth/callback', :headers => {'Authorization' => 'Basic some_password'})
    # p token
    # response = token.get('/api/resource', :params => { 'query_foo' => 'bar' })
    # p response.class.name