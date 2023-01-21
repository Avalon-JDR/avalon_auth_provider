import mongoose from "mongoose";

const url =
  "mongodb+srv://lyann:lyann@avalon-db.pdyevcb.mongodb.net/avalon-db?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);


