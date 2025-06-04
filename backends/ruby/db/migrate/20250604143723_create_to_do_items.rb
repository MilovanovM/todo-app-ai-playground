class CreateToDoItems < ActiveRecord::Migration[7.1]
  def change
    create_table :to_do_items do |t|
      t.string :text

      t.timestamps
    end
  end
end
