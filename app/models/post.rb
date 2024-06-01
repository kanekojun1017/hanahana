class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments, dependent: :destroy
    
    validates :image, presence: true
    validates :body, presence: true
    validates :address, presence: true
    
    geocoded_by :address
    after_validation :geocode
   
    def get_image(width, height)
        image.variant(resize_to_limit: [width, height]).processed
    end
end