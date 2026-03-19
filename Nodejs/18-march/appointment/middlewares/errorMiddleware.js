const errorMiddleware = (err, req, res, next) => {

    if (err.isOperational) {
        return res.status(err?.status || 500).json({
            message: err.message,
            success: false,

        })

    }else{
        console.log("PROGRAMATIC ERROR : " , err)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })

    }



}

export default errorMiddleware;