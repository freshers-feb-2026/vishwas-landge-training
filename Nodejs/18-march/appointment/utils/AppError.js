class AppError extends Error {
 
    constructor(message , status){  
        super(message);
        this.status = status,
        this.isOperational=true
    }

}

export default AppError;