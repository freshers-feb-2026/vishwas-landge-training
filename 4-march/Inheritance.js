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


// single inheritance
let child = Object.create(parent, {
    name: {
    value:"vishwas"
    }
})
// is same as  child.__proto__== parent
// Changing __proto__ after an object is created can slow down JavaScript engines.
// But Object.create() sets the prototype during object creation, which is faster.



child.greet();
console.log(child.__proto__)
console.log(child.__proto__== parent)

// Inheritance allows an object to use the properties and methods of another object
//  without duplicating the code.

// Javascripct support inheritance by prototype chain



// multiple inheritance  (object.assign copies the propery )
// If two objects have the same property, 
// the later one overwrites the earlier one.
const obj1 = {
    name: "Vishwas",
    address: {
      city: "Pune"
    }
  };

const obj3={
 
    name:"vishwas landge"
}  
  
  const obj2 = Object.assign({}, obj1, obj3);
  
  obj2.address.city = "Mumbai";
  
  console.log(obj1.address.city); //mumbai




// Object.assign()	      ==  Copies property references
// Prototype inheritance  ==  Uses prototype chain lookup