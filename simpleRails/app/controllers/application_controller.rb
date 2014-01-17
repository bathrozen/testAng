class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  before_filter :facebook_authen

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

#   def after_authen
# #    sign_in @user
#     render :file => File.join(Rails.root, 'public_2', 'index.html'), :layout => nil
#   end

  def facebook_authen
    if !params['fID'].nil?
      if user = User.find_by_fID(params['fID'])
        p 'user is exist'
        user
      else
        p 'create_by_fbData'
        data = {:name => params['name'], :fID => params['fID']}
        @user = User.create_from_fbData(data);
      end
      after_authen

      # render :json => {:status => 'success', :data => '555555kak'}
    else
      render :file => File.join(Rails.root, 'public', 'auth.html'), :layout => nil
    end
  end

end
