import { Router } from 'express';
import {
  getBookings,
  getMonthlyBookingCounts,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/booking.controller';

const router = Router();

router.get('/', getBookings);
router.get('/calendar', getMonthlyBookingCounts);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.put('/:id', updateBookingStatus);
router.patch('/:id', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;
