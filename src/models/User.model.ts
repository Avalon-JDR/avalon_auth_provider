import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
});

const UserModel = mongoose.model("User", userSchema);

export interface IUser {
  nickname: string;
  password: string;
  email: string;
  avatar: string;
}

export default UserModel;
