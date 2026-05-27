const numberbuttons = document.querySelectorAll('[data-number]');
const operationbuttons = document.querySelectorAll('[data-operation]');
const equalsbutton = document.querySelector('[data-equals]');
const deletebutton = document.querySelector('[data-delete]');
const allclearbutton = document.querySelector('[data-all-clear]');
const previousoperandtextelement = document.querySelector('[data-previous-operand]');
const currentoperandtextelement = document.querySelector('[data-current-operand]');
 
const calculator =new calculator(previousoperandtextelement, currentoperandtextelement);

numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText);
        calculator.updateDisplay();
    });
});


operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText);
        calculator.updateDisplay();
    });
});

class Calculator {
    constructor(previousoperandtextelement, currentoperandtextelement) {
        this.previousoperandtextelement = previousoperandtextelement;
        this.currentoperandtextelement = currentoperandtextelement;
        this.clear();





    }

    clear() {
        this.currentoperand = '';
        this.previousoperand = '';
        this.operation = undefined;

    }

    delete() {

    }

    appendnumber(number) {
        if (number === '.' && this.currentoperand.includes('.')) return;
        this.currentoperand = this.currentoperand.toString() + number.toString();

    }

    chooseoperation(operation) {
            if (this.currentoperand === '') return;
                if (this.previousoperand !== '') {
                    this.compute();
                }
        this.operation = operation;
        this.previousoperand = this.currentoperand;
        this.currentoperand = '';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousoperand);
        const current = parseFloat(this.currentoperand);
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentoperand = computation.toString();
        this.operation = undefined;
        this.previousoperand = '';

    }

    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1);
    }
    getdisplaynumber(number) {
        const stringnumber = number.toString();
        const integerdigits = parseFloat(stringnumber.split('.')[0]);
        const decimaldigits = stringnumber.split('.')[1];
        let integerdisplay;
        if (isNaN(integerdigits)) {
            integerdisplay = '';
        } else {
            integerdisplay = integerdigits.toLocaleString('en');
        }
        if (decimaldigits != null) {
            return `${integerdisplay}.${decimaldigits}`;
        }
        return integerdisplay;
    }

    updateDisplay() {
        this.currentoperandtextelement.innerText = this.getdisplaynumber(this.currentoperand);
        if (this.operation != null) {
            this.previousoperandtextelement.innerText = 
            `${this.getdisplaynumber(this.previousoperand)} ${this.operation}`;
        } else { 
            this.previousoperandtextelement.innerText = this.getdisplaynumber(this.previousoperand);
        }
    }
}

equalsbutton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

deletebutton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

allclearbutton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});