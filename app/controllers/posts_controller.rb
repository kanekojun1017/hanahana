class PostsController < ApplicationController
  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    
    result = Geocoder.search(@post.address).first
    if result
      @post.latitude = result.latitude
      @post.longitude = result.longitude
    end
    @post.save
    redirect_to posts_path
  end
  def index
    respond_to do |format|
      format.html do
        @posts = Post.page(params[:page])
      end
      format.json do
        @posts = Post.all
      end
    end
  end
  
  def show
    @post = Post.find(params[:id])
    @post_comment = Comment.new
    puts "経度: #{@post.longitude}, 緯度: #{@post.latitude}"
  end

  def edit
    @post = Post.find(params[:id])
    if @post.user == current_user
      render "edit"
    else
      redirect_to posts_path
    end
  end
  
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      flash[:notice] = '更新しました'
      redirect_to post_path(@post.id)
    else
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to posts_path
  end
  
  private
  
  def post_params
    params.require(:post).permit(:body, :image, :address)
  end
end
