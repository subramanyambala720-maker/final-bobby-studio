import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioItem extends Document {
  title: string;
  slug: string;
  category: 'wedding' | 'pre-wedding' | 'maternity' | 'fashion' | 'corporate' | 'drone' | 'portrait';
  clientName?: string;
  eventDate?: string;
  location?: string;
  coverImage: string;
  galleryImages: string[];
  videoUrl?: string;
  description?: string;
  isFeatured: boolean;
  isPublished: boolean;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['wedding', 'pre-wedding', 'maternity', 'fashion', 'corporate', 'drone', 'portrait'],
    },
    clientName: { type: String },
    eventDate: { type: String },
    location: { type: String },
    coverImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    videoUrl: { type: String },
    description: { type: String },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);
