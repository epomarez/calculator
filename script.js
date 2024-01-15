const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const screenDiv = document.getElementById('display');
const commaButton = document.querySelector('.comma');
const equalsButton = document.querySelector('.equals');
const clearButton = document.getElementById('clear-btn');
const deleteButton = document.getElementById('delete-btn');

let numberOfCommas = 0;

let calculatorHistory = {
    firstNumber: '0',
    secondNumber: '',
    operator: '',
    operatorIsPressed: false,
    writingSecondNumber: false,
    update: function (firstNum, secondNumb, operator) {
        this.firstNumber = firstNum;
        this.secondNumber = secondNumb;
        this.operator = operator;
    }
}

// If it is 0, deletes 0 and adds a number; if not, adds
// a number next to existing number
function addNumberToScreen(number) {
    if (screenDiv.textContent !== "0") {
        screenDiv.textContent += `${number}`;
    } else {
        screenDiv.textContent = `${number}`;
    }
}

function setScreenContent(value) {

}

function cleanScreen() {
    screenDiv.textContent = '0';
}

function clearHistory() {
    calculatorHistory.update('0', '', '');
}

function addEventToClearButton(clearButton) {
    clearButton.addEventListener('click', () => {
        clearHistory();
        cleanScreen();
    });
};

function deleteNumber(number) {
    if (number.length !== 1) {
        return number.slice(0, -1);
    } else {
        return '0';
    }
}

function addEventToDeleteButton(deleteButton) {
    deleteButton.addEventListener('click', () => {
        if (screenDiv.textContent !== '0') {
            if (isNaN(parseFloat(screenDiv.textContent))) {
                calculatorHistory.firstNumber = '0';
                screenDiv.textContent = '0';
            }
            if (calculatorHistory.operator === '') {
                calculatorHistory.firstNumber = deleteNumber(calculatorHistory.firstNumber);
                screenDiv.textContent = calculatorHistory.firstNumber;
            } else {
                calculatorHistory.secondNumber = deleteNumber(calculatorHistory.secondNumber);
                screenDiv.textContent = calculatorHistory.secondNumber;
            }
        }
    });
};

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

function addNumber(buttonNumber) {
    addNumberToScreen(buttonNumber);
    return screenDiv.textContent;
}

function addEventToNumberButtons(numberButtons) {
    [...numberButtons].forEach((button) => {
        button.addEventListener('click', () => {
            if (calculatorHistory.operatorIsPressed) {
                screenDiv.textContent = '0';
                calculatorHistory.operatorIsPressed = false;
            }
            if (calculatorHistory.operator !== '') {
                calculatorHistory.secondNumber = addNumber(button.dataset.number);

            } else {
                calculatorHistory.firstNumber = addNumber(button.dataset.number);
            }
        });
    });
}

function addEventToOperatorButtons(operatorButtons) {
    [...operatorButtons].forEach((button) => {
        button.addEventListener('click', () => {
            if (!calculatorHistory.operatorIsPressed) {
                if (calculatorHistory.secondNumber !== '') {
                    let result = operate();
                    calculatorHistory.update(result, '', '');
                    screenDiv.textContent = result;
                }
                calculatorHistory.operator = button.dataset.operation;
                calculatorHistory.operatorIsPressed = true;
                numberOfCommas = 0;
            }
        })
    });
}

function performOperation(firstNum, secondNum, operation) {
    switch (operation) {
        case 'add':
            return firstNum + secondNum;
        case 'substract':
            return firstNum - secondNum;
        case 'multiply':
            return firstNum * secondNum;
        case 'divide':
            if (secondNum === 0) {
                return "Error!";
            }
            return firstNum / secondNum;
    }
}

function addEventToCommaButton(commaButton) {

    commaButton.addEventListener('click', () => {
        if (numberOfCommas === 0) {
            screenDiv.textContent += '.';
            numberOfCommas += 1;
        }
    });

}

function addEventsToButtons(commaButton, numberButtons, operatorButtons, equalsButton, clearButton, deleteButton) {
    addEventToNumberButtons(numberButtons);
    addEventToOperatorButtons(operatorButtons);
    addEventToCommaButton(commaButton);
    addEventToEqualsButton(equalsButton);
    addEventToClearButton(clearButton);
    addEventToDeleteButton(deleteButton);
}

function operate() {
    const operator = calculatorHistory.operator;
    const firstNum = parseFloat(calculatorHistory.firstNumber);
    const secondNum = parseFloat(calculatorHistory.secondNumber);

    if (isNaN(firstNum)) {
        return "Error!";
    }

    const operationResult = performOperation(firstNum, secondNum, operator);

    if (typeof operationResult === 'string') {
        return operationResult;
    } else {
        return Number(operationResult.toFixed(2));
    }
}

// Necesito agregar la función para equals, y las opciones de borrado.

function main() {
    addEventsToButtons(commaButton, numberButtons, operatorButtons, equalsButton, clearButton, deleteButton);
}

main();