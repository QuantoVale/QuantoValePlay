angular.module('Score', [])

.factory('ScoreURL', function($resource){
  return $resource("http://localhost:3000/contratos:id.json");
})

.factory('ScoreEntry', [function (){

var score = 0;
var answer = 0;
var bonus = 0;

  return{
     getScore: function(){
        return score += 50;
    },
    resetScore: function(){
       return score += 0;

    },
    getTrue: function(){
       return answer += 1;
    },
    getFalse: function(){
       return answer -= 4;
    },
    getAnswer: function(){
      return answer += 0;
    },
    getBonus: function(){
      return bonus += 2*score;
    }
  }


}])
