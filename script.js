document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button');
    const display = document.getElementById('result');
    const display1 = document.getElementById('result1');

    let trilho = document.getElementById('trilho');
    let body = document.querySelector('body');
    let calculator = document.getElementById('calculator');
    let imgMaisMenos = document.getElementById('+escuro');
    let imgDelete = document.getElementById('delete escuro'); 
    let sunIcon = document.getElementById('sol');
    let moonIcon = document.getElementById('lua');

    let inputAtual = '';
    let operador = '';
    let primeiroNum = null;
    let result = 0;
    let expression = '';

    sunIcon.style.display = 'none';

    trilho.addEventListener('click', ()=>{
        trilho.classList.toggle('dark');
        body.classList.toggle('dark');
        calculator.classList.toggle('dark');

        if (trilho.classList.contains('dark')) {
            imgMaisMenos.src = 'source/+preto.png';
            imgDelete.src = 'source/delete preto.png';
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            imgMaisMenos.src = '/source/+branco.png';
            imgDelete.src = 'source/delete branco.png';
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            input(key);
        } else if (key === '.') {
            input('.');
        } else if (key === '+') {
            input('+');
        } else if (key === '-') {
            input('-');
        } else if (key === '*') {
            input('*');
        } else if (key === '/') {
            input('÷');
        } else if (key === 'Enter') {
            input('=');
        } else if (key === 'Backspace') {
            input('delete');
        } else if (key === 'Escape') {
            input('C');
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            input(this.id === 'btn_+/-' ? '+/-' : this.id === 'btn_delete' ? 'delete' : this.innerText);
        });
    });

    function input(value) {
        switch (value) {
            case 'C':
                inputAtual = '';
                operador = '';
                primeiroNum = null;
                display.value = '';
                display1.value = '';
                expression = '';
                break;

            case '+/-':
                if (inputAtual !== '') {
                    inputAtual = (parseFloat(inputAtual) * -1).toString();
                    display.value = expression + inputAtual;
                }
                break;

            case '%':
                inputAtual = (parseFloat(inputAtual) / 100).toString();
                display.value = expression + inputAtual;
                break;

            case '=':
                if (primeiroNum !== null && operador !== '') {
                    result = calcula(primeiroNum, parseFloat(inputAtual.replace(',', '.')), operador).toString();
                    display1.value = display.value;
                    display.value = formatResult(result);
                    inputAtual = result;
                    primeiroNum = null;
                    operador = '';
                    expression = '';
                }
                break;

            case '+':
            case '-':
            case '*':
            case '÷':

                if(inputAtual === ''){ 
                    return;
                }
                if (primeiroNum === null) {
                    primeiroNum = parseFloat(inputAtual.replace(',', '.'));
                } else if (operador !== '') {
                    primeiroNum = calcula(primeiroNum, parseFloat(inputAtual.replace(',', '.')), operador);
                }
                operador = value;
                expression += inputAtual + operador;
                inputAtual = '';
                display.value = expression;
                break;

            case '.':
                if (!inputAtual.includes('.')) {
                    inputAtual += value;
                    display.value = expression + inputAtual;
                }
                break;

            case 'delete':
                if (inputAtual !== '') {
                    inputAtual = inputAtual.slice(0, -1);
                } else if (operador !== '') {
                    operador = '';
                    expression = expression.slice(0, -1);
                } else if (primeiroNum !== null) {
                    primeiroNum = null;
                    expression = '';
                }
                display.value = expression + inputAtual;
                break;

            default:
                inputAtual += value;
                display.value = expression + inputAtual;
                break;
        }
    }

    function calcula(a, b, operador) {
        switch (operador) {
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
        let x = parseFloat(result).toString().replace('.', ',');
        return x;
    }
    });
