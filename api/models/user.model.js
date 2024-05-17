import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, maxlength: 50 },
  lastName: { type: String, maxlength: 50 },
  email: { type: String, maxlength: 75, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);