class Post < ApplicationRecord
    has_one_attached :image
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :favorites, dependent: :destroy
    
    validates :image, presence: true
    validates :body, presence: true
    validates :address, presence: true
    
    geocoded_by :address
    after_validation :geocode
   
    def get_image(width, height)
        image.variant(resize_to_limit: [width, height]).processed
    end
    
    def favorited_by?(user)
        favorites.where(user_id: user.id).exists?
    end
    
    def self.search_for(content, method)
        if method == 'perfect'
          Post.where(body: content)
        elsif method == 'partial'
          Post.where('body LIKE?', '%' + content )
        end
    end
end