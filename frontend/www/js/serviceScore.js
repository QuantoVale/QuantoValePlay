angular.module('Score', [])


.factory('ScoreURL', function($resource)
{
  return $resource("http://localhost:3000/contratos:id.json");
})

.factory('ScoreEntry', [function (){

var score = 0;

  return{

    getScore: function(){
      return score +=50;
    }



  }
}])
