class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  before_filter :fbAuthen

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fbAuthen
    render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
  end

end
