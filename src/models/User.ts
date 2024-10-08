import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  email: {
    type: String,
    required: true,
    max: 225,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = model<IUser>("User", UserSchema);
export default User;
