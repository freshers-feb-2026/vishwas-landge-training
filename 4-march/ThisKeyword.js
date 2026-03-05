

let obj = {
    name: "vishwas",
    greet:function(){
        (() => {
            (() => {
                console.log("This in Arrow Fnc : " ,this.name)
            })()
        })()

    },
    greet2(){
       
        (function(){
            console.log("This in Normal Fnc : " ,this.name)
        })()

    }


}

console.log("Global This : ",this)

console.log("\n====== copy fnc ===\n ")

const copy =obj.greet;
// You are copying the function reference, not the object context.
// Because this depends on how the function is called, not where it was defined.
copy();
console.log("\n====== fnc ===\n ")
// the function is called through the object.
obj.greet();
obj.greet2();

// this is same 
// class greetHelo {
//     constructor(name) {
//         this.name = name
//         console.log(this)
//     }
// }

function greetHelo(name){
    this.name=name;
    console.log(this)
  }

const user=new greetHelo("Vishwas");
console.log(user)

for (const key in user) {
      console.log(user[key])
}

// new greetHelo("Rahul")

// JavaScript automatically does these steps:

// Creates a new empty object {}

// Sets this to that new object

// Adds properties (this.name)

// Returns the object automatically




// if you define a function outside and attach it to an object, 
// calling it through the object will correctly set this to that object.
// This works because this depends on how the function is called,
//  not where it was defined.


// function greet() {
//     console.log(this.name);
//   }
  
//   let obj = {
//     name: "vishwas",
//     greet: greet
//   };
  
//   obj.greet();





// Manipulate this using fnctions 

//// call() runs the function immediately and passes arguments one by one.

function greet(city) {
    console.log(this.name + " from " + city);
  }
  
  const person = {
    name: "Vishwas"
  };
  
  greet.call(person, "Pune");


  //  apply() also runs the function immediately,
  //  but arguments are passed as an array.

  const person2 = {
    name: "Vishwas2"
  };
  greet.apply(person2, ["Pune"]);


// bind() returns a new function with this fixed.

const person3 = {
    name: "Vishwas3"
  };
  
const newFunc = greet.bind(person3);
newFunc("Pune");