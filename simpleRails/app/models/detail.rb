class Detail < ActiveRecord::Base
  belongs_to :phone

  def self.addDetail(detailData)
    Detail.create({:snippet => detailData['snippet'], :phone_id => detailData['phone_id']})
  end

end
