class Admin::DashboardsController < ApplicationController
    layout 'admin'
    berore_action :authenticate_admin!
    def index
        @users = User.all
    end
end
