angular.module('Score', [])

.factory('ScoreURL', function($resource){
  return $resource("http://localhost:3000/contratos:id.json");
})

.factory('ScoreEntry', [function (){


var answer = 0;
var answerTrue = 0;

  return{

    getTrue: function(){
       return answerTrue += 1;
    },
    resetTrue: function(){
       return answerTrue = 0;
    },
    getAnswer: function(){
      return answer += 1;
    }

  }


}])
