import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

import './Calculator.css';
import Wrapper from "./CalculatorComponents/Wrapper";
import Screen from "./CalculatorComponents/Screen";
import ButtonBox from "./CalculatorComponents/ButtonBox";
//import Button from "./CalculatorComponents/Button";

export default class PEMDASCalculator extends Component {
    constructor(){
        super()
        this.state = {
                openP: "(",
                closeP: ")",
                MD: ["*","/"],
                AS: ["-","+"],
                decimal: ".",
                exponentUsed: false,
                operatorUsed: false,
                piUsed: false,
                justDecimalUsed: false,
        
                equation:"",
                currentNumber: "",
                
                numbers: [],
                nonNumbers: [],
                exponentList: []
        }
        this.preSolve = this.preSolve.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.solve = this.solve.bind(this);
        this.NewNumber = this.NewNumber.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
    }


    handleInput = async(e) =>{
        try{
            // checks for decimals
            let decIncluded = this.state.currentNumber.includes(".")
        
            // if the value is not a number and 
            // the value is *, /, + or - and
            // states currentNumber isn't nothing and
            // an operator hasn't been used and
            // there isnt just a decimal in states currentNumber THEN
            // the value is added to states nonNumbers
            if(isNaN(e.currentTarget.value) && (
            (this.state.MD.includes(e.currentTarget.value) ||
            this.state.AS.includes(e.currentTarget.value)) && 
            this.state.currentNumber !== ""  &&
            this.state.operatorUsed === false &&
            this.state.justDecimalUsed === false)){ 
                this.setState({
                    equation: this.state.equation + e.currentTarget.value,
                    nonNumbers: [...this.state.nonNumbers, e.currentTarget.value],
                    operatorUsed: true,
                    piUsed: false
                })
                this.NewNumber();     
            }

            // if the value is not a number and 
            // the value is *, /, + or - and
            // states currentNumber is something and
            // an exponent has been used or pi has been used and
            // an operator hasn't been used and
            // there isnt just a decimal in states currentNumber THEN
            // the value is added to states nonNumbers
            else if(isNaN(e.currentTarget.value) && 
            ((this.state.MD.includes(e.currentTarget.value) ||
            this.state.AS.includes(e.currentTarget.value)) && 
            this.state.currentNumber === "" && 
            (this.state.exponentUsed || this.state.piUsed) &&
            this.state.operatorUsed === false &&
            this.state.justDecimalUsed === false)){
                this.setState({
                    equation: this.state.equation + e.currentTarget.value,
                    nonNumbers: [...this.state.nonNumbers, e.currentTarget.value],
                    exponentUsed: false,
                    operatorUsed: true,
                    justDecimalUsed: false,
                    piUsed: false
                })     
            }   

            // if value is a decimal and 
            // a decimal hasn't been used yet and
            // and a exponent hasn't been used THEN
            // a decimal is added
            else if(e.currentTarget.value === "." && 
            decIncluded === false && 
            this.state.exponentUsed === false){
                this.addDecimal()
            }

            // if value is anyting other than a number and
            // the value is not an opperator OR
            // there is no current number and 
            // value is an opperator THEN
            // nothing happens
            else if(isNaN(e.currentTarget.value) && 
            ((this.state.MD.includes(e.currentTarget.value) === false ||
            this.state.AS.includes(e.currentTarget.value) === false) 
            ||
            (this.state.currentNumber === "" && 
            (this.state.MD.includes(e.currentTarget.value) === true ||
            this.state.AS.includes(e.currentTarget.value) === true))) ){
                return true;
            }

            // if a operator hasn't been used or
            // nothing is in states currentNumber and
            // value is pi
            else if((this.state.operatorUsed === false || 
                this.state.currentNumber === "") &&
                this.state.exponentUsed === false &&
                e.currentTarget.value ===  "3.14159265359"){
                    // no decimals have been used and an operator has been used
                    // pi is added to equation, the actual number is added to states numbers
                    // and states currentNumber is set to nothing. Also
                    // operatorUsed is set to false,
                    // exponentused is set to false and
                    // justDecimalUsed is also set to false
                    // piUsed is set to true
                    if((decIncluded === false && this.state.operatorUsed === true)
                    ||
                    (decIncluded === false && this.state.operatorUsed === false &&
                    this.state.currentNumber === "" &&
                    this.state.piUsed === false)){
                        this.setState({
                            equation: this.state.equation + "π",
                            numbers: await [...this.state.numbers, parseFloat("3.14159265359")],
                            currentNumber: "",
                            operatorUsed: false,
                            exponentUsed: false,
                            justDecimalUsed: false,
                            piUsed: true
                        })
                    }
                    
                }
            // if value is a number 0-9 value is added to
            // states equation and currentNumber and you can now use
            // an operator and justDecimal is set to false
            else if((this.state.operatorUsed === false || 
                this.state.currentNumber === "") &&
                this.state.exponentUsed === false &&
                this.state.piUsed === false){
                this.setState({
                    equation: this.state.equation + e.currentTarget.value,
                    currentNumber: this.state.currentNumber + e.currentTarget.value,
                    operatorUsed: false,
                    justDecimalUsed: false
            
                })
            }

            else{
                return
            }
        }
        catch(err){
            console.log("err", err)
        }
    }


