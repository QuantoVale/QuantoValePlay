class PlayerController < ApplicationController
  protect_from_forgery with: :null_session
  respond_to :json

     def index
       respond_to do |format|
         format.json { render json: Player.all }
         format.html
       end
     end
     #Método POST
     def create
       respond_with Player.create(visitor_params)
     end
     #Método Delete
     def destroy
       respond_with Player.destroy(params[:id])
     end

   private
     def visitor_params
       params.require(:player).permit(:name, :idFb, :score)
     end
   end
