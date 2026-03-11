// functions are first class citizens in javascript means we can pass function as an argument to another function
"use strict";
function say(a, b) {
    console.log("2 arguments");
    console.log("arguments : ", arguments);
  }

function say(a,b,c) { //this will override the previous function
    console.log("3 arguments");
    console.log("arguments : ", arguments);
  }
say(1,2,3)
say(1,2) //fnc overloading is not supported in javascript

console.log("\n============= Wellcome fnc ==============\n")
function welcome(message='Hi') { //default paramerters
    console.log(message);
}

welcome(); // 'Hi'
welcome(undefined); // 'Hi'
welcome(null); // 'null'
welcome('Hello'); // 'Hello'

console.log("\n===================================================\n")


function add(a,b){
    // this={name:"Shoaib"} //Syntax error : Invalid left-hand side in assignment
    console.log("Hii my name is " + this.name)
    console.log("this in add function" ,this)
    return a+b;
}

// call and apply both are same but call takes arguments 
// as separate arguments 
// and apply takes arguments as an array

add.call({name:"Vishwas"}, 1, 2)
add.apply({name:"Aves"}, [1, 2])

// bind returns a new function with the this bound to the given object
const add2 = add.bind({name:"Shoaib"})
add2(1, 2) //then we can pass arguments to the new function


console.log("\n==================Medetory arguments=========\n")

// Make Arguments medatory
function requiredArg() {
    throw new Error('The argument is required');
 }
 function sum(x = requiredArg(), y = requiredArg()){
    return x + y;
 }
 
//  sum(10); // error
 console.log(sum(10,20))  // OK



 console.log("\n===================================================\n")
