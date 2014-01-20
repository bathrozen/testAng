module UseCase
  class Phone

  	def initialize(phone, user, sessionID)
  		@redis = Redis.new
  		@phone, @user , @sessionID = phone, user, sessionID
  	end

  	def save
  		PersistentPhone.create!(:name => @phone[:name], :user => @user)
  	end

  	def toRedis(message)
      p 'redisDataaaaaaaaaaa'
      p redisData
  		@redis.publish(message, redisData)
  	end

  	def redisData
  		{ :facebookID => @user[:facebookID],
  		  :phone => @phoneData,
  		  :sessionID => @sessionID
  		}.to_json
  	end

    def returnedData
      { :facebookID => @user[:facebookID],
        :phone => @phoneData
      }.to_json
    end

  end
end
