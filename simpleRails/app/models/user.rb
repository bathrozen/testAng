class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :phones, :dependent => :destroy

  def self.create_from_fbData(facebookData)
    User.create!(
      {
        :email => Digest::MD5.hexdigest(Time.new.to_s)+'@abc.kom',
        :password => 'test123test',
        :password_confirmation => 'test123test',
        :facebookID => facebookData[:facebookID]
      }
    )
  end

  def self.find_facebookID_by_id(id)
    self.fing_by_id(id)[:facebookID]
  end

end
