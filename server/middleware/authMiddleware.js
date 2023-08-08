import jwt from 'jsonwebtoken';

// protected route token based

export const 
requireSignIn = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};



// admin acess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
    if (user.role !== 1) {
        return res.status(401).send({
            success: false,
            message: "unauthorize acess"
        })
    }
    else {
        next()
    }
    } catch (error) {
         console.log(error)
         res.status(401).send({
            success:false,
            error,
            message:"error in admin middleware"
         })
    }
}