
let num = 071; //in strict  mode throw error
console.log(num); //57 octal decimal


// octal :  0o followed by a sequence of octal digits 
num = 0o71;
console.log(num);


// Hexadecimal numbers start with 0x or 0X
//  followed by any number of hexadecimal digits 
// (0 through 9, and a through f)

num = 0x1a;
console.log(num); //26



let amount = 3.14e7; //e7 : E-notation multiply by 10 rest to power 7
console.log(amount); //31400000

amount = 5e-2; //e-2:  E-notation divid by 10 rest to power 7
console.log(amount); //0.05



// JavaScript automatically converts any 
// floating-point number with at least six zeros 
// after the decimal point into e-notation.

amount = 0.0000005;
console.log(amount); //5e-7

let n = 123;
n.toString();   // "123"

(255).toString(16);  // "ff" (hexadecimal)
(10).toString(2);    // "1010" (binary)


console.log(Number("071"))//71