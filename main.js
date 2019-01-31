//Il contatore conta da 1 a 59 e poi ricomincia all'infinito


$(document).ready(function() {

  var secondsToReach = 60;

  //oriento la direzione del flip degli elementi
   $('.number.left').flip({ axis: 'x' });
   $('.number.right').flip({ axis: 'x' });

   //creo tre contatori
   //--> il main arriva a 60
   //--> il counter arriva a 10
   //--> tensCounter conta le decine
   var mainCounter = 0;
   var counter = 0;
   var tensCounter = 0;

   //faccio partire un timer infinito
  var clock = setInterval(function(){

      //AD OGNI SECONDO incremento mainCounter e counter
      mainCounter++;
      counter++;

      /*** ---------> FUNZIONI A SUPPORTO ***/

      //Definiamo le funzioni interne in base che:

      //1. siamo in una normale iterazione(1..59)
      var upToMainCounterLimitOperations = function () {
        //GESTIAMO IL CONTEGGIO DA 1 A 10
        if (counter === 10) {

          //resetto il conto da 1 a 10
          counter = 0;
          tensCounter++;

          //gestisco numero decine
          updateVisibleNumber('left', tensCounter);

        }

        //gestisco numero secondi  ad ogni iterazione da 1 a 10
        updateVisibleNumber('right', counter);
      };

      //2. abbiamo raggiunto il limite del conteggio (60)
      var mainCounterLimitReachedOperations = function (){
        //azzero tutti i counter
        mainCounter = 0;
        counter = 0;
        tensCounter = 0;

        //gestisco entrambi numeri, si riparte da zero
        updateVisibleNumber('left', tensCounter);
        updateVisibleNumber('right', counter);
      };

      //ognuno di esse richiama la seguente funzione per aggiornare numero ed
      //eseguire la flipAnimation
      function updateVisibleNumber(numbersSide , counterValue) {

        //puntatori JQuery + oggettoFlip
        var frontNum = $('.number.' + numbersSide + ' .front');
        var backNum = $('.number.' + numbersSide + ' .back');
        var flipObj = $('.number.'+ numbersSide).data("flip-model");

        //gestione contenuto (numero) facce(front - back)
        if (flipObj.isFlipped){
            frontNum.text(counterValue);
            backNum.text('');
        } else {
          frontNum.text('');
          backNum.text(counterValue);
        }

        //animazione flip effettiva su lato richiesto
        $('.number.'+ numbersSide).flip('toggle');
      }

      //*** ---> DEFINIZIONE ED ESECUZIONE OPERAZIONE AD OGNI ITERAZIONE ***/

      //L'operazione corrente risponderà al valore del mainCounter rispetto al limite
      var iterationOp = (mainCounter < secondsToReach ) ? upToMainCounterLimitOperations : mainCounterLimitReachedOperations;

      //eseguo l'operazione
      iterationOp();

  }, 1000);

});
