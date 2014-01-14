class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  before_filter :findUser

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fbAuthen(user)
    if user
      render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
    end
  end

  def findUser
    if !(user = User.find_by_fID(params['fID']))
      User.create_by_fID(params['fID']);
    else
      user
    end
  end

end
