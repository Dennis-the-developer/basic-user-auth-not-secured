import { userModel } from "../model/userModel.js"; 

//  USER SIGNUP
export const signupUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body; 
        const newUser = await userModel.create({ email, password, username }); 
        res.status(201).json({ message: 'User created successfully' }); 
    } catch (error) {
        if (error.code === 11000) { // duplicate key error (User Already exist)
            res.status(400).json({ message: 'User already exists' }); // Responed with user already exist
        } else {
            next(error);
        }
    }
};

//  USER LOGIN
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }); 
        console.log(user);
        if (!user || user.password !== password) { // User not existing or password mismatch
            return res.status(401).json({ message: 'Invalid email or password' }); 
        }
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        next(error); 
    }
};
