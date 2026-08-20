import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  timeSlot: string;
  packageChoice?: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  assignedPhotographer?: string;
  specialNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    eventDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    packageChoice: { type: String },
    estimatedPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid'],
      default: 'unpaid',
    },
    assignedPhotographer: { type: String, default: 'Unassigned' },
    specialNotes: { type: String },
  },
  { timestamps: true }
);

BookingSchema.index({ eventDate: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
