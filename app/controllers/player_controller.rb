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
       if (verifyIdPlayer(params[:idFb]) == 1)
        respond_with Player.create(visitor_params)
      else
        puts "<<<<<<<"
      end
     end
     #Método Delete
     def destroy
       respond_with Player.destroy(params[:id])
     end

     def show
       render json: Player.find(params[:id])
     end

     def ordinationRanking
         @ranking = Player.all
         @ranking.sort {|a,b| b.score <=> a.score}
         render json: @ranking
     end

     def insertScore
         #Selecionando qual player deve ser atualizado
         @player = Player.find_by_idFb(params[:idFb])
         #Pegando o score atual do player
         scorePlayer = getScorePlayer(params[:idFb])
         #Pegando o valor do Score passado para ser adicionado ao player
         acertos = params[:score]
         score = calcRecompensa(params[:score])
         #Somando o score atual do player ao valor ganho durante a partida
         scoreNew = score.to_i + scorePlayer.to_i
         #Setando o valor do novo score no Player
         @player.update_attribute(:score,scoreNew)
         #Redirecionando o Player mostrando a atualização
         render json:@player
     end

      def getScorePlayer(idFb)
         @player =  Player.find_by_idFb(idFb)
         @player.read_attribute(:score)
      end

      def calcRecompensa(totalAcertos)
        score  = 0;
       for i in 1..(totalAcertos.to_i)
          if (i < 3)
             score += 50;
           elsif (i >= 3 && i < 6)
              score += 100;
           elsif (i >= 6 && i < 9)
             score += 200;
           else
            score += 400;
           end
        end

        return @scoreTotal = score

     end

     def verifyIdPlayer (idFb)

       player = Player.where("idFb = ? ", params[idFb])

       if ( player.empty? )
         return 1;
       else
         return 0;
       end

    end

   private
     def visitor_params
       params.require(:player).permit(:name, :idFb, :score)
     end
   end
