module UseCase
  class Phone

  	def initialize(phone, user, sessionID)
  		@redis = Redis.new
  		@phone, @user , @sessionID = phone, user, sessionID
  	end

  	def create
  		@persistedPhone = PersistentPhone.create!(:name => @phone[:name], :user => @user)
  	end

    def update
      @persistedPhone = PersistentPhone.find_by_id(@phone[:id])
      @persistedPhone[:name] = @phone[:name]
      @persistedPhone.save
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
      phone = phone_id_and_name
      phone[:facebookID] = @user[:facebookID]
      p '@@@@@@@@@@@@'
      p phone
      phone
    end

    def self.all
      phones = []
      PersistentPhone.select('id', 'name', 'user_id').to_a.each do |phone|
        facebookID = User.find_facebookID_by_id(phone[:user_id])
        phones << {:id => phone[:id], :name => phone[:name], :facebookID => facebookID}
      end
      phones
    end

    def phone_id_and_name
      p '@@@@@@@@@@@@@@'
      p @persistedPhone
      {:id => @persistedPhone[:id], :name => @persistedPhone[:name]}
    end

  end
end
