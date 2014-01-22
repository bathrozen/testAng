class PersistentPhone < ActiveRecord::Base
    has_many :details, :dependent => :destroy
    belongs_to :user
  self.table_name = 'phones'

    def self.addPhone(phoneData, user)
      phoneObj = PersistentPhone.create(:name => phoneData['name'], :user => user)

      # if !phoneData['snippet'].nil?
        p Detail.create({:snippet => phoneData['snippet'], :persistent_phone_id => phoneObj[:id]})
      # end
      phoneObj
    end
end
