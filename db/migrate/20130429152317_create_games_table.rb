class CreateGamesTable < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner
      t.string :game_time
      t.integer :board_length
      t.timestamps
    end
  end
end
