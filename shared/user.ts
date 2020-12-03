// user.js
import { mongoose } from "./connection";

const User = new mongoose.Schema({
    name: String,
    email: String,
    created: { type: Date, default: Date.now },
});

export default User