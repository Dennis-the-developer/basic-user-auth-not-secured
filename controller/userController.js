import { userModel } from "../model/userModel.js";
import mailchecker from 'mailchecker';

const checkEmailFormat = mailchecker;

//  USER SIGNUP
export const signupUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        // SIGNUP CREDENTIAL VALIDATION
          // Check if Email is formatted properly
        if (checkEmailFormat.isValid(email)) {
            // Check if Password characters are 8 or more
            if (password.length < 8) {
                res.status(400).json('Password should have a minimum of 8 charaters');
                return;
            }
            // Check if username is having characters
            if (username === "" || username == null || username == undefined) {
                res.status(400).json("Username cannot be empty");
                return;
            // check if username is not starting with a number
            } else if (!isNaN(username[0])) { 
                res.status(400).json('Username cannot begin with a number');
                return;
            // Check if username length is 6 or more
            } else if(username.length < 6) {
                res.status(400).json('Username characters should be 6 or more');
                return;
            }
            else {
                // Creating account after successful checks
                const newUser = await userModel.create({ email, password, username });
                res.status(201).json('User created successfully');
                return;
            }
        }
         // Tell user to check and correct email format
        else {
            res.status(400).json(`${email} not formated properly. Check email again`);
            return;
        }
    } catch (error) {
        // Check for duplicate key error (User Already exist)
        if (error.code === 11000) {
            // Responed with user already exist
            res.status(400).json('User already exists');
            return;
        } else {
            next(error);
        }
    }
};

//  USER LOGIN
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user in database using user-email
        const user = await userModel.findOne({ email });
        // User not existing or password mismatch
        if (!user || user.password !== password) { 
            res.status(401).json('Invalid email or password');
            return;
        }
        else {
            res.status(200).json(`Login successful \n Welcome ${user.username}`);
            return;
        }
    } catch (error) {
        next(error);
    }
};
