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
  		{ :phone => phone_format,
  		  :sessionID => @sessionID
  		}.to_json
  	end

    def returnedData
      phone_format
    end

    def self.all
      phones = []
      PersistentPhone.select('id', 'name', 'user_id').to_a.each do |phone|
        facebookID = User.find_facebookID_by_id(phone[:user_id])
        phones << {:id => phone[:id], :name => phone[:name], :facebookID => facebookID}
      end
      phones
    end

    def delete(phone, sessionID)
      @persistedPhone = PersistentPhone.find_by_id(@phone[:id])
      @persistedPhone.delete
    end

    def phone_id_and_name
      {:id => @persistedPhone[:id], :name => @persistedPhone[:name]}
    end

    def phone_format
      {:id => @persistedPhone[:id], :name => @persistedPhone[:name], :facebookID => @user[:facebookID]}
    end

  end
end
