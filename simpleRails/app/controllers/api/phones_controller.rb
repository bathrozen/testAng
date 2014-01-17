require 'redis'

module Api
  class PhonesController < ApplicationController

    skip_before_filter :verify_authenticity_token

    def initialize
      @redis = Redis.new
    end

    def index
      render :json => {:status => 'success', :data => Phone.all}
    end

    def update
      persistedPhone = Phone.find_by_id(params[:id])
      persistedPhone['name'] = params['phone']['name']
      if result = persistedPhone.save
        phone = attrFilter(persistedPhone, params['sessionID'])
        @redis.publish('update-phone', phone.to_json)
        render :json => {:status => 'success', :data => phone}
      else
        render :json => {:status => 'fail', :error => result.errors}
      end
    end

    def show
      phone = Phone.find_by_id(params[:id])

      if phone.nil?
        result = {:status => 'fail'}
      else
        result = {:status => 'success', :data => phone.details}
      end

      render :json => result
    end

    def create
      p 'Userrrrrrrrrrrrrrrrrrrrrrrr'
      p current_user
      p 'endddddddddddddddd'
      newPhone = params['phone'];
      newPhone[:user_id] = @user
      persistedPhone = Phone.addPhone(params['phone'])
      phone = attrFilter(persistedPhone, params['sessionID'])
      @redis.publish('new-phone', phone.to_json)
      render :json => {:status => 'success', :data => phone}
    end

    def destroy
      persistedPhone = Phone.find_by_id(params[:id])
      phone = attrFilter(persistedPhone, params['sessionID'])
      @redis.publish('delete-phone', phone.to_json)
      persistedPhone.destroy
      render :json => {:status => 'success', :data => phone}
    end

private

    def attrFilter(persistence, sessionID)
       {:id => persistence['id'], :name => persistence['name'], :sessionID => sessionID}
    end

  end
end
