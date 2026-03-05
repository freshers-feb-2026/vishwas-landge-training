import fs from "fs";

fs.writeFileSync("hello.txt", "Hello world")


import http from "http"

let name = "guest"

const server = http.createServer((req, res) => { //whenever req come this fnc will run

    console.log(req.method + " " + req.url + " ")

    if (req.url == "/message" && req.method == "POST") {

        const body = []
        req.on("data", (chuck) => { //each chunk is buffer of 16kb max

            body.push(chuck) //array of buffers one buffer 16kb

        })
        // return it otherwise next code will run.. rather than using if else
        return req.on("end", () => {

            console.log("Body : ", body); // stores raw binary data but when u print it node js shows as hexadecimaly for readiability
            const parsedBody = Buffer.concat(body).toString() //combines buffers into one.
            // Buffer.concat() returns a single Buffer object that combines multiple buffers together.
            name = parsedBody.split("=")[1]
            //file write name
            fs.writeFile("allNames.txt", name, err => { //async file writing
                res.statusCode = 302 //redirect status code otherwise it will  ignore location header
                res.setHeader("Location", "/") //where to redirect
                return res.end()
            })

            // // when you are reading body u should always use res.end() in req.on("end") event otherwise next code direcly run and may send response
            // // If you don’t care about the request body, you can respond immediately.
            // res.statusCode = 302 //redirect status code otherwise it will  ignore location header
            // res.setHeader("Location", "/") //where to redirect
            // return res.end()
        })

        // u can also just do here :  return;


    }
    //  else {

    res.setHeader("Content-Type", "text/html") //tell browser which type of response we are sending
    res.write("<h1>Hii My name is Vishwas</h1>")
    res.write("<h2>Hello World</h2>")
    // if(name=="guest"){
    res.write(`<form method="POST" action="/message"><h2> Your Name :${name} </h2> <input type="text" name="name" /> <button type="submit">Submit </button></form>`)
    // }else{
    //     res.write(`Hii ,Your name is :  ${name}`)
    // }
    return res.end()
    // }



})

server.listen(3000);



// Stream → sends/receives data in chunks -- Streams produce buffers
// Buffer → stores raw binary data but when u print it node js shows as hexadecimaly for readiability

// Stream = movement of data
// Buffer = container holding data



// A Buffer is a temporary memory area used to store binary data.
// Node uses buffers because JavaScript normally cannot directly handle raw binary data.