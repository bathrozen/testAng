module UseCase
  class Phone

  	def initialize(phone, user, sessionID)
  		@redis = Redis.new
  		@phone, @user , @sessionID = phone, user, sessionID
  	end

  	def save
  		@persistedPhone = PersistentPhone.create!(:name => @phone[:name], :user => @user)
  	end

  	def toRedis(message)
  		@redis.publish(message, redisData)
  	end

  	def redisData
  		{ :facebookID => @user[:facebookID],
  		  :phone => phone_id_and_name,
  		  :sessionID => @sessionID
  		}.to_json
  	end

    def returnedData
      { :facebookID => @user[:facebookID],
        :phone => phone_id_and_name
      }
    end

    def self.all
      phones = []
      PersistentPhone.select('id', 'name', 'user_id').to_a.each do |phone|
        facebookID = User.find_facebookID_by_id(phone[:user_id])
        phones << {:facebookID => facebookID,
          :phone => {:id => phone[:id], :name => phone[:name]}}
      end
      phones
    end

    def phone_id_and_name
      {:id => @persistedPhone[:id], :name => @persistedPhone[:name]}
    end

  end
end
