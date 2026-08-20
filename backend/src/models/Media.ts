import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  name: string;
  url: string;
  publicId?: string;
  type: 'image' | 'video';
  folder: string;
  bytes: number;
  format: string;
  width?: number;
  height?: number;
  createdAt: Date;
}

const MediaSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    folder: { type: String, default: 'general' },
    bytes: { type: Number, default: 0 },
    format: { type: String, default: 'jpg' },
    width: { type: Number },
    height: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IMedia>('Media', MediaSchema);
