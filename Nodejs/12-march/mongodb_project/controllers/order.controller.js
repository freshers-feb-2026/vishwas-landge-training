import Order from "../models/orders.js";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";
import { validateOrderData } from "../utils/index.js";
import fs from "fs";
import path from "path"
import PDFDocument from "pdfkit";

export const createOrder = async (req, res) => {

        const orderData = req.body;

        const error = validateOrderData(orderData)

        if (error) {
            throw new AppError(error , 400)
        }

        const user = User.findById(orderData.id);

        if (!user) {

            throw new AppError("User not found" , 404)

        }

        const order = await Order.insertOne(orderData);

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: order
        })

}

export const getAllOrders = async (req, res) => {


       const orders = await Order.find().populate("userId");
       return res.status(200).json({
            success:true,
            message:"orders fetched successfully",
            orders
        })

}

export const getInvoice = async(req,res)=>{
  
    let {id} = req.params;
    const invoiceName = "invoce-" + id + ".pdf";
    const invoicePath = path.join("data" , "invoices" , invoiceName)

    const order = await Order.findById(id);
    console.log(order)

    if (fs.existsSync(invoicePath)) {

        const file = fs.createReadStream(invoicePath);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=${invoiceName}`);

        return file.pipe(res);
    }
    
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(invoicePath)); //write pdf in servers folder chunk by chunk
    doc.pipe(res); //send chuck in browser
    //What pipe() does
    // PDFKit generates the PDF as a stream of data.
    // pipe() sends that data to a destination. 
    doc.text("Invoice");
    doc.moveDown()

    doc.fontSize(20).text(order.product, {
        align: "center"
    });

    doc.end();


    // method 1 reading pdf and sending
    // this is like preloading data will consume RAM like 400mb of RAM if file size is 400mb
    // fs.readFile(invoicePath , (err , data)=>{

    //     if(err){
    //         throw new AppError(err);
    //     }
        
    //     res.setHeader("Content-Type" , "application/pdf")
    //     res.setHeader("Content-Disposition" , `inline; filename=${invoiceName}`)
    //     // res.setHeader("Content-Disposition", `attachment; filename=${invoiceName}`)
    //     // This can automatically download the file forceingly
             
          

    //     res.send(data);

    // })
     


    // method 2 reading pdf and sending by chunks
    //  we send data in stream rather than loading in RAM.. will only load chunk in RAM

//      const file = fs.createReadStream(invoicePath)
//      res.setHeader("Content-Type" , "application/pdf")
//      res.setHeader("Content-Disposition" , `attachment; filename=${invoiceName}`)
//      file.pipe(res) //will write inchunk and automatically do req.end() as well 


}




//   1️ Using res.sendFile() (Open file in browser)

    //stream the file automatically set header according to extention by detecting it
    // Content-Type: application/pdf
    // Content-Disposition: inline

    // res.sendFile(invoicePath, (err) => {
    //     if (err) {
    //         next(err);
    //     }
    // });

//  2️ Using res.download() (Force download)   
// Content-Type: application/pdf
// Content-Disposition: attachment; filename="invoice-123.pdf"
// res.download(invoicePath, invoiceName, (err) => {
//         if (err) {
//             next(err);
//         }
//     });


// You don’t need:

// fs.readFile()
// fs.createReadStream()
// headers manually
