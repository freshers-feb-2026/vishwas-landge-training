
const isAdmin = (req, res, next) => {


        if (req.session && req.session.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

}

export default isAdmin;