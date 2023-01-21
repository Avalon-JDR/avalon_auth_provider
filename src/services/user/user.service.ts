import UserModel, { IUser } from "../../models/User.model";
import bcrypt from "bcrypt";

export const registerUser = async ({
  nickname,
  email,
  password,
  avatar,
}: IUser) => {
  return await UserModel.create({
    nickname: nickname,
    password: bcrypt.hashSync(password, 10),
    email: email,
    avatar: avatar,
  });
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return {
    id: user._id,
    nickname: user.nickname,
    email: user.email,
    avatar: user.avatar,
  };
};
