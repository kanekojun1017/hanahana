class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments, dependent: :destroy
    
    validates :address, presence: true
    
    geocoded_by :address
    after_validation :geocode
end