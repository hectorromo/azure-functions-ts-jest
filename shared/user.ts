// user.js
import { mongoose } from "./connection";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: { type: Date, default: Date.now },
});

export default User