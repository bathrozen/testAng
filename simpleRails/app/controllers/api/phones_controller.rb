module Api
  class PhonesController < ApplicationController

    skip_before_filter :verify_authenticity_token

    def index
      render :json => {:status => 'success', :data => UseCase::Phone.all}
    end

    def update
      p 'paramsssssssssssssssss'
      p params
      phone = UseCase::Phone.new(params[:phone], current_user, params[:sessionID])
      if result = phone.update
        jsonSuccess(phone.returnedData)
        phone.toRedis('edit-phone')
      else
        jsonFail(result.errors.full_messages)
      end

      # persistedPhone = Phone.find_by_id(params[:id])
      # persistedPhone['name'] = params['phone']['name']
      # if result = persistedPhone.save
      #   phone = attrFilter(persistedPhone, params['sessionID'])
      #   @redis.publish('update-phone', phone.to_json)
      #   render :json => {:status => 'success', :data => phone}
      # else
      #   render :json => {:status => 'fail', :error => result.errors}
      # end
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
      phone = UseCase::Phone.new(params[:phone], current_user, params[:sessionID])

      if result = phone.create
        jsonSuccess(phone.returnedData)
        phone.toRedis('new-phone')
      else
        jsonFail(result.errors.full_messages)
      end
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
       {:id => persistence['id'],
        :name => persistence['name'],
        :sessionID => sessionID}
    end

  end
end
