
const getUser = (id) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({ id: id, name: "Vishwas" })
        }, 6000)

    })
}

const getUserOrders = (id) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            reject("err : User not found")
            resolve([{ id: 1, order: "phone" }, { id: 2, order: "laptop" }])
        }, 1000)

    })
}

const getUserData = async (id) => {

    //   const user = await getUser(id); //single call
    //   console.log(user)

    try {

        console.log("Sync Code In Async Function")

        // const data = await Promise.all([getUser(id) , getUserOrders(id) ])
        // const data= await Promise.any([getUser(id) , getUserOrders(id) ])
        // const data= await Promise.race([getUser(id) , getUserOrders(id) ])
        const data = await Promise.allSettled([getUser(id), getUserOrders(id)])
        console.log(data)

    } catch (e) {
        console.log(e)
    }

}

getUserData(1)

console.log("Top level Sync Code")
