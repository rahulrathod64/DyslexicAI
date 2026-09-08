import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String, required: true, unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: { type: String, required: true, minlength: 8 }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
