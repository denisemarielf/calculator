//DOM

let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let prevOperation = document.getElementById("previous-operation");
let currentOperation = document.getElementById("current-operation");
let equal = document.querySelector('.equal')
let clear = document.getElementById('clear');
let backspace = document.getElementById('delete');
let negative = document.getElementById('neg')
let decimal = document.getElementById('decimal')

//function to replace splice for strings

function spliceSplit(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count);
    return ar.join('');
  }

//Display values

let displayValueTop = "";
let numsToOperate = [];
let displayValueBottom = "";
numberRegex = /[0-9]/;
let chosenOperator;
let result ="";
let resultNumber;
let equalButtonPressed = false;
let numberPressed = false;

//function to reset calculator

function clearAll () {
    displayValueTop = "";
    prevOperation.innerHTML = "";
    numsToOperate = [];
    displayValueBottom = "";
    currentOperation.innerHTML = "";
    chosenOperator= "";
    result = "";
}

//functions for math operators

const addition = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//event listeners

numbers.forEach((number) => number.addEventListener('click', function(){
        1
        numberPressed = true;
        displayValueTop += number.value;
        displayValueBottom += number.value;
        currentOperation.innerHTML = displayValueBottom;
}));

decimal.addEventListener('click', function () {
    
    if (displayValueBottom.indexOf('.') == -1) {
        displayValueBottom += '.';
        displayValueTop += '.';
        currentOperation.innerHTML = displayValueBottom;
        prevOperation.innerHTML = displayValueTop;
    }
})

negative.addEventListener('click', function (){
        console.log(displayValueBottom[0] == '-')
        if (displayValueBottom[0] == '-') {
            displayValueBottom = spliceSplit(displayValueBottom, 0, 1);
            currentOperation.innerHTML = displayValueBottom
        } else {
            displayValueBottom = '-' + displayValueBottom;
            currentOperation.innerHTML = displayValueBottom
            displayValueTop = '-' + displayValueTop;
        }
})

operators.forEach((operator) => operator.addEventListener('click', function(){
    if (equalButtonPressed === false || resultNumber === "") {
    if (numberRegex.test(displayValueTop.charAt(displayValueTop.length -1))) {
        displayValueTop += operator.value;
        numsToOperate.push(displayValueBottom)
        displayValueBottom = "";
        currentOperation.innerHTML = displayValueBottom;
        operate();
        currentOperation.innerHTML = result;
        } 
    } else if (equalButtonPressed === true) {
        
        displayValueTop = "";
        displayValueTop += resultNumber.toString();
        prevOperation.innerHTML = "";
        numsToOperate.push(resultNumber)
        displayValueBottom = "";
        currentOperation.innerHTML = "";
        chosenOperator= "";
        result = "";

        if (numberRegex.test(displayValueTop.charAt(displayValueTop.length -1))) {
            
            console.log(displayValueTop)
            displayValueTop += operator.value;
            //numsToOperate.push(displayValueBottom)
            displayValueBottom = "";
            currentOperation.innerHTML = displayValueBottom;
            operate();
            currentOperation.innerHTML = result;equalButtonPressed = false;
        }
       prevOperation.innerHTML = displayValueTop;
        chosenOperator = operator.value; 

    }
    prevOperation.innerHTML = displayValueTop;
    chosenOperator = operator.value;

}));

//calculations

function operate () {
    
        let operating = numsToOperate.slice(-2)
        let num1 = parseFloat(operating[0]);
        let num2= parseFloat(operating[1]);
    
        if (chosenOperator == "+") {
            numsToOperate.push(addition(num1, num2))
            result = addition(num1, num2);
        
        } else if (chosenOperator == "-") {
            numsToOperate.push(subtract(num1, num2))
            result = subtract(num1, num2);

        } else if (chosenOperator == "x") {
            numsToOperate.push(multiply(num1, num2))
            result = multiply (num1, num2);
            
        } else if (chosenOperator == "/") {
        if (num2 == 0 || num2 == '0') {
            result = "Sorry, cannot divide by zero";
            setTimeout(clearAll, 2000);
        } else {
            numsToOperate.push(divide(num1, num2))
            result = divide (num1, num2)
        }
    }
    
}

