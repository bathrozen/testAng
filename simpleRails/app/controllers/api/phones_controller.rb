module Api
  class PhonesController < ApplicationController

    skip_before_filter :verify_authenticity_token

    def index
      render :json => {:status => 'success', :data => UseCase::Phone.all}
    end

    def update
      phone = UseCase::Phone.new(params[:phone], current_user, params[:sessionID])
      if result = phone.update
        jsonSuccess(phone.returnedData)
        phone.toRedis('update-phone')
      else
        jsonFail(result.errors.full_messages)
      end
    end

    def show
      phone = PersistentPhone.find_by_id(params[:id])

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
      phone = UseCase::Phone.new(params[:phone], current_user, params[:sessionID])
      if result = phone.delete
        jsonSuccess(phone.returnedData)
        phone.toRedis('delete-phone')
      else
        jsonFail(result.errors.full_messages)
      end
    end

private

    def attrFilter(persistence, sessionID)
       {:id => persistence['id'],
        :name => persistence['name'],
        :sessionID => sessionID}
    end

  end
end
