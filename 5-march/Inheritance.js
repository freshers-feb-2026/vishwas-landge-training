// JavaScript Prototypal Inheritance

// In this programming paradigm, a class is a blueprint for creating objects.
// If you want a new class to reuse the functionality of an existing class,
// you can create a new class that extends the existing class. 
// This is called classical inheritance.

// JavaScript doesn’t use classical inheritance. 
// Instead, it uses prototypal inheritance.

let parent = {
    name:"sheshrao",
    greet(){
        console.log("Hii, ", this.name)
    },
}



let child = Object.create(parent, {
    name: {
    value:"vishwas"
    }
})

child.greet();
console.log(child.__proto__)
console.log(child.__proto__== parent)

// Inheritance allows an object to use the properties and methods of another object
//  without duplicating the code.