import React from 'react';
import './Calculator.css';
import Wrapper from "./CalculatorComponents/Wrapper";
import Screen from "./CalculatorComponents/Screen";
import ButtonBox from "./CalculatorComponents/ButtonBox";
import Button from "./CalculatorComponents/Button";
import { useState } from "react";

//create an array representation of the data in the wireframe, 
//so we can map through and render all the buttons in the ButtonBox
const btnValues = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

//format the number into the string format and create the space separators for the thousand mark
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

//reverse the process of toLocaleString()
//remove the spaces, so we can later convert it to number
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function SimpleCalculator() {
  /*3 states, set all states at once
  sign = the selected sign 
  num = the entered value 
  res = the calculated value*/
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  //this function gets triggered only if any of the number buttons (0–9) are pressed. 
  //Then it gets the value of the Button and adds that to the current num value.
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    //numbers are entered up to 16 integers long (no more than 16)
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        //no whole numbers start with zero
        //there are no multiple zeros before the decimal point
        //the format will be “0.” if “.” is pressed first (since num is already 0 when decimal is added)
        num:
          //check if it contains "."
          calc.num.toString().includes(".")
            //if yes, add the new digit to the saved calc.num (so 0.0 is possible)
            ? toLocaleString(calc.num + value)
            //if no ".", check if saved number = 0 and new number = 0
            : calc.num === 0 && value === "0"
            //if yes, return 0 (keep it as 0)
            ? "0"
            //if not, check if saved num is whole number
            : removeSpaces(calc.num) % 1 === 0
            //if yes, add the new digit to the saved calc.num and convert value to a number (Number() convert '012' to 12)
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            //if not whole number, add the new digit to the saved calc.num
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  //when '.' is pressed
  //add decimal point to saved num if there is no decimal point already exist
  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  //when one of '+-*/' is pressed
  //save it to sign attribute, save num to res, and set num to 0
  //it also make sure that there’s no effect on repeated calls
  //can do 2+3 but not 2+3+4, need PEMDAS
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  //this function calculates the result when the equals button (=) is pressed
  const equalsClickHandler = () => {
    //there’s no effect on repeated calls
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      //returned value is then set as the new res for the further calculations
      setCalc({
        ...calc,
        res:
          //users can’t divide with 0
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  //this function first checks if there’s any entered value (num) or calculated value (res) 
  //and then inverts them by multiplying with -1
  const invertClickHandler = () => {
    let num2 = calc.num ? removeSpaces(calc.num) : 0;
    let res2 = calc.res ? removeSpaces(calc.res) : 0;

    if (calc.num) {num2 = toLocaleString(num2) * -1;}
    else {res2 = toLocaleString(res2) * -1;}

    setCalc({
      ...calc,
      num: num2,
      res: res2,
      
    });
  };

  //this function checks if there’s any entered value (num) or calculated value (res) 
  //and then calculates the percentage using the built-in Math.pow function, which returns the base to the exponent power
  const percentClickHandler = () => {
    let num2 = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res2 = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    if (calc.num) {num2 /= Math.pow(100, 1);}
    else {res2 /= Math.pow(100, 1);}

    setCalc({
      ...calc,
      num: num2,
      res: res2,
      
    });
  };

  //this function defaults all the initial values of calc, 
  //returning the calc state as it was when the Calculator app was first rendered
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  
  return (
    <div className = "cal">
      <h1>Simple Calculator 3</h1>
      <Wrapper>
      <Screen value={!calc.res && calc.sign 
        ? "0" + calc.sign + (calc.num===0 ? "" : calc.num)
        : !calc.num && !calc.res
        ? "0"
        :((calc.res===0 ? "" : calc.res) + (calc.sign) + (calc.num===0 ? "" : calc.num))} />
      <ButtonBox>
      {btnValues.flat().map((btn, i) => {
        return (
          <Button
            key={i}
            //differentiate the button color
            className={
              btn === "=" 
              ? "equals" 
              : btn === "/" || btn === "X" || btn === "-" || btn === "+" || btn === "+/-" || btn === "%"
              ? "signs"
              : btn === "C"
              ? "clear"
              : ""
            }
            value={btn}
            //if user click on certain button, detect button type and call the handler
            onClick={
              btn === "C"
              ? resetClickHandler
              : btn === "+/-"
              ? invertClickHandler
              : btn === "%"
              ? percentClickHandler
              : btn === "="
              ? equalsClickHandler
              : btn === "/" || btn === "X" || btn === "-" || btn === "+"
              ? signClickHandler
              : btn === "."
              ? decimalClickHandler
              : numClickHandler
            }
          />
        );
      })}
      </ButtonBox>
    </Wrapper>
    </div>
  );
}

export default SimpleCalculator;