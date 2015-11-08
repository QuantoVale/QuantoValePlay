class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.integer :idFb
      t.integer :score

      t.timestamps
    end
  end
end
