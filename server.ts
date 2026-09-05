import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_USERS,
  INITIAL_TEMPLES,
  INITIAL_PACKAGES,
  INITIAL_HOTELS,
  INITIAL_VEHICLES,
  INITIAL_PANDITS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_BLOGS,
  INITIAL_FAQS,
  INITIAL_CMS_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from './src/data/initialData.js';
import {
  User,
  Package,
  Temple,
  Hotel,
  Vehicle,
  Pandit,
  Booking,
  Review,
  Coupon,
  Blog,
  FAQ,
  ContactMessage,
  CMSSettings,
  NotificationItem,
  ActivityLog,
} from './src/types/index.js';

// In-Memory Data Store (State persistent during runtime)
let usersStore: User[] = [...INITIAL_USERS];
let templesStore: Temple[] = [...INITIAL_TEMPLES];
let packagesStore: Package[] = [...INITIAL_PACKAGES];
let hotelsStore: Hotel[] = [...INITIAL_HOTELS];
let vehiclesStore: Vehicle[] = [...INITIAL_VEHICLES];
let panditsStore: Pandit[] = [...INITIAL_PANDITS];
let bookingsStore: Booking[] = [...INITIAL_BOOKINGS];
let reviewsStore: Review[] = [...INITIAL_REVIEWS];
let couponsStore: Coupon[] = [...INITIAL_COUPONS];
let blogsStore: Blog[] = [...INITIAL_BLOGS];
let faqsStore: FAQ[] = [...INITIAL_FAQS];
let cmsSettingsStore: CMSSettings = { ...INITIAL_CMS_SETTINGS };
let notificationsStore: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
let contactMessagesStore: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Anand Kumar',
    email: 'anand@gmail.com',
    phone: '+91 91234 56789',
    subject: 'Pitru Paksha Booking Inquiry',
    message: 'Hello, we are planning a family trip of 8 members in September for 45-Vedis Pind Daan. Please advise package customization.',
    status: 'Open',
    createdAt: '2026-07-22T10:00:00Z',
  },
];
let activityLogsStore: ActivityLog[] = [
  {
    id: 'log-1',
    actorName: 'System Engine',
    action: 'INITIALIZATION',
    details: 'Gaya Mandir Yatra database loaded with 4 packages, 6 temples, 3 hotels, 3 pandits.',
    timestamp: new Date().toISOString(),
  },
];

