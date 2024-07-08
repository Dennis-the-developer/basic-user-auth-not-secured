import { userModel } from "../model/userModel.js"; 

//  USER SIGNUP
export const signupUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        if (username === "" || username == null || username == undefined){
            res.status(400).json("Username cannot be empty");
        } else {
            const newUser = await userModel.create({ email, password, username }); 
            res.status(201).json('User created successfully');
        }
         
    } catch (error) {
        if (error.code === 11000) { // duplicate key error (User Already exist)
            res.status(400).json('User already exists'); // Responed with user already exist
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
        if (!user || user.password !== password) { // User not existing or password mismatch
            return res.status(401).json('Invalid email or password'); 
        }
        else {
            res.status(200).json(`Login successful \n Welcome ${user.username}`);
        }
    } catch (error) {
        next(error); 
    }
};
