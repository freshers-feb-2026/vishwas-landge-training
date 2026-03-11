import express from "express"

const app =express();

app.use(express.json())

// Always remeber order matters


app.use((req,res , next)=>{ //same like  app.use( "/" , (req,res , next)=>{
    console.log("This Always run")
    next();
})

app.use("/lets",(req,res)=>{
  
console.log("This is body  : " ,req.body)
//   res.send()
 res.json({name : "viswwas"})

 console.log("end===============")
 return;
})

// app.use("/" , (req,res)=>{  //it uses satrtWith comparison so it will run for every req beacue every reqs path start with "/"
//     console.log("hello")
//     res.send("Hello")
// })

app.use("/product" , (req,res, next)=>{  
//will always run for every req whose path start with /product not matter which req method 

 req.send("Alwasys runs for product")
 next();

})

app.use("/hi" , (req,res)=>{
    console.log("hii route")
    res.send("HII")
})


app.use((req,res)=>{
  res.send("Page Not found")
})

app.listen(3000)





