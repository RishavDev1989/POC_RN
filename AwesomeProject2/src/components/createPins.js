var pinsList = [];
/*This function creates the pinsList(numberOfPins) of PINs value  add to the array */
export default pinNumbersGenerateArray = numberOfPins => {
  pinsList = [];
  for (i = 0; i < numberOfPins; i++) {
    createRandomNumberWithFourDigit(numberOfPins);
  }
  return pinsList;
};
/* This function creates the PIN of 4 digit */
function createRandomNumberWithFourDigit(numberOfPins) {
  var fourDigitPin = Math.floor(1000 + Math.random() * 9000);
  if (checkSequenceOfDigits(fourDigitPin) == true) {
    createRandomNumberWithFourDigit();
  } else {
    pinsList.push(fourDigitPin);
    if (numberOfPins == pinsList.length) {
      return pinsList;
    }
  }
}

/*
This function Check the PIN value aacording the below bussiness requirement by breaking the PIN String in to character and save in array 
 1.  A PIN Cannot contain 3 or more consecutive ascending or descending digits.
         Eg 1235 or 5431 woud be a invalid output.
 2.  A PIN Cannot have 2 consecutive digits to be same.
         Eg 1135 or   3511  woud be a invalid output
 
*/
function checkSequenceOfDigits(PIN) {
  var numberArray = ('' + PIN).split('');
  for (var i = 0; i < numberArray.length - 1; i++) {
    if (
      (parseInt(numberArray[i]) >= parseInt(numberArray[i + 1]) &&
        parseInt(numberArray[i + 1]) >= parseInt(numberArray[i + 2])) ||
      (parseInt(numberArray[i]) <= parseInt(numberArray[i + 1]) &&
        parseInt(numberArray[i + 1]) <= parseInt(numberArray[i + 2])) ||
      parseInt(numberArray[i]) == parseInt(numberArray[i + 1])
    )
      return true;
  }
  return false;
}
