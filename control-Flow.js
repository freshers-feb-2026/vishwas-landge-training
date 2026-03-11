// ternary operator

let age = 18;
let message;

age >= 16 ? (message = 'You can drive.') : (message = 'You cannot drive.');
// message = age >= 16 ? 'You can drive.' : 'You cannot drive.';
console.log(message);


console.log("\n=========== switch ==========\n")

// switch 
//if we dont use break it will ignore next case and will execute all
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("apple");

  case "banana":
    console.log("banna");

  case "mango":
    console.log("This is a fruit");
    break;
 
  case "orange":
     console.log("orange")
     break;

  default:
    console.log("Unknown");
}

// 