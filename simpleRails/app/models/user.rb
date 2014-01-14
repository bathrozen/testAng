class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :phones, :dependent => :destroy

  def self.create_from_fID(fID)
    @fID = fID
    User.create!(User.stuff)
  end

  def self.stuff
    {:email => email,
      :password => 'test123test',
      :password_confirmation => 'test123test',
      :fID => @fID}
  end

  def self.email
    Digest::MD5.hexdigest(Time.new.to_s)+'@abc.kom'
  end

end
