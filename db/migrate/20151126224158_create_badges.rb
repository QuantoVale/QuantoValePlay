class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
    t.belongs_to :type_badge, index: true    
      t.timestamps
    end
  end
end
