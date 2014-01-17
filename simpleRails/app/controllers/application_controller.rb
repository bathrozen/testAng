class ApplicationController < ActionController::Base

  before_filter :facebook_authen

  cattr_accessor :user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def facebook_authen
    if !params['fID'].nil?
      if user = User.find_by_fID(params['fID'])
        p 'user is exist'
        user
      else
        p 'create_by_fbData'
        data = {:name => params['name'], :fID => params['fID']}
        user = User.create_from_fbData(data);
      end
    end
  end

end
