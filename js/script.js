const calcForm = document.body.querySelector('.form');
const numPad = calcForm.querySelector('.num-pad');
const board = calcForm.querySelector('.scoreboard');
const calculator = new Calculator();
calcForm.addEventListener('click', calcHandler);
const maxNumbers = 10;


function calcHandler(e){
    const button = e.target;
    if(!button.matches('.button')) return;

    if(!button.matches('.action')){
        if(calculator.b.length < maxNumbers){
            calculator.b += button.id;
        }
        printNum(calculator.b);
    }else if(!button.matches('.clear')){
        if(numIsEmpty() && button.id === '-') {
            calculator.b += button.id;
            printNum(calculator.b);
        }
        if(!numIsEmpty() && calculator.op !== '' && button.id === '='){
            calculator.a = calculator.calculate();
            printNum(calculator.a);
        }else if(button.id !== '='){
            if(calculator.a === '')
                calculator.a = calculator.b;
            calculator.op = button.id;
            calculator.b = '';
        }
    }else{
        if(button.id === 'AC'){
            calculator.a = '';
            calculator.b = '';
            calculator.op = '';
            printNum(0);
        }
        if(button.id === 'C'){
            printNum(calculator.b.length ? 
                calculator.b = calculator.b.slice(0, -1) : calculator.a.length ? 
                    calculator.a = calculator.a.slice(0, -1) : 0);
        }
    }




    console.log(button);
}

const numIsEmpty = () =>
    calculator.a === '' && calculator.b === '';

const printNum = (num) =>
    board.innerHTML = num;

function Calculator(){
    this.a = '';
    this.op = '';
    this.b = '';

    this.methods = {
        '+': (a, b) => +a + +b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }
    this.calculate = () => 
        this.methods[this.op](this.a, this.b) + '';

}


