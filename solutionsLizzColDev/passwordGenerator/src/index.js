const inputLength = document.querySelector(".input-length");
const passwordLength = document.querySelector(".password-length");
const form = document.querySelector(".form-container");
const password = document.querySelector(".password");
const buttonCopy = document.querySelector(".button");

const API = "https://goquotes-api.herokuapp.com/api/v1/random?count=5";

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

    let arrayOfArrays = []; // el array que va a contener todos los arrays que elijamos[[letter],[numbers],[symbols],[words]] ej [[symbol], [words]]

    if (checkBoxChosen.letters) {
        arrayOfArrays.push(letters); // cargar todo el array de la a a la z
      }

    if (checkBoxChosen.numbers) {
      arrayOfArrays.push(numbers); // cargar todo el array del 0 al 9
    }

    if (checkBoxChosen.symbols) {
      arrayOfArrays.push(symbols); // // cargar todo el array de symbols que creamos anteriormente
    }

    if (checkBoxChosen.words) {
      arrayOfArrays.push(words);
    }

    let strongPassword = []; // resultado - contraseña final
    let tamano = 0 ; // número de caracteres introducidos en la contraseña final
    let caracterFaltante = 0; // será el número de caracteres máximos que tendrá la nueva palabra. 

    while (tamano < passwordLengthChosen) { // bucle mientras el tamaño sea menor a la cantidad de caracteres elegida
      const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)]; // aquí escoge uno de los arrays(según los seleccionados) arrayOfArrays[número random] ejemplo: arrayOfArrays[1]
      
      let randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)]; // escoge un caracter de los caracteres que contenga el array que haya salido del random anterior
      console.log('randomcaracter inicial', randomCharacter, randomCharacter.length)
      if (randomCharacter.length === undefined){ // los simbolos y números son undefined, el .length solo funciona con strings(letters, es estring de 1)
        tamano = tamano + 1 // porque símbolos y números solo se ponen uno cada vez
        strongPassword.push(randomCharacter); // añade caracter a contraseña final(número o símbolo)
      }else{ // letters o string
        caracterFaltante = passwordLengthChosen - tamano;
        tamano = tamano + randomCharacter.length // suma completo los caracteres de las palabras
        if (tamano > passwordLengthChosen){ // condición el tamaño no deb exceder la cant de caracterres solicitados
            console.log("me he pasado del tamaño")
            console.log("caracter faltante " + caracterFaltante)
        //   let arrWordFilter = myArr.filter(function(word){ // crea un NUEVO array, filtrando las palabras del tamaño del caracter faltante.
        //     return word.length == caracterFaltante             
        // });
        let arrWordFilter = myArr.filter(word => word.length == caracterFaltante ) // crea un NUEVO array, filtrando las palabras del tamaño del caracter faltante.
        console.log(arrWordFilter, 'después del filtro')
        console.log(randomCharacter, 'antes del buscar una random')
          randomCharacter = arrWordFilter[getRandomNumber(0, arrWordFilter.length - 1)];
          strongPassword.push(randomCharacter);
          tamano = tamano + randomCharacter.length;
        }else{
          strongPassword.push(randomCharacter); // agrega el caracter a la contraseña, se activa cuando el tamaño es menor que la longitud solicitada
        }
      }
    }
    strongPassword = strongPassword.join(""); // une todo en uno solo 
    console.log(strongPassword.length + " tamaño final" )
    password.innerText = strongPassword; // escribe en pantalla
}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json()) // convierte la api a json
    .then((data) => {
      words = data.quotes.map((quote) => quote.text);
      words = words.join("").split(" ").sort();
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