    clear = () => {
        // erases everything from mutable state.
        this.setState({
            equation: "",
            currentNumber: "",
            numbers: [],
            nonNumbers: [],
            exponentList:[],
            exponentUsed: false,
            operatorUsed: false,
            piUsed: false,
            justDecimalUsed: false
        })
     }

     exponent = async(e) =>{
        try{ 
            if(this.state.operatorUsed === false && this.state.exponentUsed === false){
                if(this.state.currentNumber !== ""){
                await this.NewNumber();
                    this.setState({
                        exponentList: await [...this.state.exponentList, this.state.numbers.length - 1],
                        equation: this.state.equation + "²",
                        exponentUsed: true,
                        operatorUsed: false
                    })
                }
                // takes care of pi
                else if(this.state.piUsed){
                    this.setState({
                        exponentList: await [...this.state.exponentList, this.state.numbers.length - 1],
                        equation: this.state.equation + "²",
                        exponentUsed: true,
                        operatorUsed: false
                    })
                }
                
            }
            else{
                return
            }
        }
        catch(err){
            console.log(err)
        }
     }


    addDecimal = (e) => {
        // if there is nothing in states currentNumber a decimal is added 
        // and justDeciamalUsed is set to true to prevent just a decimal being
        // added as a number.
        if(this.state.currentNumber.length < 1){
            this.setState({
                currentNumber: this.state.currentNumber + ".",
                equation: this.state.equation + ".",
                justDecimalUsed: true,
                operatorUsed: false
            })
        }
        else{
            this.setState({
                currentNumber: this.state.currentNumber + ".",
                equation: this.state.equation + ".",
                justDecimalUsed: false,
                operatorUsed: false
            })
        }
    }


    NewNumber = async() => {
        try{
            // adds states currentNumber to numbers after being parsed 
            // and sets currentNumber empty again.
            this.setState({
                numbers: await [...this.state.numbers, parseFloat(this.state.currentNumber)],
                currentNumber: ""
            })
        }
        catch(err){
            console.log(err)
        }
    }


    preSolve = async() =>{
        try{
            // adds last number thats in states currentNumber to  states numbers.
            if(this.state.currentNumber !== "" && this.state.justDecimalUsed === false){
                await this.setState({
                    numbers: [...this.state.numbers, parseFloat(this.state.currentNumber)],
                    currentNumber: ""
                })
                this.solve()
            }
            // if nothing is in states currentNumber solve function is run.
            else{
                this.solve()
            }
        }
        catch(err){
            console.log(err)
        }
    }


