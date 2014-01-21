class PersistentPhone < ActiveRecord::Base
    has_many :details, :dependent => :destroy
    # has_one :facebookID, :through => :user
    has_many :facebookID, :through => :user, :source => :phone
    belongs_to :user
  self.table_name = 'phones'

    def self.addPhone(phoneData, user)
      phoneObj = PersistentPhone.create(:name => phoneData['name'], :user => user)
      if !phoneData['snippet'].nil?
        Detail.create({:snippet => phoneData['snippet'], :phone => phoneObj})
      end
      phoneObj
    end

end
