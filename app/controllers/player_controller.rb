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

     def insertScore
     #Selecionando qual player deve ser atualizado
     @player =  Player.find(params[:id])
     #Pegando o score atual do player
     scorePlayer = getScorePlayer(params[:id]);
     #Pegando o valor do Score passado para ser adicionado ao player
     acertos = params[:score];
     score = calcRecompensa(params[:score]);
     #Somando o score atual do player ao valor ganho durante a partida
     scoreNew = score.to_i + scorePlayer.to_i;
     #Setando o valor do novo score no Player
     @player.update_attribute(:score,scoreNew);
     #Redirecionando o Player mostrando a atualização
     render json:@player
   end

      def getScorePlayer(id)
         @player =  Player.find(id);
         @player.read_attribute(:score);
      end

      def calcRecompensa(totalAcertos)

       for i in 1..(totalAcertos.to_i)

          puts(i);

          if (i < 3)
             return @scoreTotal = 50;
           elsif (i >= 3 && i < 6)
             return @scoreTotal = 100;
           elsif (i >= 6 && i < 9)
             return @scoreTotal = 200;
           else
             return @scoreTotal = 400;
           end

       end

     end


   private
     def visitor_params
       params.require(:player).permit(:name, :idFb, :score)
     end
   end
