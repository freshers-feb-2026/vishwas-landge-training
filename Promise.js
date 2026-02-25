
// Promise

const createOrder = (cart) => {
    return new Promise((resolve, reject) => {

            const orderId = "353534"
            setTimeout(() => {
                resolve(orderId)
            }, 5000)

            // reject("Cart Validation Failed")
    })
}

const paymentProcceed = (orderId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Payment Successfull : " + orderId)
        }, 2000)
    })
}

const promise = createOrder(cart);

promise.then((orderId) => {
    console.log(orderId)
    return orderId;

}).then((orderId) => {
    return paymentProcceed(orderId)

}).then((data) => {
    console.log("This is Data : ", data)

}).catch((err) => console.log(err))

console.log("Started")