class Phone < ActiveRecord::Base
    has_many :details, :dependent => :destroy
    belongs_to :user

    def self.addPhone(phoneData)
      phoneObj = Phone.create({:name => phoneData['name']})
      if !phoneData['snippet'].nil?
        Detail.create({:snippet => phoneData['snippet'], :phone => phoneObj})
      end
      phoneObj
    end

end