    solve = async() => {
        try{
            // takes care of exponents
            for(let index = 0; index < this.state.exponentList.length; index++){
                
                try{
                    let newNum = this.state.numbers[this.state.exponentList[index]] ** 2
                    let newNumArray = [...this.state.numbers]
                        await newNumArray.splice(this.state.exponentList[index], 1, newNum)                    
                    
                    await this.setState({
                        numbers: newNumArray
                    })
                }
                catch(err){
                    console.log(err)
                }
            };
            this.setState({
                exponentList: []
            })
            let val = this.state.nonNumbers.length;
            let moved = 0;
            if(val > 0){
            // solves for Multiplication and Division 
            for(let index = 0; index < val; index++){  
                let array = this.state.numbers;
                if("*" === this.state.nonNumbers[0 + moved] ){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] * this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])+ 1]
                    let removedIndex = await this.state.numbers.indexOf(this.state.numbers[moved], moved)
                    await array.splice(removedIndex, 2, value)
                    await this.state.nonNumbers.splice(removedIndex, 1)
                    await this.setState({
                        numbers: [...array]
                    })
                
                    
                }
       
                else if("/" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] / this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let removedIndex = await this.state.numbers.indexOf(this.state.numbers[moved], moved)
                    await array.splice(removedIndex, 2, value)
                    await this.state.nonNumbers.splice(removedIndex, 1)                    
                    await this.setState({
                        numbers: [...array]
                    })
                }

                else if(this.state.nonNumbers[0 + moved] !== "*" && this.state.nonNumbers[0 + moved] !== "/"){
                    moved++;
                }
            }


            let val2 = this.state.nonNumbers.length;
            // solves for Additon and Subtraction
            for(let index = 0; index < val2; index++){
                let array = this.state.numbers;
                if(this.state.nonNumbers[0] === "+"){
                    let value = this.state.numbers[0] + this.state.numbers[1];
                    await array.splice(0, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }
       
                else if("-" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] - this.state.numbers[1]
                    await array.splice(0, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }
            }
        }
        else{
            // Nothing thing here
        }
            // Final number is set to equation and currentNumber is set the final number
            return this.setState({
                equation: await this.state.numbers,
                currentNumber: await this.state.numbers,
                numbers: [],
                exponentUsed: false,
                operatorUsed: false,
                justDecimalUsed: false,
                piUsed: false
            })
        }
        catch(err){
            console.log(err)
        }

    }

    render() {
        return(
            <div className="cal">
                
                <Form>
                <h1>PEMDAS Calculator</h1>
                <p>
                    Please enter 2π as 2*π
                <br></br>
                    Still working on parentheses
                </p>
                
                <Wrapper>
                  <Screen className="width" value={this.state.equation} type="text"/>
                    <ButtonBox>
                        
                        <Button value="C" onClick={this.clear} className="clear">C</Button>
                        <Button value="x²" onClick={this.exponent} className="signs">x²</Button>
                        <Button value="3.14159265359" onClick={this.handleInput} className="signs">π</Button>
                        <Button value="/" onClick={this.handleInput} className="signs">/</Button>
                      
                        <Button value="9" onClick={this.handleInput}>9</Button>
                        <Button value="8" onClick={this.handleInput}>8</Button>
                        <Button value="7" onClick={this.handleInput}>7</Button>
                        <Button value="*" onClick={this.handleInput} className="signs">*</Button>
                      
                        <Button value="6" onClick={this.handleInput}>6</Button>
                        <Button value="5" onClick={this.handleInput}>5</Button>
                        <Button value="4" onClick={this.handleInput}>4</Button>
                        <Button value="-" onClick={this.handleInput} className="signs">-</Button>
                      
                        <Button value="3" onClick={this.handleInput}>3</Button>
                        <Button value="2" onClick={this.handleInput}>2</Button>
                        <Button value="1" onClick={this.handleInput}>1</Button>
                        <Button value="+" onClick={this.handleInput} className="signs">+</Button>
                        
                        <Button value="0" onClick={this.handleInput}>0</Button>
                        <Button value="." onClick={this.handleInput}>.</Button>
                        <Button value="=" onClick={this.preSolve} className="equals" >=</Button>
                      
                    </ButtonBox>
                </Wrapper>
                </Form>
            </div>
        )
    }
}