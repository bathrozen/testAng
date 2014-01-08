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
      phone = Phone.find_by_id(params[:id])
      phone['name'] = params['name']
      if result = phone.save
        @redis.publish('update-phone', phone.to_json)
        render :json => {:status => 'success'}
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
      persistedPhone = Phone.addPhone(params)
      @redis.publish('new-phone', persistedPhone.to_json)
      render :json => {:status => 'success'}
    end

    def destroy
      phone = Phone.find_by_id(params[:id])
      @redis.publish('delete-phone', phone.to_json)
      phone.destroy
      render :json => {:status => 'success'}
    end

  end
end
