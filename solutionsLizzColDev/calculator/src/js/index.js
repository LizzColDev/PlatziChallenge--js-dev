import * as calculator from "./operations.js"; // import del archivo donde están las operaciones

let currentNumber = "" // número tecleado
let arrayOperation = [] // todos los elementos digitados

numberButtons.forEach(button => {  // función que escucha cuando se teclea un botón de números
  button.addEventListener("click", (event) => {
    printCharacter(event)        // llama la función de imprimir valor, para que imprima el valor del botón tecleado
    currentNumber += event.target.textContent // le concatena el número al número actual
  })
})

// escuchador para suma
add.addEventListener("click", (event) => {
  printCharacter(event)                 // llama a la función para que me imprima en pantalla el +
  
    arrayOperation.push(currentNumber) // le agrega al arrayOperation el currentNumber
    arrayOperation.push("+") // le agrega el +
    currentNumber = ""    // convierte el currentNumber en vacío
})

sub.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("-")
  currentNumber = ""
})

divider.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("/")
  currentNumber = ""
})

multi.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("*")
  currentNumber = ""
})

raiz.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("√")
  currentNumber = ""
})


//borra un caracter

del.addEventListener("click", () => {
  let newValue = calculator.deleteLastCharacter(screen) // llama a la función de borrar caracter, que tenemos en el módulo calculator
  currentNumber = newValue // actualizamos el currentNumber con el valor del resultado del delete
  screen.value = newValue // imprimimos en pantalla
  console.log(arrayOperation, 'antes del pop')
  arrayOperation.pop()  // error error error
  console.log(arrayOperation, 'después del pop')

})

delAll.addEventListener("click", () => {
  currentNumber = ""
  screen.value = ""
  arrayOperation = []
})

equal.addEventListener("click", () => {
  console.log('currentNumber', currentNumber)
  arrayOperation.push(currentNumber) // le agrega el valor actual al array completo de valores

    raizCuadrada(arrayOperation)
    multiDiv(arrayOperation) // hace multip y/o división
    sumSub(arrayOperation) // hace suma y/o resta

  screen.value = arrayOperation[0] // imprime en pantalla el valor iinicial del array Operation // resultado final
  currentNumber = arrayOperation[0] // convierte al valor actual
  arrayOperation.pop() // elimina el array operation
})



function raizCuadrada() {
  const arra = arrayOperation;
  
  arra.forEach((item, index) => {
    if(item == '√') { 
        arra[index-1] = calculator.raiz(arra[index+1])
        arra.splice(index, 2)

      return arra;
  }

})}

function multiDiv() {

  const arra = arrayOperation;

  for (let i=0; i < arra.length; i++) {
    for (let i=0; i < arra.length; i++) {
        if(arra[i] == "*" || arra[i] == "/"){
          switch(arra[i]){
            case "*":
              arra[i-1] =calculator.multiply(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
            case "/":
              arra[i-1] = calculator.division(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
              default:
              break;
          }
          i = i-1;
        }
    }
  }

  return arra;
}

function sumSub() {

  const arra = arrayOperation; 

  for (let i=0; i < arra.length; i++) {
    for (let i=0; i < arra.length; i++) {
        if(arra[i] == "+" || arra[i] == "-"){
          switch(arra[i]){
            case "+":
              arra[i-1] =calculator.sum(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
            case "-":
              arra[i-1] = calculator.subtract(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
              default:
              break;
          }
          i = i-1;
        }
    }
  }
  return arra;
}



function printCharacter(event){
  const target = event.target
  screen.value += target.textContent
}
