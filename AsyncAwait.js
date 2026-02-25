
const getUser =(id) =>{
    
    return new Promise ((resolve , reject)=>{
        
        setTimeout(()=>{
            resolve({id:id , name:"Vishwas" })
        }, 2000)
        
    })
}

const findUser = async(id)=>{
    
const user = await getUser(id);
console.log(user)
    
}

findUser(1)

console.log("Sync Code")