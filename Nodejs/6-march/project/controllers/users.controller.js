import { validateUser } from "../utils/index.js";

const users = [];

export const addUser = (req, res) => {

    const user = req.body;
    
    try {

        users.push(user);

        const error = validateUser(user)
        // console.log(error)
        if(error){
            return res.status(400).json({
                success: false,
                message:error,
            })
        }
        user.id=Date.now().toString();
        return res.status(201).json({
            success: true,
            message:"User created Successfully",
            user
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const getUser = (req, res) => {

    const {id } = req.params;
   
    try {

      const user= users.find((user) =>user.id==id)
      
      if(!user){
       return res.status(404).json({
            success:false,
            message:"User not found"
        })
      }
       
      return res.status(201).json({
            success: true,
            user
      })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export const getAllUsers = (req, res) => {


    try {

       
        return res.status(200).json({
            success: true,
            message:"Users Fetched Successfully",
            users
      })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const updateUser = (req, res) => {

    const {id } = req.params;
   
    try {
      const index = users.findIndex(user => user.id == id);
      
      if(index==-1){
        res.status(404).json({
            success:false,
            message:"User not found"
        })
      }

      delete req.body.id;
      
      users[index] = {...users[index],...req.body};
       
      return res.status(201).json({
            success: true,
            message:"User updated Successfully",
            user:users[index]
      })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const deleteUser = (req, res) => {

    const {id } = req.params;
   
    try {

     const index = users.findIndex(user => user.id == id);

      
      if(index==-1){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
      }

      users.splice(index , 1)
       
      return res.status(201).json({
            success: true,
            message:"User deleted Successfully"
      })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



