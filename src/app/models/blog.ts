import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String, required: false }, // New field for image URL
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
