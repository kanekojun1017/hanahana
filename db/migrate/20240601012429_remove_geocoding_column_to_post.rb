class RemoveGeocodingColumnToPost < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :address, :string, null: false, default: ""
    remove_column :posts, :latitude, :float, null: false, default: 0
    remove_column :posts, :longitude, :float, null: false, default: 0
  end
end
