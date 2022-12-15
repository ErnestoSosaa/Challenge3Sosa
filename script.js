// Assignment Code
var generateBtn = document.querySelector("#generate");
var yesBtn = document.querySelector("#yes");
var noBtn = document.querySelector("#no");
var questionText = document.querySelector("#question-prompt");
var charLengthTextBox = document.querySelector("#length");
var doneBtn = document.querySelector("#done");
var questionOverlay =  document.getElementById("overlay");
var passwordText = document.querySelector("#password");

var shouldHaveCapitalLetters = false;
var shouldHaveNumbers = false;
var shouldHaveSpecialChars = false;
var passwordLength = 8;

//To accept criteria we ask questions
var questions = [
  'Do you want Capital Letters?',
  'Do you want Numbers?',
  'Do you want Special Characters?',
  'What is the length of the password?',
]

var questionNumber = 0; //to make them false, depending on answer will change condition true

// Write password to the #password input
function writePassword() {
 questionOverlay.style.display = "block";
  displayQuestion();
}

function generatePassword() {
  var conditions = ['Letters'];

  if (shouldHaveNumbers == true) {
    conditions.push('Nums');
  }

  if (shouldHaveSpecialChars == true) {
    conditions.push('Chars');
  }

  var password = "";
  //We increase the char to move from question to question
  for (var char=0; char < passwordLength; char++) {
    var typeOfChar = Math.floor(Math.random() * conditions.length);
    if (conditions[typeOfChar] == 'Letters') {
      var isCap = Math.floor(Math.random() * 2) == 0;
      
      if (shouldHaveCapitalLetters && isCap == true) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var newChar = characters[Math.floor(Math.random() * characters.length)];
        password = password + newChar;
      } else {
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var newChar = characters[Math.floor(Math.random() * characters.length)];
        password = password + newChar;
      }
    }

    else if (conditions[typeOfChar] == 'Nums') {
      var numbers = '0123456789';
      var newChar = numbers[Math.floor(Math.random() * numbers.length)];
      password = password + newChar;
    }

    else if (conditions[typeOfChar] == 'Chars') {
      var specialChars = '!@#$%^&*()_';
      var newChar = specialChars[Math.floor(Math.random() * specialChars.length)];
      password = password + newChar;
    }
  }

  passwordText.value = password;
  reset();
}

function reset() {
  //We reset for make new password, change all to false
  shouldHaveCapitalLetters = false;
  shouldHaveNumbers = false;
  shouldHaveSpecialChars = false;
  passwordLength = 8;
  questionNumber = 0;
  // These is added to ask again all questions
  charLengthTextBox.style.display = "none";
  doneBtn.style.display = "none";
  noBtn.style.display = "block";
  yesBtn.style.display = "block";

  charLengthTextBox.value = "";
}

function yesAction() {
  if (questionNumber == 0) {
    shouldHaveCapitalLetters = true;
  }

   else if (questionNumber == 1) {
    shouldHaveNumbers = true;
  }

  else if (questionNumber == 2) {
    shouldHaveSpecialChars = true;
  }

  questionNumber++;
  displayQuestion();
}

function noAction() {
  questionNumber++;
  displayQuestion();
}

function doneAction() {
    //Just if someone decides to put less than 8 or greater than 128
    if (charLengthTextBox.value < 8 || charLengthTextBox.value > 128) {
      confirm("select a number from 8 to 128");
    } else {
      passwordLength = charLengthTextBox.value;
      questionOverlay.style.display = 'none';
      generatePassword();
    }
}

function displayQuestion() {
  questionText.innerHTML = questions[questionNumber];

  if (questionNumber == 3) {
    charLengthTextBox.style.display = "block";
    doneBtn.style.display = "block";
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

yesBtn.addEventListener("click", yesAction);
noBtn.addEventListener("click", noAction);
doneBtn.addEventListener("click", doneAction);
