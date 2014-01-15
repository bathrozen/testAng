require 'redis'

module Api
  class DetailsController < ApplicationController

    skip_before_filter :verify_authenticity_token

    def initialize
      @redis = Redis.new
    end

    def create
      persistedDetail = Detail.addDetail(params['detail'])
      @redis.publish('new-detail', persistedDetail.to_json)
      render :json => {:status => 'success'}
    end

    def destroy
      # render :json => {:status => 'success'}
    end

  end
end
