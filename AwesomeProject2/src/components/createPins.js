var numbers=[];
export default  numberGenerate = (numberOfPins) => {
  numbers=[];
    for(i=0;i<numberOfPins;i++){
     random4Digit(numberOfPins);
    }
    return numbers;
}
function random4Digit(numberOfPins){
    var number= shuffle( "0123456789".split('') ).join('').substring(0,4);
   if(checkSequence(number)==true){
    random4Digit();
   }else{
   numbers.push(number);
   if(numberOfPins==numbers.length){
     console.log("DevRishav",numbers);
    return numbers;
   }
   }
}
function shuffle(o){
for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
   return o;
}
function checkSequence  (num) {
 var arr_num = ('' + num).split('');
 for (var i = 0; i < arr_num.length - 1; i++) {
 if (((parseInt(arr_num[i]) >= parseInt(arr_num[i + 1])) &&
    ((parseInt(arr_num[i+1]) >= parseInt(arr_num[i + 2])))) ||
    ((parseInt(arr_num[i]) <= parseInt(arr_num[i + 1])) &&((parseInt(arr_num[i+1]) <= parseInt(arr_num[i + 2]))))
    || (parseInt(arr_num[i]) == parseInt(arr_num[i + 1])))
    return true;
  }
    return false;
}
