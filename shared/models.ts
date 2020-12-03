import UserSchema from "./user";
import { connection } from "./connection";

const User = connection.model("User", UserSchema)

export { User }