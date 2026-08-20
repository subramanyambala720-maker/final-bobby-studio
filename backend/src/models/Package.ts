import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  tier: 'silver' | 'gold' | 'platinum' | 'custom';
  price: number;
  originalPrice?: number;
  badgeText?: string;
  description: string;
  features: string[];
  isPopular: boolean;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    tier: {
      type: String,
      required: true,
      enum: ['silver', 'gold', 'platinum', 'custom'],
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    badgeText: { type: String },
    description: { type: String, required: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPackage>('Package', PackageSchema);
