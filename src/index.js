// Thanks Florin for live streaming your journey https://www.youtube.com/watch?v=NGOzAaJRPQU

import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';

const num = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+", "="];
const ids = {
    7: "seven", 
    8: "eight",
    9: "nine", 
    4: "four", 
    5: "five", 
    6: "six", 
    1: "one",
    2: "two",
    3: "three", 
    0: "zero",
    "/": "divide",
    "*": "multiply", 
    "-": "subtract", 
    "+": "add", 
    "=": "equals",
}

class App extends React.Component {
    state = {
        lastPressed: undefined,
        calc: "0",
        operation: undefined
    }

    handleClick = (e) => {
        let {calc, lastPressed} = this.state;
        let { innerText } = e.target;
        console.log(this.state);

        switch(innerText){
            case "AC": {
                this.setState({
                    calc: "0",
                });
                break;
            }
            case "=": {
                const evaluated = eval(calc);
                this.setState({
                    calc: evaluated,
                });
                break;
            }
            case ".": {
                const split = calc.split(/[+\-*/]/);
                const last = split.slice(-1)[0];
                console.log("Split: " + split);
                console.log("Last: " + last);

                if(!last.includes('.')){
                    this.setState({calc: calc + "."})
                }
                break;
            }
            default: {
                let e = undefined;
                if(ops.includes(innerText)) {
                    if(ops.includes(lastPressed) && innerText !== "-") {
                        const lastNumberIdx = calc.split("").reverse().findIndex(char => num.includes(+char));
                        e = calc.slice(0, lastNumberIdx + 1) + ` ${innerText} `;
                    } else {
                        e = calc + ` ${innerText} `;
                    }
                } else {
                    e = calc === "0" ? innerText : (calc + innerText);
                };
                this.setState({
                    calc: e,
                    lastPressed: innerText,
                });
            }

            this.setState({lastPressed: innerText});

        }
    }

    render() {
        const {calc} = this.state;
        return (
            <div className="calculator">
                <div id="display" className="display">
                    {calc}
                </div>
                <div className="nums-container">
                    <button className="lightgray ac big-h" id="clear" onClick={this.handleClick}>AC</button>
                    {num.map((num) => (
                        <button onClick={this.handleClick} className={`darkgray ${num === 0 ? "big-h" : ""}`} key={num} id={ids[num]}>{num}</button>))}
                    <button onClick={this.handleClick} className="lightgray" id="decimal">.</button>
                </div>
                <div className="ops-container">
                    {ops.map((op) => (<button onClick={this.handleClick} className="orange" key={op} id={ids[op]}>{op}</button>))}
                </div>
                <div className="row"></div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));