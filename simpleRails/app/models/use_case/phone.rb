module UseCase
  class Phone

  	def initialize(phone, user, sessionID)
  		@redis = Redis.new
  		@phone, @user , @sessionID = phone, user, sessionID
  	end

  	def create
  		@persistedPhone = PersistentPhone.create!(:name => @phone[:name], :user => @user)
      Detail.create({:snippet => @phone[:snippet], :persistent_phone_id => @persistedPhone[:id]})
      @persistedPhone
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

    def self.delete(id)
      @persistedPhone = PersistentPhone.find_by_id(id)
      @persistedPhone.delete
    end

    def phone_format
      {:id => @persistedPhone[:id],
        :name => @persistedPhone[:name],
        :facebookID => @user[:facebookID]}
    end

  end
end
