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
  		@redis.publish(message, redisData)
  	end

  	def redisData
  		{ :facebookID => @user[:facebookID],
  		  :phone => @phone,
  		  :sessionID => @sessionID
  		}.to_json
  	end

    def returnedData
      { :facebookID => @user[:facebookID],
        :phone => @phone
      }.to_json
    end

    def self.all(user)
      phones = []
      PersistentPhone.all.each do |phone|
        p 'phoneee'
        p phone
      end

    end

  end
end
