class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  before_filter :findUser

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fbAuthen(user)
    if user
      p 'no user222222222222222222'
      render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
    end
  end

  def findUser
    p 'find userrrrrrrrrrrr'
    if !(user = User.find_by_fID(params['fID']))
      p 'create_by_fIDDDDDDDDDDDDDDDDDD'
      User.create_by_fID(params['fID']);
    else
      p 'user existtttttttttttttttt'
      user
    end
  end

end
