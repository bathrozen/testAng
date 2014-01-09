class PhonesController < ApplicationController

  def index
    render :file => File.join(Rails.root, 'public_2', 'index.html'), :layout => nil
  end

end
