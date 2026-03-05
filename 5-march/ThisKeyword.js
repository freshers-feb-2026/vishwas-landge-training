

let obj = {
    name: "vishwas",
    greet() {
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


