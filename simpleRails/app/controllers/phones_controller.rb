class PhonesController < ApplicationController

  def index
    render :file => File.join(Rails.root, 'public', 'index.html'), :layout => nil
  end

end
