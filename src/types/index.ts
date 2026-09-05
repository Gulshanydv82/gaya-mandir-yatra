export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  isBlocked?: boolean;
  createdAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  mealsIncluded?: string[];
  placesVisited?: string[];
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  temples: string[];
  durationDays: number;
  durationNights: number;
  pricePerAdult: number;
  pricePerChild: number;
  originalPrice?: number;
  availableDates: string[];
  pickupLocations: string[];
  hotelIncluded: boolean;
  hotelCategory?: string;
  mealsIncluded: boolean;
  panditService: boolean;
  pindDaanService: boolean;
  vehicleDetails: string;
  images: string[];
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  category: 'Pind Daan' | 'Temple Yatra' | 'Circuit Tour' | 'VIP Express';
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  deity: string;
  significance: string;
  history: string;
  visitingHours: string;
  entryFee: string;
  dressCode: string;
  bestTimeToVisit: string;
  images: string[];
  mapEmbedUrl?: string;
  pindDaanSpot?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  address: string;
  proximityToVishnupad: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  availableRooms: number;
  contactNumber: string;
}

export interface Vehicle {
  id: string;
  type: string; // Sedan, SUV, Tempo Traveller, Luxury Bus
  capacity: number;
  isAC: boolean;
  driverName: string;
  driverPhone: string;
  pricePerDay: number;
  images: string[];
  available: boolean;
}

export interface Pandit {
  id: string;
  name: string;
  experienceYears: number;
  specialization: string; // Pind Daan, Shradh Karma, Vedic Pujas, Pitru Dosh
  languages: string[];
  rating: number;
  charges: number;
  photo: string;
  phone: string;
  available: boolean;
  gotraAssistance?: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded' | 'Failed';
export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'Cash';

export interface Booking {
  id: string;
  bookingCode: string; // e.g., GY-2026-8821
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userAadhaar?: string;
  packageId: string;
  packageName: string;
  travelDate: string;
  adultsCount: number;
  childrenCount: number;
  pickupLocation: string;
  hotelCategory: string;
  hotelId?: string;
  hotelName?: string;
  panditId?: string;
  panditName?: string;
  panditRequired: boolean;
  pindDaanRequired: boolean;
  specialRequests?: string;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  finalAmount: number;
  couponCode?: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingCode: string;
  userId: string;
  userName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionRef: string;
  createdAt: string;
}

export interface Review {
  id: string;
  packageId?: string;
  packageName?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  isApproved: boolean;
  adminReply?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minBookingAmount: number;
  expiryDate: string;
  isActive: boolean;
  usedCount: number;
}

export interface NotificationItem {
  id: string;
  userId?: string; // empty means broadcast to all
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'reminder' | 'cancellation' | 'promo';
  read: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Booking' | 'Pind Daan Rituals' | 'Travel & Stay' | 'Payments';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  adminReply?: string;
  createdAt: string;
}

export interface CMSSettings {
  siteName: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  contactEmail: string;
  contactPhone: string;
  helplinePhone: string;
  whatsappNumber: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  taxRatePercent: number;
  currencySymbol: string;
  noticeBannerText?: string;
  bookingPolicy: string;
  cancellationPolicy: string;
}

export interface ActivityLog {
  id: string;
  actorName: string;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}
