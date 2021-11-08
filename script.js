var Calculator = /** @class */ (function () {
    function Calculator(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };
    Calculator.prototype["delete"] = function () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    Calculator.prototype.appendNumber = function (number) {
        if (number === '.' && this.currentOperand.match('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };
    Calculator.prototype.chooseOperation = function (operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };
    Calculator.prototype.getDisplayNumber = function (number) {
        var stringNumber = number.toString();
        var integerDigits = parseFloat(stringNumber.split('.')[0]);
        var decimalDigits = stringNumber.split('.')[1];
        var integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != 0) {
            return integerDisplay + "." + decimalDigits;
        }
        else {
            return integerDisplay;
        }
    };
    Calculator.prototype.updateDisplay = function () {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != 0) {
            this.previousOperandTextElement.innerText =
                this.getDisplayNumber(this.previousOperand) + " " + this.operation;
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    };
    return Calculator;
}());
console.log("Hello");
var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
if (equalsButton == null) {
    console.log("This is null value of equal button", equalsButton);
}
else {
    console.log(document.querySelector('[data-equals]'));
}
console.log("Equal button : ", equalsButton);
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.append);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.chooseOperation(button.append);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click', function (button) {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', function (button) {
    calculator["delete"]();
    calculator.updateDisplay();
});
