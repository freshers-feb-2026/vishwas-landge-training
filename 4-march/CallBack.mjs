// In JavaScript, functions are first-class citizens.
// Therefore, you can pass a function to another function as an argument.

let arr = [1, 2, 3, 4]

const oddNum = arr.filter((el) => el % 2 != 0);
console.log("odd numbers : ", oddNum)


// There are two types of callbacks:
//  synchronous and asynchronous callbacks.


// process is a global function, so technically you could call it directly.
// But passing it as a callback makes the function 
// more flexible and reusable.

function download(url, callback) {
    setTimeout(() => {
        console.log(`\nDownloading ${url} ...`);
        callback(url);
    }, 1000);
}

function process(picture) {
    console.log(`Processing ${picture}`);
}

let url = 'The_Link';
download(url, process);


// Now the same download function can do different things after download.
function saveToDisk(file) {
    console.log("Saving file to disk");
}

function displayImage(file) {
    console.log("Displaying image");
}

download(url, saveToDisk);
download(url, displayImage);


// function download(url, callback) {  //real world code
//     fetch(url)
//         .then(response => response.blob())
//         .then(data => {
//             console.log("Download completed");
//             callback(data);
//         });
// }






// When each async task depends on the result of the previous task, 
// developers often nest callbacks, leading to callback hell.

let getUser =(userId , callback)=>{
    
    setTimeout(()=>{
        console.log("\n============ CallBack Hell ==============\n")
        const user ={name:"vishwas" , id : userId}
        callback(user)
    }, 2000)

}

let getOrders=(user,callback)=>{
    
    setTimeout(()=>{
      const orders=["order1", "order2"]
      callback(orders);
    }, 2000)

}

let getOrderDetails = (orders ,callback)=>{
     
    setTimeout(()=>{
        console.log("order details fetched..")
        callback("This are Deatils  : "+ orders)
    }, 2000)

}


getUser(123 , (user)=>{
    console.log("Got User : " , user)
    
    getOrders(user , (orders)=>{
       
      console.log("Got Orders : " , orders)
      
      getOrderDetails(orders , (details)=>{
         console.log(details)
      })

    })
     

})




// CallBack Hell Replace With Promise


getUser=(userId)=>{
    
    return new Promise((resolve)=>{

      const user ={name:"vishwas" , id : userId}
      setTimeout(()=>{
          console.log("\n==== CallBack Hell Replace With Promise ===\n")
          resolve(user)
      }, 2000)
    })
}

getOrders=(user)=>{
  
     return new Promise((resolve)=>{
         const orders=["order1", "order2"]
         setTimeout(()=>resolve(orders), 200)
     })
}

getOrderDetails = (orders)=>{
  
    return Promise.resolve("Deatils of orders : " + orders)

}


getUser(123)
.then((user) => {
    console.log("Got User : " , user)
    return getOrders(user)
})
.then((orders)=>{
     console.log("Got orders : " , orders)
     return getOrderDetails(orders)
})
.then((details)=>{
//   return Promise.reject("Thats is Error ")  
   console.log(details)
}).then(()=>{
    console.log("End Of Promise Chain")
})
.catch((err) => {
    console.log(err)
});

console.log("\n=== Top level End === \n")

export const a=90;

