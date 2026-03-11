let person = {
    firstName: 'John',
    lastName: 'Doe'
}

Object.defineProperty(person, 'fullName', {
    configurable:true,
    value:"hii",
    enumerable:true,
    writable:true,
    // get: function () {
    //     return this.firstName + ' ' + this.lastName;
    // },
    // set: function (value) {
    //     let parts = value.split(' ');
    //     if (parts.length == 2) {
    //         this.firstName = parts[0];
    //         this.lastName = parts[1];
    //     } else {
    //         throw 'Invalid name format';
    //     }
    // }
});

Object.defineProperty()

console.log(person)


// console.log(person.fullName);

// person.fullName="vishwas landge"
// console.log(person.firstName)



// [[Configurarable]] – determines whether a property can be 
//  removed via delete operator.
// [[Enumerable]] – indicates if a property can be returned in the for...in loop.
// [[Writable]] – specifies that the value of a property can be changed.
// [[Value]] – contains the actual value of a property.




// Define multiple properties:


var product = {};

Object.defineProperties(product, {
    name: {
        configurable:true,
        enumerable:true,
        value: 'Smartphone'
    },
    price: {
        writable:false,
        value: 799
    },
    tax: {
        writable:false,
        enumerable:true,
        value: 0.1
    },
    netPrice: {
        enumerable:true,
        get: function () {
            return this.price * (1 + this.tax);
        }
    }
});

