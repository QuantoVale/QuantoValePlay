class CreateBadgesPlayers < ActiveRecord::Migration
  def change
    create_table :badges_players, id: false do |t|
        t.belongs_to :badge,index:true
        t.belongs_to :player,index:true
    end
  end
end
