"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const user_service_1 = require("../services/user/user.service");
const register = (req, res) => {
    const { nickname, email, password, avatar } = req.body;
    if (!nickname || !email || !password) {
        return res.status(400).json({
            code: "missing_fields",
            message: "Missing fields",
        });
    }
    (0, user_service_1.registerUser)({ nickname, email, password, avatar })
        .then((user) => {
        res.status(200).json(user);
    })
        .catch(() => {
        res.status(500).json({
            code: "internal_error",
            message: "Internal error",
        });
    });
};
exports.register = register;
