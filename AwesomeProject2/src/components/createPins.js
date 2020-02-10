var numbers=[];
export default  pinNumbersGenerateArray = (numberOfPins) => {
  numbers=[];
    for(i=0;i<numberOfPins;i++){
      createRandomNumberWithFourDigit(numberOfPins);
    }
    return numbers;
}

function createRandomNumberWithFourDigit(numberOfPins) {

   var number= shufflePinNumbers( "0123456789".split('') ).join('').substring(0,4);
   if(checkSequenceOfDigits(number)==true){
   createRandomNumberWithFourDigit();
   }else{
   numbers.push(number);
   if(numberOfPins==numbers.length){
   return numbers;
   }
   }
}
//
function shufflePinNumbers(number) {
   for(var j, x, i = number.length; i; j = Math.floor(Math.random() * i), x = number[--i], number[i] = number[j], number[j] = x);
   return number;
}
//Check the nunber according to bussiness requirement
function checkSequenceOfDigits(number) {
 var arr_number = ('' + number).split('');
 for (var i = 0; i < arr_number.length - 1; i++) {
 if (((parseInt(arr_number[i]) >= parseInt(arr_number[i + 1])) &&
    ((parseInt(arr_number[i+1]) >= parseInt(arr_number[i + 2])))) ||
    ((parseInt(arr_number[i]) <= parseInt(arr_number[i + 1])) &&((parseInt(arr_number[i+1]) <= parseInt(arr_number[i + 2]))))
    || (parseInt(arr_number[i]) == parseInt(arr_number[i + 1])))
    return true;
  }
    return false;
}
