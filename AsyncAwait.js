
const getUser =(id) =>{
    
    return new Promise ((resolve , reject)=>{
        
        setTimeout(()=>{
            resolve({id:id , name:"Vishwas" })
        }, 2000)
        
    })
}

const findUser = async (id) => {
    
    console.log("Sync Code In Async Function")
    const user = await getUser(id);
    console.log("Data From API : ", user)
    
}

findUser(1)

console.log("Sync Code")