// Helper to log activities
function logActivity(actorName: string, action: string, details: string) {
  const log: ActivityLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actorName,
    action,
    details,
    timestamp: new Date().toISOString(),
  };
  activityLogsStore.unshift(log);
  if (activityLogsStore.length > 100) activityLogsStore.pop();
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Add this route after app.use(express.json()) in server.ts
app.post('/api/auth/msg91', async (req, res) => {
  try {
    const { accessToken, identifier, mode, name, email, address, role } = req.body;
    const authkey = process.env.MSG91_AUTHKEY;

    if (!authkey) {
      return res.status(500).json({ success: false, message: 'MSG91_AUTHKEY is not configured on the server.' });
    }
    if (!accessToken || !identifier) {
      return res.status(400).json({ success: false, message: 'MSG91 access token and identifier are required.' });
    }

    // Verify the JWT/access token issued by the MSG91 OTP Widget.
    const form = new URLSearchParams();
    form.set('authkey', authkey);
    form.set('access-token', accessToken);

    const msg91Response = await fetch('https://control.msg91.com/api/v5/widget/verifyAccessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });

    if (!msg91Response.ok) {
      return res.status(401).json({ success: false, message: 'MSG91 access token verification failed.' });
    }

    const verified = await msg91Response.json();
    const verifiedIdentifier = verified?.data?.mobile || verified?.data?.email || verified?.mobile || verified?.email || identifier;

    if (mode === 'register') {
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required for registration.' });
      }
      const existingEmail = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'User already exists with this email.' });
      }
      const existingPhone = usersStore.find((u) => u.phone.replace(/\D/g, '') === String(verifiedIdentifier).replace(/\D/g, ''));
      if (existingPhone) {
        return res.status(400).json({ success: false, message: 'User already exists with this mobile number.' });
      }
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone: String(verifiedIdentifier).startsWith('+') ? String(verifiedIdentifier) : `+${String(verifiedIdentifier)}`,
        address: address || '',
        role: role === 'admin' ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      usersStore.push(newUser);
      logActivity(newUser.name, 'USER_REGISTER_OTP', `New OTP-verified user registered: ${email}`);
      return res.json({ success: true, user: newUser });
    }

    const digits = String(verifiedIdentifier).replace(/\D/g, '');
    const user = usersStore.find((u) => u.phone.replace(/\D/g, '') === digits);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this mobile number. Please register first.' });
    }
    logActivity(user.name, 'USER_LOGIN_OTP', `Logged in using verified mobile OTP`);
    return res.json({ success: true, user });
  } catch (err) {
    console.error('MSG91 auth error:', err);
    return res.status(500).json({ success: false, message: 'OTP authentication failed.' });
  }
});


  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Gaya Mandir Yatra API', time: new Date().toISOString() });
  });

  // Auth APIs
  app.post('/api/auth/login', (req, res) => {
    const { email, role } = req.body;
    let user = usersStore.find((u) => u.email.toLowerCase() === email?.toLowerCase());
    if (!user) {
      // Auto register for demo simplicity if credentials are new
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 00000',
        role: role === 'admin' || email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      usersStore.push(user);
    }
    logActivity(user.name, 'USER_LOGIN', `Logged in as ${user.role}`);
    res.json({ success: true, user });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, address, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    const existing = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 90000 00000',
      address: address || '',
      role: role === 'admin' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };
    usersStore.push(newUser);
    logActivity(newUser.name, 'USER_REGISTER', `New user registered: ${email}`);
    res.json({ success: true, user: newUser });
  });

  // Users Management API (Admin)
  app.get('/api/users', (req, res) => {
    res.json({ success: true, data: usersStore });
  });

  app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const index = usersStore.findIndex((u) => u.id === id);
    if (index !== -1) {
      usersStore[index] = { ...usersStore[index], ...req.body };
      logActivity('Admin', 'USER_UPDATE', `Updated user ${usersStore[index].name}`);
      res.json({ success: true, user: usersStore[index] });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });

  app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersStore = usersStore.filter((u) => u.id !== id);
    logActivity('Admin', 'USER_DELETE', `Deleted user ID ${id}`);
    res.json({ success: true, message: 'User deleted' });
  });

  // Packages API
  app.get('/api/packages', (req, res) => {
    res.json({ success: true, data: packagesStore });
  });

  app.get('/api/packages/:id', (req, res) => {
    const pkg = packagesStore.find((p) => p.id === req.params.id);
    if (pkg) res.json({ success: true, data: pkg });
    else res.status(404).json({ success: false, message: 'Package not found' });
  });

  app.post('/api/packages', (req, res) => {
    const newPkg: Package = {
      id: `pkg-${Date.now()}`,
      ...req.body,
      rating: 5.0,
      reviewCount: 1,
    };
    packagesStore.unshift(newPkg);
    logActivity('Admin', 'PACKAGE_CREATE', `Created package ${newPkg.name}`);
    res.json({ success: true, data: newPkg });
  });

  app.put('/api/packages/:id', (req, res) => {
    const index = packagesStore.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
      packagesStore[index] = { ...packagesStore[index], ...req.body };
      logActivity('Admin', 'PACKAGE_UPDATE', `Updated package ${packagesStore[index].name}`);
      res.json({ success: true, data: packagesStore[index] });
    } else {
      res.status(404).json({ success: false, message: 'Package not found' });
    }
  });

  app.delete('/api/packages/:id', (req, res) => {
    packagesStore = packagesStore.filter((p) => p.id !== req.params.id);
    logActivity('Admin', 'PACKAGE_DELETE', `Deleted package ID ${req.params.id}`);
    res.json({ success: true, message: 'Package deleted' });
  });

  // Temples API
  app.get('/api/temples', (req, res) => {
    res.json({ success: true, data: templesStore });
  });

  app.post('/api/temples', (req, res) => {
    const newTemple: Temple = { id: `tmpl-${Date.now()}`, ...req.body };
    templesStore.push(newTemple);
    logActivity('Admin', 'TEMPLE_CREATE', `Created temple ${newTemple.name}`);
    res.json({ success: true, data: newTemple });
  });

  app.put('/api/temples/:id', (req, res) => {
    const index = templesStore.findIndex((t) => t.id === req.params.id);
    if (index !== -1) {
      templesStore[index] = { ...templesStore[index], ...req.body };
      res.json({ success: true, data: templesStore[index] });
    } else res.status(404).json({ success: false, message: 'Temple not found' });
  });

  app.delete('/api/temples/:id', (req, res) => {
    templesStore = templesStore.filter((t) => t.id !== req.params.id);
    res.json({ success: true });
  });

  // Hotels API
  app.get('/api/hotels', (req, res) => res.json({ success: true, data: hotelsStore }));
  app.post('/api/hotels', (req, res) => {
    const item: Hotel = { id: `htl-${Date.now()}`, ...req.body };
    hotelsStore.push(item);
    res.json({ success: true, data: item });
  });
  app.put('/api/hotels/:id', (req, res) => {
    const idx = hotelsStore.findIndex((h) => h.id === req.params.id);
    if (idx !== -1) {
      hotelsStore[idx] = { ...hotelsStore[idx], ...req.body };
      res.json({ success: true, data: hotelsStore[idx] });
    } else res.status(404).json({ success: false });
  });
  app.delete('/api/hotels/:id', (req, res) => {
    hotelsStore = hotelsStore.filter((h) => h.id !== req.params.id);
    res.json({ success: true });
  });

  // Vehicles API
  app.get('/api/vehicles', (req, res) => res.json({ success: true, data: vehiclesStore }));
  app.post('/api/vehicles', (req, res) => {
    const item: Vehicle = { id: `veh-${Date.now()}`, ...req.body };
    vehiclesStore.push(item);
    res.json({ success: true, data: item });
  });
  app.put('/api/vehicles/:id', (req, res) => {
    const idx = vehiclesStore.findIndex((v) => v.id === req.params.id);
    if (idx !== -1) {
      vehiclesStore[idx] = { ...vehiclesStore[idx], ...req.body };
      res.json({ success: true, data: vehiclesStore[idx] });
    } else res.status(404).json({ success: false });
  });
  app.delete('/api/vehicles/:id', (req, res) => {
    vehiclesStore = vehiclesStore.filter((v) => v.id !== req.params.id);
    res.json({ success: true });
  });

  // Pandits API
  app.get('/api/pandits', (req, res) => res.json({ success: true, data: panditsStore }));
  app.post('/api/pandits', (req, res) => {
    const item: Pandit = { id: `pnd-${Date.now()}`, ...req.body };
    panditsStore.push(item);
    res.json({ success: true, data: item });
  });
  app.put('/api/pandits/:id', (req, res) => {
    const idx = panditsStore.findIndex((p) => p.id === req.params.id);
    if (idx !== -1) {
      panditsStore[idx] = { ...panditsStore[idx], ...req.body };
      res.json({ success: true, data: panditsStore[idx] });
    } else res.status(404).json({ success: false });
  });
  app.delete('/api/pandits/:id', (req, res) => {
    panditsStore = panditsStore.filter((p) => p.id !== req.params.id);
    res.json({ success: true });
  });

  // Bookings API
  app.get('/api/bookings', (req, res) => {
    const { userId } = req.query;
    if (userId) {
      return res.json({ success: true, data: bookingsStore.filter((b) => b.userId === userId) });
    }
    res.json({ success: true, data: bookingsStore });
  });

  app.post('/api/bookings', (req, res) => {
    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode: `GY-2026-${codeNumber}`,
      bookingStatus: 'Confirmed',
      paymentStatus: 'Paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...req.body,
    };
    bookingsStore.unshift(newBooking);

    // Create Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: newBooking.userId,
      title: 'Booking Confirmed!',
      message: `Your Gaya Yatra booking ${newBooking.bookingCode} for ${newBooking.packageName} on ${newBooking.travelDate} is confirmed!`,
      type: 'booking',
      read: false,
      createdAt: new Date().toISOString(),
    };
    notificationsStore.unshift(notif);

    logActivity(newBooking.userName, 'BOOKING_CREATED', `Created booking ${newBooking.bookingCode} for ₹${newBooking.finalAmount}`);
    res.json({ success: true, data: newBooking });
  });

  app.put('/api/bookings/:id', (req, res) => {
    const index = bookingsStore.findIndex((b) => b.id === req.params.id);
    if (index !== -1) {
      bookingsStore[index] = {
        ...bookingsStore[index],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      logActivity('Admin', 'BOOKING_UPDATE', `Updated booking ${bookingsStore[index].bookingCode} status to ${req.body.bookingStatus || 'modified'}`);
      res.json({ success: true, data: bookingsStore[index] });
    } else res.status(404).json({ success: false, message: 'Booking not found' });
  });

  app.post('/api/bookings/:id/cancel', (req, res) => {
    const index = bookingsStore.findIndex((b) => b.id === req.params.id);
    if (index !== -1) {
      bookingsStore[index].bookingStatus = 'Cancelled';
      bookingsStore[index].paymentStatus = 'Refunded';
      bookingsStore[index].updatedAt = new Date().toISOString();
      logActivity(bookingsStore[index].userName, 'BOOKING_CANCEL', `Cancelled booking ${bookingsStore[index].bookingCode}`);
      res.json({ success: true, data: bookingsStore[index] });
    } else res.status(404).json({ success: false, message: 'Booking not found' });
  });

  // Reviews API
  app.get('/api/reviews', (req, res) => {
    res.json({ success: true, data: reviewsStore });
  });

  app.post('/api/reviews', (req, res) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      isApproved: true, // Auto approve in demo
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    reviewsStore.unshift(newRev);
    res.json({ success: true, data: newRev });
  });

  app.put('/api/reviews/:id', (req, res) => {
    const idx = reviewsStore.findIndex((r) => r.id === req.params.id);
    if (idx !== -1) {
      reviewsStore[idx] = { ...reviewsStore[idx], ...req.body };
      res.json({ success: true, data: reviewsStore[idx] });
    } else res.status(404).json({ success: false });
  });

  app.delete('/api/reviews/:id', (req, res) => {
    reviewsStore = reviewsStore.filter((r) => r.id !== req.params.id);
    res.json({ success: true });
  });

  // Coupons API
  app.get('/api/coupons', (req, res) => res.json({ success: true, data: couponsStore }));
  app.post('/api/coupons/validate', (req, res) => {
    const { code, amount } = req.body;
    const c = couponsStore.find((item) => item.code.toUpperCase() === code?.toUpperCase() && item.isActive);
    if (!c) {
      return res.status(400).json({ success: false, message: 'Invalid or expired coupon code' });
    }
    if (amount < c.minBookingAmount) {
      return res.status(400).json({ success: false, message: `Coupon requires minimum booking amount of ₹${c.minBookingAmount}` });
    }
    let discount = 0;
    if (c.discountType === 'fixed') {
      discount = c.discountValue;
    } else {
      discount = Math.round((amount * c.discountValue) / 100);
    }
    res.json({ success: true, coupon: c, discountAmount: discount });
  });
  app.post('/api/coupons', (req, res) => {
    const item: Coupon = { id: `cpn-${Date.now()}`, usedCount: 0, ...req.body };
    couponsStore.push(item);
    res.json({ success: true, data: item });
  });
  app.delete('/api/coupons/:id', (req, res) => {
    couponsStore = couponsStore.filter((c) => c.id !== req.params.id);
    res.json({ success: true });
  });

  // Blogs & FAQs API
  app.get('/api/blogs', (req, res) => res.json({ success: true, data: blogsStore }));
  app.get('/api/faqs', (req, res) => res.json({ success: true, data: faqsStore }));

  // Contact Messages & Support Tickets API
  app.get('/api/tickets', (req, res) => res.json({ success: true, data: contactMessagesStore }));
  app.post('/api/tickets', (req, res) => {
    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      status: 'Open',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    contactMessagesStore.unshift(msg);
    logActivity(msg.name, 'CONTACT_SUBMIT', `Submitted inquiry: ${msg.subject}`);
    res.json({ success: true, message: 'Thank you! Your message has been received.', ticketId: msg.id });
  });
  app.put('/api/tickets/:id', (req, res) => {
    const idx = contactMessagesStore.findIndex((m) => m.id === req.params.id);
    if (idx !== -1) {
      contactMessagesStore[idx] = { ...contactMessagesStore[idx], ...req.body };
      res.json({ success: true, data: contactMessagesStore[idx] });
    } else res.status(404).json({ success: false });
  });

  // CMS Settings & Notifications API
  app.get('/api/settings', (req, res) => res.json({ success: true, data: cmsSettingsStore }));
  app.put('/api/settings', (req, res) => {
    cmsSettingsStore = { ...cmsSettingsStore, ...req.body };
    logActivity('Admin', 'SETTINGS_UPDATE', 'Updated CMS Website Settings');
    res.json({ success: true, data: cmsSettingsStore });
  });

  app.get('/api/notifications', (req, res) => res.json({ success: true, data: notificationsStore }));
  app.post('/api/notifications/broadcast', (req, res) => {
    const { title, message, type } = req.body;
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type: type || 'promo',
      read: false,
      createdAt: new Date().toISOString(),
    };
    notificationsStore.unshift(notif);
    logActivity('Admin', 'NOTIF_BROADCAST', `Sent broadcast: ${title}`);
    res.json({ success: true, data: notif });
  });

  // Admin Analytics Overview API
  app.get('/api/admin/analytics', (req, res) => {
    const totalUsers = usersStore.length;
    const totalBookings = bookingsStore.length;
    const activePackages = packagesStore.filter((p) => p.isFeatured || p.rating >= 4.5).length;
    const totalRevenue = bookingsStore
      .filter((b) => b.paymentStatus === 'Paid')
      .reduce((sum, b) => sum + b.finalAmount, 0);
    const pendingBookings = bookingsStore.filter((b) => b.bookingStatus === 'Pending').length;
    const cancelledBookings = bookingsStore.filter((b) => b.bookingStatus === 'Cancelled').length;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        activePackages,
        totalRevenue,
        pendingBookings,
        cancelledBookings,
        recentActivity: activityLogsStore.slice(0, 10),
      },
    });
  });

  // Gemini AI Yatra Guidance Assistant
  app.post('/api/ai/guidance', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ success: false, message: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          success: true,
          reply: 'Gaya Mandir Yatra AI Assistant: Gaya is the premier pilgrimage destination for Pind Daan and Vishnupad Temple Yatra. You can perform Pind Daan at Falgu River, Sita Kund, Vishnupad, and Akshaywat. Please ensure you carry traditional white attire and consult our certified Gayawal Pandits for Gotra-specific rituals!',
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are "Acharya Gaya Yatra AI", a deeply respectful, knowledgeable Vedic Pandit & Pilgrim Guide for Gaya Mandir Yatra in Bihar, India.
      Answer questions concisely and respectfully about:
      1. Vishnupad Temple history, Ahilyabai Holkar architecture, Lord Vishnu footprint significance.
      2. Pind Daan rituals, Shradh Karma, Pitru Dosh Shanti, 45-Vedis, Falgu River, Sita Kund, Akshaywat Banyan Tree, Pretshila Hill.
      3. Travel guidance to Gaya: trains to Gaya Junction, Patna Airport (PAT), dress codes, best months, hotel stay near Vishnupad.
      4. Bodh Gaya UNESCO World Heritage Mahabodhi Temple and international Buddhist monasteries.
      Keep answers structured, warm, and helpful with bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] },
        ],
      });

      const reply = response.text || 'Gaya is the sacred land of ancestral liberation. How may I assist your family yatra?';
      res.json({ success: true, reply });
    } catch (err: any) {
      console.error('AI Guidance Error:', err);
      res.json({
        success: true,
        reply: 'Gaya Vishnupad Temple is open from 5:00 AM to 9:00 PM. Performs Pind Daan at Falgu River and Sita Kund with certified Gayawal Pandits.',
      });
    }
  });

  // -------------------------------------------------------------
  // VITE / STATIC SERVING
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gaya Mandir Yatra Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Gaya Yatra Server:', err);
});
