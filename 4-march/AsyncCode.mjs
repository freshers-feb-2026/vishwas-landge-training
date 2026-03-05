// import {a }from './CallBack.mjs'
const getUser=(userId)=>{
    
    return new Promise((resolve)=>{

      const user ={name:"vishwas" , id : userId}
      setTimeout(()=>{
          console.log("\n==== CallBack Hell Replace With Promise ===\n")
          resolve(user)
      }, 2000)
    })
}

const getOrders=(user)=>{
  
     return new Promise((resolve)=>{
         const orders=["order1", "order2"]
         setTimeout(()=>resolve(orders), 200)
     })
}

const getOrderDetails = (orders)=>{
  
    return Promise.resolve("Deatils of orders : " + orders)

}

console.log("Top Level Start")

async function fetchData(){
 console.log("Syce Code in Async")
 const user =  await getUser(123)
 Promise.resolve("Hii")
 console.log("Hii after primis")
 const orders = await getOrders(user);

 const orderDetails = await getOrderDetails(orders);
 console.log(user)
 console.log(orders)
 console.log(orderDetails)

}

// extra Knowledge

Promise.reject("hii")
// .then(()=>console.log("Hii rejected"))
.catch(()=>console.log("Rejected in catch first"))
.finally(()=>{
    console.log("Finally one")
})
// check promise reection is hadeled or not
//  when the both callstack and queue is empty..

Promise.reject("Error Promise")
.then(()=>console.log("Hii success"))
.catch(()=>console.log("Rejected in catch secound"))
.finally(()=>{
    console.log("Finally Secound")
})
//so this will run "Hii success" but other next code will not run
// like getUser api

setTimeout(()=>{
console.log("Still Run")
} , 4000)


fetchData()

console.log("Top level End")



