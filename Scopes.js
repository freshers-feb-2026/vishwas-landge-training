// 1. Global Scope

let name = "Vishwas";

function greet() {
  console.log(name);
}

greet(); // Vishwas

// 2. Function Scope (var)

function test() {
  console.log(age); //undefined 
  // console.log(xs); //error will throw and next code will not run
  var age = 22;
  var age; // as we reclared but did not changed the value so it will have same value as before
  let xs=30;
  console.log(age);
}

test();
// console.log(age);  Error (not accessible outside)

// 3. Block Scope (let, const)
if (true) {
  let city = "Pune";
  const country = "India";
}
this.add=function(){
//this represets to the modul.exports in commonjs
  console.log("Add function");
}
console.log("Global : "  ,global)
console.log("This : "  ,  this)
console.log("GlobalThis : "  ,globalThis)
// console.log(city); Error

// let and const are block scoped.
// var is function scoped.


function getCounter() {
  counter = 10; //this will define variable globally with var..
  //  in strict mode will throw error 
  return counter;
}

console.log(getCounter());

var tx=20
{
  var tx=200
  console.log("This is block : " , tx) //200
}

console.log("This is outside block : " , tx) //200
var px=20;
console.log(this.px) //it will show undefinde becauuse in node js 
// In Node.js, var variables are scoped to the module wrapper function
//  and do not attach to the global object