equal.addEventListener('click', function () {
        if (numberPressed === true) {
            numsToOperate.push(displayValueBottom)
            operate();
            prevOperation.innerHTML = displayValueTop;
            displayValueBottom = result;
            currentOperation.innerHTML = displayValueBottom;
            if(result != "Sorry, cannot divide by zero") {
                resultNumber = result;
            } else {
                resultNumber = "";
            }
            equalButtonPressed = true;
            numberPressed = false;
        }
    })

clear.addEventListener('click', function () {
        clearAll();
        equalButtonPressed = false;
    });

backspace.addEventListener('click', function () {
    displayValueBottom = spliceSplit(displayValueBottom, -1, 1);
    numsToOperate = numsToOperate.splice(-1);
    displayValueTop = spliceSplit(displayValueTop, -1, 1)
    currentOperation.innerHTML = displayValueBottom;
})

clearAll();




//add keyboard support


document.addEventListener('keydown', function(e){
if (numberRegex.test(e.key)) {
        numberPressed = true;
        displayValueTop += e.key;
        displayValueBottom += e.key;
        currentOperation.innerHTML = displayValueBottom;
} else if (e.key === ".") {
    if (displayValueBottom.indexOf('.') == -1) {
        displayValueBottom += '.';
        displayValueTop += '.';
        currentOperation.innerHTML = displayValueBottom;
        prevOperation.innerHTML = displayValueTop;
    }

} else if (e.key === "+" ||e.key === "-" ||e.key === "/" ||e.key === "*") {
    if (equalButtonPressed === false || resultNumber === "") {
        if (numberRegex.test(displayValueTop.charAt(displayValueTop.length -1))) {
            displayValueTop += e.key;
            numsToOperate.push(displayValueBottom)
            displayValueBottom = "";
            currentOperation.innerHTML = displayValueBottom;
            operate();
            currentOperation.innerHTML = result;
            } 
        } else if (equalButtonPressed === true) {
            
            displayValueTop = "";
            displayValueTop += resultNumber.toString();
            prevOperation.innerHTML = "";
            numsToOperate.push(resultNumber)
            displayValueBottom = "";
            currentOperation.innerHTML = "";
            chosenOperator= "";
            result = "";
    
            if (numberRegex.test(displayValueTop.charAt(displayValueTop.length -1))) {
                
                displayValueTop += e.key;
                //numsToOperate.push(displayValueBottom)
                displayValueBottom = "";
                currentOperation.innerHTML = displayValueBottom;
                operate();
                currentOperation.innerHTML = result;equalButtonPressed = false;
            }
           prevOperation.innerHTML = displayValueTop;
            chosenOperator = e.key; 
    
        }
        prevOperation.innerHTML = displayValueTop;
        chosenOperator = e.key;
    
}else if (e.key === 'Enter') {
    if (numberPressed === true) {
        numsToOperate.push(displayValueBottom)
        operate();
        prevOperation.innerHTML = displayValueTop;
        displayValueBottom = result;
        currentOperation.innerHTML = displayValueBottom;
        if(result != "Sorry, cannot divide by zero") {
            resultNumber = result;
        } else {
            resultNumber = "";
        }
        equalButtonPressed = true;
        numberPressed = false;
    }
} else if (e.key === 'Backspace'){
    displayValueBottom = spliceSplit(displayValueBottom, -1, 1);
    numsToOperate = numsToOperate.splice(-1);
    displayValueTop = spliceSplit(displayValueTop, -1, 1)
    currentOperation.innerHTML = displayValueBottom;
} else if (e.key === 'End') {
    clearAll();
    equalButtonPressed = false;
} else {

}
})
