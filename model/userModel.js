import {Schema, model} from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String},
}, {
    timestamps: true,
})

userSchema.plugin(toJSON);
// export user model
export const userModel = model('user', userSchema);