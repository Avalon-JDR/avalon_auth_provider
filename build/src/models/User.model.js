"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = mongoose.model("User", {
    nickname: String,
    password: String,
    email: String,
    avatar: String,
});
exports.default = UserModel;
