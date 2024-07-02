# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
admin = Admin.find_or_create_by!(email: 'admin@example.com') do |admin|
  admin.encrypted_password = 'kaneko'  # 適切なパスワードのハッシュ値に置き換えてください
  admin.reset_password_token = nil
  admin.reset_password_sent_at = nil
  admin.remember_created_at = nil
  admin.created_at = Time.current
  admin.updated_at = Time.current
end