angular.module('Score', [])

.factory('ScoreURL', function($resource){
  return $resource("http://localhost:3000/contratos:id.json");
})

.factory('PlayerData',
    function($resource){
        return $resource("player/:id",{ id: '@id'}, {
            index: {
                method: 'GET',
                isArray: true,
                rensponseType: 'json'
            },
            update: {
                method: 'POST',
                rensponseType: 'json'
            }
        });
    })

.factory('ScoreEntry', [function (){

var score = 0;
var answer = 0;
var bonus = 0;
var total = 0;

  return{
     getScore: function(){
        return score += 50;
    },
    falseScore: function(){
       return score += 0;
    },
    resetScore: function(){
       return score = 0;
    },
    getTrue: function(){
       return answer += 1;
    },
    getFalse: function(){
       return answer = 0;
    },
    getTotalAnswer(){
      return total += 1;
    },
    resetTotalAnswer(){
      return total = 0;
    },
    getBonus3: function(){
      return bonus = 100;
    },
    getBonus6: function(){
      return bonus = 200;
    },
    getBonus9: function(){
      return bonus = 400;
    },
    getBonusTotal: function(){
      return score = bonus + score;
    },

  }


}])
