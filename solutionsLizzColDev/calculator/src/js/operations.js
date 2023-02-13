export function sum(num, anotherNum){
    return Number(num) + Number(anotherNum)
}

export function subtract(num, anotherNum){
    return Number(num) - Number(anotherNum)
}

export function division(num, anotherNum){
    return Number(num) / Number(anotherNum)
}

export function multiply(num, anotherNum){
    return Number(num) * Number(anotherNum)
}

export function raiz(num){
    return Math.sqrt(Number(num)) 
}



export function deleteLastCharacter(screen){
  let newValue = screen.value.split("") // separa cada uno de los elementos impresos
  newValue.pop() // elimina el último elemento
  return newValue.join("") // vuelve a unir el valor que queda luego de la eliminación del último
}