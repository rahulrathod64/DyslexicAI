import mongoose from 'mongoose';

const ParentSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  studentUsername: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 }
});

export default mongoose.models.Parent || mongoose.model("Parent", ParentSchema);
