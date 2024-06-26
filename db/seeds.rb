# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Admin.create(
  email: 'admin@example.com',
  encrypted_password: 'kaneko',
  reset_password_token: nil,
  reset_password_sent_at: nil,
  remember_created_at: nil,
  created_at: Time.current,
  updated_at: Time.current
)