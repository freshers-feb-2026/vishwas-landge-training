console.log("Top Code Start")
Promise.reject("hii")
// .then(()=>{ throw new Errow("Haha error")})
//  //will act like rejected promise even if u throw eroor
.then(()=>console.log("Hii success first"))
// .catch(()=>console.log("Rejected in catch first"))
.finally(()=>{
    console.log("Finally one")
})
// node js check promise reection is hadeled or not
//  when the both callstack and queue is empty..

Promise.resolve("data Promise")
.then((data)=>{console.log("Hii success secound");return data})
.catch(()=>console.log("Rejected in catch secound"))
.finally(()=>{
    console.log("Finally Secound")
})
.then((data)=>
    console.log("data from second after finally : " ,data))
//so this will run "Hii success secound" 
// but other next code will not run
//  like settimeout

setTimeout(()=>{
console.log("Still Run")
} , 4000)


console.log("Top Code End")


// Top Code Start
// Top Code End
// Hii success secound
// Finally one
// Finally Secound

// Error  : UnhandledPromiseRejection: T


