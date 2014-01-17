class ApplicationController < ActionController::Base

  before_filter :facebook_authen unless :signed_in?

  # skip_before_filter :facebook_authen if sign_in?

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def facebook_authen
    return if params['fID'].nil?

    unless user = User.find_by_fID(params['fID'])
      data = {:name => params['name'], :fID => params['fID']}
      user = User.create_from_fbData(data);
    end

    sign_in(user)
  end

end
