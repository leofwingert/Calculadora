document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button');
    const display = document.getElementById('result');
    const display1 = document.getElementById('result1');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let result = 0;
    let expression = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleInput(this.id === 'btn_+/-' ? '+/-' : this.id === 'btn_delete' ? 'delete' : this.innerText);
        });
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            handleInput(key);
        } else if (key === '.') {
            handleInput('.');
        } else if (key === '+') {
            handleInput('+');
        } else if (key === '-') {
            handleInput('-');
        } else if (key === '*') {
            handleInput('*');
        } else if (key === '/') {
            handleInput('÷');
        } else if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('delete');
        } else if (key === 'Escape') {
            handleInput('C');
        }
    });

    function handleInput(value) {
        switch (value) {
            case 'C':
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.value = '';
                display1.value = '';
                expression = '';
                break;

            case '+/-':
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.value = expression + currentInput;
                }
                break;

            case '%':
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.value = expression + currentInput;
                break;

            case '=':
                if (firstOperand !== null && operator !== '') {
                    result = calcula(firstOperand, parseFloat(currentInput.replace(',', '.')), operator).toString();
                    display1.value = display.value;
                    display.value = formatResult(result);
                    currentInput = result;
                    firstOperand = null;
                    operator = '';
                    expression = '';
                }
                break;

            case '+':
            case '-':
            case '*':
            case '÷':
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput.replace(',', '.'));
                } else if (operator !== '') {
                    firstOperand = calcula(firstOperand, parseFloat(currentInput.replace(',', '.')), operator);
                }
                operator = value;
                expression += currentInput + operator;
                currentInput = '';
                display.value = expression;
                break;

            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    display.value = expression + currentInput;
                }
                break;

            case 'delete':
                if (currentInput !== '') {
                    currentInput = currentInput.slice(0, -1);
                } else if (operator !== '') {
                    operator = '';
                    expression = expression.slice(0, -1);
                } else if (firstOperand !== null) {
                    firstOperand = null;
                    expression = '';
                }
                display.value = expression + currentInput;
                break;

            default:
                currentInput += value;
                display.value = expression + currentInput;
                break;
        }
    }

    function calcula(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '÷':
                return a / b;
            default:
                return b;
        }
    }

    function formatResult(result) {
        return parseFloat(result).toString().replace('.', ',');
    }
});