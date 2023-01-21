"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb+srv://lyann:lyann@avalon-db.pdyevcb.mongodb.net/avalon-db?retryWrites=true&w=majority";
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
