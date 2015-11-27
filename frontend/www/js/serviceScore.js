angular.module('Score', [])

.factory('ScoreURL', function($resource){
  return $resource("http://localhost:3000/contratos:id.json");
})

.factory('ScoreEntry', [function (){


var answer = 0;
var answerTrue = 0;
var score = 0;

  return{

    getTrue: function(){
       return answerTrue += 1;
    },
    resetTrue: function(){
       return answerTrue = 0;
    },
    getAnswer: function(){
      return answer += 1;
    },
    resetAnswer:function(){
      return answer = 0;
    },
    getAnswerTrue: function(){
      return answer += 0;
    },
    getBonus: function(){
      return score += 50;
    },
    getBonus2: function(){
      return score += 100;
    },
    getBonus4: function(){
      return score += 200;
    },
    getBonus8: function(){
      return score += 400;
    },
    getScore: function(){
      return score += 0;
    },
    resetScore: function(){
      return score = 0;
    }

  }


}])
