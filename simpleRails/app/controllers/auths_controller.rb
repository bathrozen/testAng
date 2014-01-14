class AuthsController < ApplicationController

  skip_before_filter :facebook_authen

  def index
    p 'THIS IS AUTH'
  end

end