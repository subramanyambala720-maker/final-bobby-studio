import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, default: 'Bobby Studio Team' },
    category: { type: String, default: 'Photography Tips' },
    tags: [{ type: String }],
    readTime: { type: String, default: '5 min read' },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    metaTitle: { type: String },
    metaDescription: { type: String },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
