import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import type { Request, Response } from 'express';

const router = Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const contact = await Contact.create(req.body);

      // TODO: Send email notification via Nodemailer

      res.status(201).json({
        contact,
        message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// @route   GET /api/contact
// @desc    Get all contact enquiries (Admin)
// @access  Public/Admin
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;
    let query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { service: searchRegex },
        { message: searchRegex },
      ];
    }
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status (Admin)
// @access  Public/Admin
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: contact });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact enquiry (Admin)
// @access  Public/Admin
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact enquiry deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
