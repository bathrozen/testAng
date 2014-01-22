class ApplicationController < ActionController::Base

  before_filter :facebook_authen

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def facebook_authen
    return if signed_in?
    return if params['facebookID'].nil?

    unless user = User.find_by_facebookID(params['facebookID'])
      data = {:name => params['name'], :facebookID => params['facebookID']}
      user = User.create_from_fbData(data);
    end

    sign_in(user)
  end

  def jsonSuccess(data)
    render :json => {:status => 'success', :data => data}
  end

  def jsonFail(errors)
    render :json => {:status => 'fail', :messages => errors}
  end

end
