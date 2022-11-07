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
            if(board.outerHTML.includes(calculator.b) && calculator.b !== ''){
                printNum((calculator.b = calculator.b.slice(0, -1)) || calculator.a);
            }else if(board.outerHTML.includes(calculator.a)){
                printNum((calculator.a = calculator.a.slice(0, -1)) || '0');       
            }else{
                printNum(calculator.b || calculator.a);
            }
        }
    }
    console.log(button);
}

const numIsEmpty = () =>
    calculator.a === '' && calculator.b === '';

const printNum = (num) =>
    board.innerHTML = num;

function fixResult(str){
    let result = '';
    let index = str.indexOf('.');
    if(str.length > 10 && (index < 0 || index > 9)){
    result = `${str.slice(0, 8)}e${str.length -8}`;
    }else if(index > 0 && index < 10){
        result = str.slice(0, 10);
    }else{
        result = str;
    }
    return result;
}

function Calculator(){
    this.a = '';
    this.op = '';
    this.b = '';

    this.methods = {
        '+': (a, b) => (a * 10 + b * 10) / 10,
        '-': (a, b) => (a * 10 - b * 10) / 10,
        '*': (a, b) => +a * +b,
        '/': (a, b) => (+a / +b),
        '%': (a, b) => +a / 100 * +b,
    }
    this.calculate = () => 
        // this.methods[this.op](this.a, this.b) + '';
        fixResult(this.methods[this.op](this.a, this.b) + '');

}


