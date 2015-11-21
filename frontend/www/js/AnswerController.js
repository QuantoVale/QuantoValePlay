MyApp.controller('Answer', function($scope, ScoreEntry, ValuesService, $ionicPopup, $state, $ionicModal, $ionicSideMenuDelegate) {
    var total = 1; var score = 0; var answer = 0;

    $scope.matchStart = function(){
      score = ScoreEntry.resetScore();
      console.log("Pontuação resetada");
    }
      console.log(score);

    $scope.end = function(){
        if (total == 9){
          $state.go('endgame.endgame');
          console.log("Fim da rodada");
      }else
        console.log("Questões restantes = "+(total));
    }
    $scope.compare = function(x, y, id) {
        var size = document.getElementsByTagName('span').length;


        if (x === y) {
            document.getElementsByTagName('span')[id].style.backgroundColor = "#33cd5f";
            document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #28a54c";

            answer++;

            console.log("Acertou = "+answer);
            console.log(total);
            document.getElementsByTagName('result')[0].innerHTML = score;
            document.getElementsByTagName('question')[0].innerHTML = bonus;
            $scope.certa = function(){
                return true;
            }

          } else {

            document.getElementsByTagName('span')[id].style.boxShadow = "0 8px 0 #e42012";
            document.getElementsByTagName('span')[id].style.backgroundColor = "#ef473a";

            if ( answer > 0 ){

              answer = 0;
            }


            console.log(total);
            document.getElementsByTagName('result')[0].innerHTML = score;
            document.getElementsByTagName('question')[0].innerHTML = 0;
            $scope.certa = function(){
                return false;
            }
        }

        var size = document.getElementsByTagName('li').length;
        for(var i=0;i<size;i++){
            document.getElementsByTagName('li')[i].style.pointerEvents = "none";
        }
    };

    $scope.score = function(){
      var score;
      score = ScoreEntry.getBonusTotal();
      document.getElementsByTagName('score')[0].innerHTML = score;
    };

    $scope.clean = function() {
        var size = document.getElementsByTagName('span').length;
        for(var i=0;i<size;i++){
            document.getElementsByTagName('span')[i].style.backgroundColor = "#1E90FF";
            document.getElementsByTagName('span')[i].style.boxShadow = "0 8px 0 #4169E1";
        }
        var size = document.getElementsByTagName('li').length;
        for(var i=0;i<size;i++){
            document.getElementsByTagName('li')[i].style.pointerEvents = "auto";
        }
        document.getElementsByTagName('result')[0].innerHTML = ' ';
    }


      $ionicModal.fromTemplateUrl('templates/answered.html', function($ionicModal) {
          $scope.modal = $ionicModal;
          console.log($scope.modal);
      }, {
          scope: $scope,
          animation: 'slide-in-up',
          backdropClickToClose: false,
          hardwareBackButtonClose: false,
          focusFirstInput: true
    });

      $scope.openModal = function() {
          $scope.modal.show();
      };
      $scope.closeModal = function() {
          $scope.modal.hide();
      };
      $scope.encerrar = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Fim da partida',
          template: 'Deseja realmente encerrar a partida?'
      });


      confirmPopup.then(function(res){

        if(res){
          $state.go('endgame.endgame');
          console.log('Encerrar');
        }
        else
        console.log('Cancelar encerramento');
      })
    }

    $scope.pular = function(){
        document.getElementsByTagName('result')[0].innerHTML = ' ';
    }

    ValuesService.buttonPress().then(function(response) {
        console.log(ValuesService.getPreviousId);
        console.log(response.data);
        $scope.values = response.data;
    })

    $scope.jump = function(){
       ValuesService.buttonPress().then(function(response) {
            console.log(ValuesService.getPreviousId);
            console.log(response.data);
            $scope.values = response.data;
        })
    }
})
