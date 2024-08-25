import { Schema, model } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    blogTitle: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Diet',
        'Lifestyle',
        'Sports',
        'Fitness',
        'Exercise',
        'Tools',
        'Health-Care',
      ],
      required: true,
    },
    authorName: { type: String, required: true },
    imageLink: { type: String, required: true },
    description: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// create query middleware
blogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.statics.isBlogExists = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
