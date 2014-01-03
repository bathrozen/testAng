class PhonesController < ApplicationController
  before_filter :authenticate_user!

  def index
    render :file => File.join(Rails.root, 'public', 'index.html'), :layout => nil
  end

end
