class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  before_filter :findUser

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def fbAuthen(user)
    if params['FID']
      p 'no user'
      # render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
    else
      sign_in find_user
    end
  end

  def find_user
    if !(user = User.find_by_fID(params['fID']))
      p 'create_by_fID'
      User.create_from_fID(user_data);
    else
      p 'user is exist'
      user
    end
  end

end
