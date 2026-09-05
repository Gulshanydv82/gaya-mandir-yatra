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
} from '../types';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Request failed with status ${res.status}`);
  }
  return json.data !== undefined ? json.data : json;
}

export const apiService = {
  // Auth
  login: async (email: string, role?: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    return res.json();
  },

  register: async (userData: Partial<User>) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  // Users
  getUsers: async (): Promise<User[]> => fetchJson('/api/users'),
  updateUser: async (id: string, data: Partial<User>) =>
    fetchJson(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: async (id: string) => fetchJson(`/api/users/${id}`, { method: 'DELETE' }),

  // Packages
  getPackages: async (): Promise<Package[]> => fetchJson('/api/packages'),
  getPackageById: async (id: string): Promise<Package> => fetchJson(`/api/packages/${id}`),
  createPackage: async (data: Partial<Package>): Promise<Package> =>
    fetchJson('/api/packages', { method: 'POST', body: JSON.stringify(data) }),
  updatePackage: async (id: string, data: Partial<Package>): Promise<Package> =>
    fetchJson(`/api/packages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePackage: async (id: string) => fetchJson(`/api/packages/${id}`, { method: 'DELETE' }),

  // Temples
  getTemples: async (): Promise<Temple[]> => fetchJson('/api/temples'),
  createTemple: async (data: Partial<Temple>): Promise<Temple> =>
    fetchJson('/api/temples', { method: 'POST', body: JSON.stringify(data) }),
  updateTemple: async (id: string, data: Partial<Temple>): Promise<Temple> =>
    fetchJson(`/api/temples/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTemple: async (id: string) => fetchJson(`/api/temples/${id}`, { method: 'DELETE' }),

  // Hotels
  getHotels: async (): Promise<Hotel[]> => fetchJson('/api/hotels'),
  createHotel: async (data: Partial<Hotel>): Promise<Hotel> =>
    fetchJson('/api/hotels', { method: 'POST', body: JSON.stringify(data) }),
  updateHotel: async (id: string, data: Partial<Hotel>): Promise<Hotel> =>
    fetchJson(`/api/hotels/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteHotel: async (id: string) => fetchJson(`/api/hotels/${id}`, { method: 'DELETE' }),

  // Vehicles
  getVehicles: async (): Promise<Vehicle[]> => fetchJson('/api/vehicles'),
  createVehicle: async (data: Partial<Vehicle>): Promise<Vehicle> =>
    fetchJson('/api/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> =>
    fetchJson(`/api/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteVehicle: async (id: string) => fetchJson(`/api/vehicles/${id}`, { method: 'DELETE' }),

  // Pandits
  getPandits: async (): Promise<Pandit[]> => fetchJson('/api/pandits'),
  createPandit: async (data: Partial<Pandit>): Promise<Pandit> =>
    fetchJson('/api/pandits', { method: 'POST', body: JSON.stringify(data) }),
  updatePandit: async (id: string, data: Partial<Pandit>): Promise<Pandit> =>
    fetchJson(`/api/pandits/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePandit: async (id: string) => fetchJson(`/api/pandits/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: async (userId?: string): Promise<Booking[]> =>
    fetchJson(`/api/bookings${userId ? `?userId=${userId}` : ''}`),
  createBooking: async (data: Partial<Booking>): Promise<Booking> =>
    fetchJson('/api/bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateBooking: async (id: string, data: Partial<Booking>): Promise<Booking> =>
    fetchJson(`/api/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  cancelBooking: async (id: string): Promise<Booking> =>
    fetchJson(`/api/bookings/${id}/cancel`, { method: 'POST' }),

  // Reviews
  getReviews: async (): Promise<Review[]> => fetchJson('/api/reviews'),
  createReview: async (data: Partial<Review>): Promise<Review> =>
    fetchJson('/api/reviews', { method: 'POST', body: JSON.stringify(data) }),
  updateReview: async (id: string, data: Partial<Review>): Promise<Review> =>
    fetchJson(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteReview: async (id: string) => fetchJson(`/api/reviews/${id}`, { method: 'DELETE' }),

  // Coupons
  getCoupons: async (): Promise<Coupon[]> => fetchJson('/api/coupons'),
  validateCoupon: async (code: string, amount: number) => {
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, amount }),
    });
    return res.json();
  },
  createCoupon: async (data: Partial<Coupon>): Promise<Coupon> =>
    fetchJson('/api/coupons', { method: 'POST', body: JSON.stringify(data) }),
  deleteCoupon: async (id: string) => fetchJson(`/api/coupons/${id}`, { method: 'DELETE' }),

  // Blogs & FAQs
  getBlogs: async (): Promise<Blog[]> => fetchJson('/api/blogs'),
  getFaqs: async (): Promise<FAQ[]> => fetchJson('/api/faqs'),

  // Tickets
  getTickets: async (): Promise<ContactMessage[]> => fetchJson('/api/tickets'),
  createTicket: async (data: Partial<ContactMessage>) => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateTicket: async (id: string, data: Partial<ContactMessage>) =>
    fetchJson(`/api/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Settings & Notifications
  getSettings: async (): Promise<CMSSettings> => fetchJson('/api/settings'),
  updateSettings: async (data: Partial<CMSSettings>): Promise<CMSSettings> =>
    fetchJson('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),

  getNotifications: async (): Promise<NotificationItem[]> => fetchJson('/api/notifications'),
  broadcastNotification: async (title: string, message: string) => {
    const res = await fetch('/api/notifications/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message }),
    });
    return res.json();
  },

  // Admin Analytics
  getAnalytics: async () => fetchJson('/api/admin/analytics'),

  // AI Yatra Guidance
  askAIGuidance: async (prompt: string): Promise<{ reply: string }> => {
    const res = await fetch('/api/ai/guidance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return res.json();
  },
};
