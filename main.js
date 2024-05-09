document.addEventListener("DOMContentLoaded", function() {
    // Seleziona gli elementi necessari
    const display = document.querySelector('.results');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let waitForSecondOperand = false;

    // Funzione per aggiornare il display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Funzione per eseguire le operazioni
    function performOperation() {
        const inputValue = parseFloat(currentInput);

        if (operator === '+') {
            currentInput = (firstOperand + inputValue).toString();
        } else if (operator === '-') {
            currentInput = (firstOperand - inputValue).toString();
        } else if (operator === '*') {
            currentInput = (firstOperand * inputValue).toString();
        } else if (operator === '/') {
            currentInput = (firstOperand / inputValue).toString();
        }

        operator = null;
        waitForSecondOperand = false;
    }

    // Aggiungi event listener per i click sui bottoni
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText >= '0' && buttonText <= '9') {
                if (waitForSecondOperand) {
                    currentInput = buttonText;
                    waitForSecondOperand = false;
                } else {
                    currentInput += buttonText;
                }
            } else if (buttonText === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += buttonText;
                }
            } else if (buttonText === 'C') {
                currentInput = '';
                firstOperand = null;
                operator = null;
                waitForSecondOperand = false;
            } else if (buttonText === '=') {
                if (operator && !waitForSecondOperand) {
                    performOperation();
                    updateDisplay();
                }
            } else {
                if (operator !== null && !waitForSecondOperand) {
                    performOperation();
                    updateDisplay();
                }

                firstOperand = parseFloat(currentInput);
                operator = buttonText;
                waitForSecondOperand = true;
            }

            updateDisplay();
        });
    });
});
