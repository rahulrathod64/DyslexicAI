const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  username: { type: String, required: true },
  videoLinks: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Fix: Check if model already exists to avoid OverwriteModelError
export default mongoose.models.Posts || mongoose.model("Posts", StorySchema);
// module.exports = mongoose.models.Posts || mongoose.model("Posts", StorySchema);

// import mongoose from 'mongoose';

// const StorySchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   videoLinks: { type: [String], required: true },
//   title: { type: [String], required: true },
//   description: { type: [String], required: true }
// });

// export default mongoose.models.Posts || mongoose.model("Posts", StorySchema);
