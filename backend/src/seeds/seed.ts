import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Booking from '../models/Booking.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bobby-studio';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      Booking.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // --- Create Admin User ---
    const admin = await User.create({
      name: 'Bobby Admin',
      email: 'admin@bobbystudio.com',
      password: 'Bobby@2024',
      role: 'admin',
      phone: '+919876543210',
    });
    console.log('✅ Admin user created:', admin.email);

    // --- Create Services ---
    const servicesData = [
      {
        name: 'Wedding Photography',
        description: 'Our wedding photography captures every precious moment of your special day with cinematic elegance. From the nervous excitement of getting ready to the tearful first looks, from the sacred vows to the euphoric celebrations – we document it all with artistic precision and emotional depth. Our team of experienced photographers uses state-of-the-art equipment to deliver stunning images that you\'ll treasure for a lifetime.',
        shortDescription: 'Timeless moments captured with cinematic elegance and artistic precision.',
        category: 'wedding',
        startingPrice: 49999,
        highlights: ['Full Day Coverage', 'Two Photographers', 'Cinematic Edits', 'Premium Album', '500+ Edited Photos', 'Drone Coverage'],
        isFeatured: true,
        order: 1,
      },
      {
        name: 'Pre-Wedding Photography',
        description: 'Create stunning pre-wedding memories at breathtaking locations. Our pre-wedding shoots are designed to capture the chemistry, love, and excitement between you and your partner in the most creative and artistic way possible.',
        shortDescription: 'Romantic pre-wedding stories told through artistic vision at stunning locations.',
        category: 'pre-wedding',
        startingPrice: 24999,
        highlights: ['4-Hour Session', 'Location Scouting', 'Outfit Guidance', '100+ Edited Photos', 'Creative Concepts', 'Video Teaser'],
        isFeatured: true,
        order: 2,
      },
      {
        name: 'Portrait Photography',
        description: 'Professional portrait sessions that reveal the true essence of who you are. Whether it\'s a personal branding shoot, family portrait, or creative artistic portrait, we bring out the best in every subject.',
        shortDescription: 'Professional portraits that reveal your authentic self with stunning artistry.',
        category: 'portrait',
        startingPrice: 14999,
        highlights: ['2-Hour Session', 'Studio or Outdoor', 'Professional Lighting', '50+ Edited Photos', 'Multiple Outfits', 'Retouching'],
        isFeatured: true,
        order: 3,
      },
      {
        name: 'Fashion Photography',
        description: 'Bold, editorial fashion photography that defines trends and tells visual stories. We work with models, designers, and brands to create iconic imagery that stands out in the competitive fashion industry.',
        shortDescription: 'Bold, editorial imagery that defines style and creates visual impact.',
        category: 'fashion',
        startingPrice: 19999,
        highlights: ['Full Day Shoot', 'Art Direction', 'Professional Models', 'High-End Retouching', 'Mood Board Planning', 'Editorial Styling'],
        isFeatured: true,
        order: 4,
      },
      {
        name: 'Cinematography',
        description: 'Cinematic films that bring your story to life with professional-grade videography. Our cinematography team creates stunning visual narratives with drone footage, slow motion, and Hollywood-grade color grading.',
        shortDescription: 'Cinematic films with drone footage and Hollywood-grade production.',
        category: 'cinematography',
        startingPrice: 79999,
        highlights: ['4K Production', 'Drone Footage', 'Dolly Shots', 'Color Grading', 'Music Licensing', 'Highlight Film + Full Film'],
        isFeatured: true,
        order: 5,
      },
      {
        name: 'Product Photography',
        description: 'Premium product photography that makes your products shine. We specialize in e-commerce product shots, lifestyle imagery, and commercial product photography that drives sales.',
        shortDescription: 'Premium product visuals that elevate your brand and drive sales.',
        category: 'product',
        startingPrice: 14999,
        highlights: ['Studio Setup', 'White Background', 'Lifestyle Shots', '360° Views', 'Ghost Mannequin', 'E-commerce Ready'],
        isFeatured: false,
        order: 6,
      },
      {
        name: 'Food Photography',
        description: 'Mouthwatering food photography that makes every dish irresistible. We work with restaurants, food brands, and chefs to create appetizing visual content.',
        shortDescription: 'Mouthwatering food imagery that makes every dish irresistible.',
        category: 'food',
        startingPrice: 12999,
        highlights: ['Studio or On-Location', 'Prop Styling', 'Menu Shoots', 'Social Media Ready', 'Action Shots', 'Flat Lays'],
        isFeatured: false,
        order: 7,
      },
      {
        name: 'Baby & Newborn Photography',
        description: 'Precious baby and newborn photography that captures those fleeting first moments. Our specialized baby photography sessions are conducted with utmost care and patience in a safe, warm environment.',
        shortDescription: 'Precious newborn portraits capturing fleeting moments with gentle artistry.',
        category: 'baby',
        startingPrice: 9999,
        highlights: ['Safe Environment', 'Props & Wraps', 'Parent Shots', '30+ Edited Photos', 'Milestone Sessions', 'Digital Gallery'],
        isFeatured: false,
        order: 8,
      },
      {
        name: 'Corporate Photography',
        description: 'Professional corporate photography for headshots, team photos, events, and brand imagery. We help businesses project a polished, professional image.',
        shortDescription: 'Professional corporate imagery that elevates your business brand.',
        category: 'corporate',
        startingPrice: 19999,
        highlights: ['Headshots', 'Team Photos', 'Office Interiors', 'Event Coverage', 'LinkedIn Ready', 'Brand Guidelines'],
        isFeatured: false,
        order: 9,
      },
      {
        name: 'Destination Photography',
        description: 'Breathtaking destination shoots at iconic locations worldwide. From the beaches of Maldives to the palaces of Rajasthan, we travel to create extraordinary visual stories.',
        shortDescription: 'Breathtaking shoots at iconic destinations around the world.',
        category: 'destination',
        startingPrice: 99999,
        highlights: ['Travel Included', 'Location Scouting', 'Multi-Day Coverage', 'Drone Footage', 'Accommodation Guidance', 'Custom Itinerary'],
        isFeatured: false,
        order: 10,
      },
    ];

    const services = await Service.create(servicesData);
    console.log(`✅ ${services.length} services created`);

    // --- Create Testimonials ---
    const testimonialsData = [
      {
        clientName: 'Priya & Arjun Sharma',
        rating: 5,
        review: 'Bobby Studio captured our wedding day with such emotion and artistry. Every single photo tells our love story beautifully. From the mehndi ceremony to the reception, not a single moment was missed. We couldn\'t have asked for a more premium, thoughtful experience. Truly world-class!',
        serviceName: 'Wedding Photography',
        role: 'Wedding Couple',
        isFeatured: true,
        isApproved: true,
      },
      {
        clientName: 'Rahul Mehta',
        rating: 5,
        review: 'The level of professionalism and creativity is unmatched. Bobby Studio transformed our brand imagery with stunning commercial photography that has significantly improved our market presence. The team understood our vision perfectly.',
        serviceName: 'Corporate Photography',
        role: 'CEO, TechVentures',
        isFeatured: true,
        isApproved: true,
      },
      {
        clientName: 'Ananya Reddy',
        rating: 5,
        review: 'Working with Bobby Studio was an absolute dream. Their understanding of light, angles, and storytelling is truly world-class. Every frame from our fashion shoot is a masterpiece. I\'ve worked with many studios but Bobby Studio is simply on another level.',
        serviceName: 'Fashion Photography',
        role: 'Fashion Model',
        isFeatured: true,
        isApproved: true,
      },
      {
        clientName: 'Vikram & Meera Kapoor',
        rating: 5,
        review: 'From pre-wedding to reception, Bobby Studio delivered beyond our wildest expectations. The cinematic wedding film still gives us goosebumps every time we watch it. The drone shots of our palace venue were absolutely breathtaking!',
        serviceName: 'Cinematography',
        role: 'Wedding Couple',
        isFeatured: true,
        isApproved: true,
      },
      {
        clientName: 'Sneha Patel',
        rating: 5,
        review: 'Our baby\'s newborn photos are the most precious thing we own. Bobby Studio handled our little one with such care and patience. The photos captured expressions we didn\'t even know our baby could make. Absolutely magical!',
        serviceName: 'Baby Photography',
        role: 'Mother',
        isFeatured: false,
        isApproved: true,
      },
    ];

    const testimonials = await Testimonial.create(testimonialsData);
    console.log(`✅ ${testimonials.length} testimonials created`);

    // --- Create Sample Bookings for Calendar ---
    const sampleBookings = [
      {
        bookingId: 'BS-849201',
        customerName: 'Aarav & Roshni Malhotra',
        email: 'aarav.m@gmail.com',
        phone: '+91 98765 12345',
        service: 'Wedding Photography',
        eventDate: '2026-08-15',
        timeSlot: '10:00 AM - 08:00 PM',
        packageChoice: 'Royal Wedding Package',
        estimatedPrice: 150000,
        status: 'confirmed',
        paymentStatus: 'paid',
        assignedPhotographer: 'Bobby (Lead Photographer)',
        specialNotes: 'Grand Palace wedding venue. Requires drone aerial coverage & twin 4K cinematic cameras.',
      },
      {
        bookingId: 'BS-849202',
        customerName: 'Kavya Singhania',
        email: 'kavya.s@yahoo.com',
        phone: '+91 98112 33445',
        service: 'Pre-Wedding Photography',
        eventDate: '2026-08-15',
        timeSlot: '04:00 PM - 07:00 PM',
        packageChoice: 'Sunset Romance Package',
        estimatedPrice: 45000,
        status: 'pending',
        paymentStatus: 'unpaid',
        assignedPhotographer: 'Rahul Sharma (Senior Cinematographer)',
        specialNotes: 'Outdoor hill station shoot with 3 outfit changes.',
      },
      {
        bookingId: 'BS-849203',
        customerName: 'Meera & Rohan Verma',
        email: 'rohan.v@outlook.com',
        phone: '+91 97654 88990',
        service: 'Cinematography',
        eventDate: '2026-08-15',
        timeSlot: '07:00 PM - 11:00 PM',
        packageChoice: 'Cinematic Reception Film',
        estimatedPrice: 85000,
        status: 'confirmed',
        paymentStatus: 'partial',
        assignedPhotographer: 'Karan Malhotra (Drone Specialist)',
        specialNotes: 'Focus heavily on family speeches and first dance.',
      },
      {
        bookingId: 'BS-739104',
        customerName: 'Vikram & Diya Roy',
        email: 'diya.roy@gmail.com',
        phone: '+91 99887 76655',
        service: 'Wedding Photography',
        eventDate: '2026-08-20',
        timeSlot: '09:00 AM - 06:00 PM',
        packageChoice: 'Heritage Palace Special',
        estimatedPrice: 120000,
        status: 'confirmed',
        paymentStatus: 'paid',
        assignedPhotographer: 'Bobby (Lead Photographer)',
        specialNotes: 'Traditional South Indian wedding ritual coverage.',
      },
      {
        bookingId: 'BS-612905',
        customerName: 'Siddharth Oberoi',
        email: 'sid.oberoi@techventures.io',
        phone: '+91 99100 22334',
        service: 'Fashion & Portrait',
        eventDate: '2026-08-25',
        timeSlot: '11:00 AM - 03:00 PM',
        packageChoice: 'Executive Branding Session',
        estimatedPrice: 35000,
        status: 'in-progress',
        paymentStatus: 'paid',
        assignedPhotographer: 'Sneha Reddy (Fashion & Portrait)',
        specialNotes: 'Studio portrait shoot for Forbes interview feature.',
      },
      {
        bookingId: 'BS-554406',
        customerName: 'Priya & Devansh Gupta',
        email: 'devansh.g@gmail.com',
        phone: '+91 98777 44332',
        service: 'Pre-Wedding Photography',
        eventDate: '2026-09-05',
        timeSlot: '06:00 AM - 11:00 AM',
        packageChoice: 'Sunrise Heritage Package',
        estimatedPrice: 50000,
        status: 'confirmed',
        paymentStatus: 'unpaid',
        assignedPhotographer: 'Rahul Sharma',
        specialNotes: 'Early morning shoot at Taj Mahal view locations.',
      },
      {
        bookingId: 'BS-991107',
        customerName: 'Ananya & Kabir Mehta',
        email: 'ananya.m@gmail.com',
        phone: '+91 98200 55667',
        service: 'Wedding Photography',
        eventDate: '2026-09-18',
        timeSlot: '10:00 AM - 11:00 PM',
        packageChoice: 'Full Destination Wedding',
        estimatedPrice: 250000,
        status: 'confirmed',
        paymentStatus: 'paid',
        assignedPhotographer: 'Bobby (Lead Photographer)',
        specialNotes: '3-day destination celebration in Goa.',
      },
      {
        bookingId: 'BS-332208',
        customerName: 'Ritu Kapoor',
        email: 'ritu.k@gmail.com',
        phone: '+91 98999 11223',
        service: 'Baby & Newborn Photography',
        eventDate: '2026-10-02',
        timeSlot: '02:00 PM - 05:00 PM',
        packageChoice: 'First Year Memories',
        estimatedPrice: 22000,
        status: 'pending',
        paymentStatus: 'unpaid',
        assignedPhotographer: 'Sneha Reddy',
        specialNotes: 'Gentle lighting required. Studio setup at home.',
      },
    ];

    const bookings = await Booking.create(sampleBookings);
    console.log(`✅ ${bookings.length} sample bookings created`);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('Admin credentials:');
    console.log('  Email: admin@bobbystudio.com');
    console.log('  Password: Bobby@2024\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
