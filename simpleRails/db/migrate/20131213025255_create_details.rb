class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.string :snippet
      t.references :persistent_phone
      t.timestamps
    end
  end
end
