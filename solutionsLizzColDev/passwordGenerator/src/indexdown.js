const inputLength = document.querySelector(".input-length");
const passwordLength = document.querySelector(".password-length");
const form = document.querySelector(".form-container");
const password = document.querySelector(".password");
const buttonCopy = document.querySelector(".button");

const API = "https://random-word-api.herokuapp.com/all";

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
const numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];
let words = [];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function generatePassword(passwordLengthChosen, checkBoxChosen) {

    let arrayOfArrays = [];

    if (checkBoxChosen.letters) {
        arrayOfArrays.push(letters);
      }

    if (checkBoxChosen.numbers) {
      arrayOfArrays.push(numbers);
    }

    if (checkBoxChosen.symbols) {
      arrayOfArrays.push(symbols);
    }

    if (checkBoxChosen.words) {
      arrayOfArrays.push(words);
    }

    let strongPassword = [];
    let tamano = 0 ;
    let limite = 0;
    
    while (tamano < passwordLengthChosen) {
      limite = passwordLengthChosen - tamano 
      const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
      let randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
      if (randomCharacter.length === undefined){
        tamano = tamano + 1
        strongPassword.push(randomCharacter);
      }else{
        tamano = tamano + randomCharacter.length 
        if (tamano > passwordLengthChosen){// te has pasado
          console.log( "me he pasado pasado del tamaño")
          console.log( limite + " es el limite")
          if ( limite == 1){
            randomCharacter = letters[getRandomNumber(0, letters.length - 1)];
            strongPassword.push(randomCharacter);
          }else{
            const myArrTam = myArr.filter(word => word.length == limite);
          console.log(myArrTam)
          randomCharacter = myArrTam[getRandomNumber(0, myArrTam.length - 1) ]
          strongPassword.push(randomCharacter)
          tamano = tamano + randomCharacter.length
          }
        }else{ // no te has pasado
          strongPassword.push(randomCharacter);
        }
      }
    }
    strongPassword = strongPassword.join("");
    console.log(strongPassword.length + " tamaño final" )
    password.innerText = strongPassword;
}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json()) // convierte la api a json
    .then((data) => {
      words = data
    });
}

fetchData(API);

function CopyToClipboard(id)
{
  const r = document.createRange();
  r.selectNode(document.querySelector(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  if (password.innerText == 0) {
      swal("Primero genera una contraseña");
      } else {
        window.navigator.clipboard.writeText(r);
        swal("Copiaste la contraseña");
        window.getSelection().removeAllRanges();
        
      }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElement = event.target;
    const passwordLength = formElement.length.value;

    const checks = {
      letters: formElement.letters.checked,
      words: formElement.words.checked,
      numbers: formElement.numbers.checked,
      symbols: formElement.symbols.checked,
    };

    if((checks.letters==false) && (checks.words==false) && (checks.numbers==false) && (checks.symbols==false))
    {
      alert("Elige primero una de las opciones")
      password.innerText = " ";
    }   else {
                  generatePassword(passwordLength, checks);
    }  

    buttonCopy.disabled = false;
  });
  
buttonCopy.addEventListener("click", () => {
    CopyToClipboard(".password");
    return false;
  });


inputLength.addEventListener("input", (e) => {
  passwordLength.innerText = e.target.value;
});
