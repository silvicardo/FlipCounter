//Il contatore conta da 1 a 59 e poi ricomincia all'infinito


$(document).ready(function() {

  //oriento la direzione del flip degli elementi
   $('.number.left').flip({axis: 'x' });
   $('.number.right').flip({axis: 'x' });

   //posso monitorare lo status di flip tramite queste due var
   var flipLeft = $('.number.left').data("flip-model");
   var flipRight = $('.number.right').data("flip-model");

   //creo tre contatori
   //--> il main arriva a 60
   //--> il counter arriva a 10
   //--> tensCounter conta le decine
   var mainCounter = 0;
   var counter = 0;
   var tensCounter = 0;

   //faccio partire un timer infinito
  var clock = setInterval(function(){

      //puntatori JQuery
      var leftFrontNum = $('.number.left .front');
      var leftBackNum = $('.number.left .back');
      var rightFrontNum = $('.number.right .front');
      var rightBackNum = $('.number.right .back');

      //ad ogni giro incremento mainCounter e counter
      mainCounter++;
      counter++;

      console.log('counter' + counter);
      console.log('main ' + mainCounter);
      console.log('tensCounter ' + tensCounter);

      //TODO: logica gestione counters da migliorare

      //FINO a che non sei a 60
      if (mainCounter < 60 ) {//inferiore a 60

        //Ripeto dei conteggi fino a 10
        if (counter < 10) {

          //gestisco UI, i counter sono già incrementati
          if (flipRight.isFlipped){
              rightFrontNum.text(counter);
              rightBackNum.text('');
          } else {
            rightFrontNum.text('');
            rightBackNum.text(counter);
          }
        } else {//sono a 10
          //resetto counter a 0
          //e aumneto il tensCounter di uno
          counter = 0;
          tensCounter++;

          //gestisco UI
          rightFrontNum.text(counter);
          rightBackNum.text('');

          if (!flipLeft.isFlipped){
            leftFrontNum.text('');
            leftBackNum.text(tensCounter);
          } else {
            leftFrontNum.text(tensCounter);
            leftBackNum.text('');
          }
          //eseguo il flip della decina
          $('.number.left').flip('toggle');
        }
      } else {//SE SEI ARRIVATO A 60

        //azzero tutti i counter
        mainCounter = 0;
        counter = 0;
        tensCounter = 0;

        //gestisco la UI
        rightFrontNum.text('0');
        rightBackNum.text('');
        leftFrontNum.text(tensCounter);
        leftBackNum.text('');
        //eseguo il flip della decina
        $('.number.left').flip('toggle');
      }
      //eseguo sempre il flip del secondo
      $('.number.right').flip('toggle');
  }, 1000);




});
