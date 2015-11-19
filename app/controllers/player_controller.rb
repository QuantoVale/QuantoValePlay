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

     def show
       render json: Player.find(params[:id])
     end

      def getScorePlayer(id)
         @player =  Player.find(id);
         @player.read_attribute(:score);
      end




   private
     def visitor_params
       params.require(:player).permit(:name, :idFb, :score)
     end
   end
