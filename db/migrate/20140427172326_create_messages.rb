class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :user
      t.references :chatroom
      t.string :content
      t.string :emotion, default: "happy"
      t.timestamps
    end
  end
end
