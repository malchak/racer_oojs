class CreatePlayersTable < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :username
      t.string :img_url
    end
    add_index(:players, :username, :unique => true)
  end
end
