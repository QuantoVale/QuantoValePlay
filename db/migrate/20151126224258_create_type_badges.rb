class CreateTypeBadges < ActiveRecord::Migration
  def change
    create_table :type_badges do |t|

      t.timestamps
    end
  end
end
