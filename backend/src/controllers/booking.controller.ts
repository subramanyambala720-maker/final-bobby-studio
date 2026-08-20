import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, date } = req.query;
    let query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (date) {
      query.eventDate = date;
    }
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query.$or = [
        { customerName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { bookingId: searchRegex },
        { service: searchRegex },
      ];
    }
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMonthlyBookingCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year, month } = req.query;
    const currentYear = year ? Number(year) : new Date().getFullYear();
    const currentMonth = month ? Number(month) : new Date().getMonth() + 1;

    const paddedMonth = String(currentMonth).padStart(2, '0');
    const datePrefix = `${currentYear}-${paddedMonth}`;

    const bookings = await Booking.find({
      eventDate: { $regex: `^${datePrefix}` },
    }).select('eventDate status');

    const counts: Record<string, number> = {};
    bookings.forEach((booking) => {
      if (booking.eventDate) {
        counts[booking.eventDate] = (counts[booking.eventDate] || 0) + 1;
      }
    });

    res.json({ success: true, year: currentYear, month: currentMonth, data: counts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    let booking = await Booking.findById(id);
    if (!booking) {
      booking = await Booking.findOne({ bookingId: id });
    }
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, email, phone, service, eventDate, timeSlot, packageChoice, estimatedPrice, specialNotes } = req.body;
    const bookingId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = await Booking.create({
      bookingId,
      customerName,
      email,
      phone,
      service,
      eventDate,
      timeSlot: timeSlot || '10:00 AM',
      packageChoice: packageChoice || 'Standard',
      estimatedPrice: estimatedPrice || 25000,
      specialNotes,
      status: 'pending',
      paymentStatus: 'unpaid',
    });
    res.status(201).json({ success: true, message: 'Booking created successfully', data: newBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    let booking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    if (!booking) {
      booking = await Booking.findOneAndUpdate({ bookingId: id }, updateData, { new: true });
    }
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }
    res.json({ success: true, message: 'Booking updated successfully', data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
