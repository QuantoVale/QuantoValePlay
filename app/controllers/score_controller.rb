class Score < ActionController::Base

 resposta = false;
 acertou = 0;
 score = 0;

  def calculation_score(id)

    if ( resposta  == true ){
				acertou++;
  		if ( acertou < 3 )
  			score += 50;
  	  elsif ( acertou < 6 )
  			score += 100;
  	  elsif ( acertou < 9)
  			score += 200;
  		else
  			score += 400;
	}

	else{
		acertou = 0;
		score += 0;
	}

  find.players

  end

end
