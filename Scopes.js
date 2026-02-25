// 1. Global Scope

let name = "Vishwas";

function greet() {
  console.log(name);
}

greet(); // Vishwas

// 2. Function Scope (var)

function test() {
  var age = 22;
  console.log(age);
}

test();
// console.log(age);  Error (not accessible outside)

// 3. Block Scope (let, const)
if (true) {
  let city = "Pune";
  const country = "India";
}

// console.log(city); Error

// let and const are block scoped.
// var is function scoped.