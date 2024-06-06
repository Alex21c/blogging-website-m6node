import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firstName: {type: String, require: true},
  lastName: {type: String, required: false, default: ""},
  email: {type: String, reqiured: true},
  password: {type: String, required: true}
}, {timestamps: true});

const UserModel =  mongoose.model('users', UserSchema);
export default UserModel;