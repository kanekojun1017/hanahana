class Public::SessionsController < Devise::SessionsController
  before_action :configure_permitted_parameters, if: :devise_controller?  

  def after_sign_in_path_for(resource)
    user_path(resource)
  end
    
  def after_sign_out_path_for(resource)
    root_path
  end
    
  def guest_sign_in
    user = User.guest
    sign_in user
    redirect_to root_path
  end
    
  def destroy
    super
  end
    
  protected
    
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email])
  end
end