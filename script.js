const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const optionButtons = document.getElementsByClassName("options");
const screenDiv = document.getElementById('display');
const commaButton = document.querySelector('.comma');
const equalsButton = document.querySelector('.equals');

let numberOfCommas = 0;

let calculatorHistory = {
    firstNumber: '',
    secondNumber: '',
    operator: '',
    operatorIsPressed: false,
    update: function (firstNum, secondNumb, operator) {
        this.firstNumber = firstNum;
        this.secondNumber = secondNumb;
        this.operator = operator;
    }
}

function addNumberToScreen(number) {
    if (screenDiv.textContent !== "0") {
        screenDiv.textContent += `${number}`;
    } else {
        screenDiv.textContent = `${number}`;
    }
}

function cleanScreen() {
    screenDiv.textContent = '0';
}

function addEventToEqualsButton(equalsButton) {
    equalsButton.addEventListener('click', () => {
        if (calculatorHistory.secondNumber !== '') {
            let result = operate(calculatorHistory.operator, calculatorHistory.firstNumber, calculatorHistory.secondNumber);
            screenDiv.textContent = result;
            calculatorHistory.update(result, '', '');
            numberOfCommas = 0;
        }
    });
}

function addEventToNumberButtons(numberButtons) {
    [...numberButtons].forEach((button) => {
        button.addEventListener('click', () => {
            if (calculatorHistory.operatorIsPressed) {
                screenDiv.textContent = 0;
                calculatorHistory.operatorIsPressed = false;
            }
            if (calculatorHistory.operator !== '') {
                addNumberToScreen(button.dataset.number);
                calculatorHistory.secondNumber = screenDiv.textContent

            } else {
                addNumberToScreen(button.dataset.number);
                calculatorHistory.firstNumber = screenDiv.textContent;
            }
        });
    });
}

function addEventToOperatorButtons(operatorButtons) {
    [...operatorButtons].forEach((button) => {
        button.addEventListener('click', () => {
            if (!calculatorHistory.operatorIsPressed) {
                if (calculatorHistory.secondNumber !== '') {
                    performOperation();
                }
                calculatorHistory.operator = button.dataset.operation;
                calculatorHistory.operatorIsPressed = true;
                numberOfCommas = 0;
            }
        })
    });
}

function performOperation() {
    var result = operate(calculatorHistory.operator, calculatorHistory.firstNumber, calculatorHistory.secondNumber);
    calculatorHistory.update(result, '', '');
    screenDiv.textContent = result;
}


function addEventToOptionButtons(optionButtons) {
    [...optionButtons].forEach((button) => {
        button.addEventListener('click', () => {
            cleanScreen();
        })
    })
}

function addEventToCommaButton(commaButton) {

    commaButton.addEventListener('click', () => {
        if (numberOfCommas === 0) {
            screenDiv.textContent += '.';
            numberOfCommas += 1;
        }
    });

}

function addEventsToButtons(commaButton, numberButtons, operatorButtons, optionButtons, equalsButton) {
    addEventToNumberButtons(numberButtons);
    addEventToOperatorButtons(operatorButtons);
    addEventToCommaButton(commaButton);
    addEventToOptionButtons(optionButtons);
    addEventToEqualsButton(equalsButton);
}

function addNumbers(a, b) {
    return a + b;
}

function substractNumbers(a, b) {
    return a - b;
}

function multiplyNumbers(a, b) {
    return a * b;
}

function divideNumbers(a, b) {
    if (b === 0) {
        return "Error! Divide by 0";
    }
    result = a / b;
    return result;
}

function operate(operator, firstValue, secondValue) {
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);
    operationResult = 0;

    switch (operator) {
        case 'add':
            operationResult = addNumbers(firstValue, secondValue);
            break;
        case 'substract':
            operationResult = substractNumbers(firstValue, secondValue);
            break;
        case 'multiply':
            operationResult = multiplyNumbers(firstValue, secondValue);
            break;
        case 'divide':
            operationResult = divideNumbers(firstValue, secondValue);
            break;
    }
    return operationResult;
}

// Necesito agregar la función para equals, y las opciones de borrado.

function main() {
    addEventsToButtons(commaButton, numberButtons, operatorButtons, optionButtons, equalsButton);
}

main();