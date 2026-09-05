import React, { useState, useEffect } from 'react';
import { Package, Booking } from '../../types';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { InvoiceModal } from './InvoiceModal';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  Phone,
  MessageCircle,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { bookingPackageId, setBookingPackageId, currentUser } = useAuth();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [aadhaar, setAadhaar] = useState('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [travelDate, setTravelDate] = useState<string>('2026-08-15');
  const [pickupLocation, setPickupLocation] = useState<string>('Gaya Junction Railway Station');

  // Addons
  const [hotelCategory, setHotelCategory] = useState<string>('3 Star / Deluxe AC Room');
  const [panditRequired, setPanditRequired] = useState<boolean>(true);
  const [pindDaanRequired, setPindDaanRequired] = useState<boolean>(true);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Result State
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (bookingPackageId) {
      apiService.getPackageById(bookingPackageId).then((data) => {
        setPkg(data);
      });
    } else {
      setPkg(null);
      setStep(1);
      setCreatedBooking(null);
    }
  }, [bookingPackageId]);

  if (!bookingPackageId || !pkg) return null;

  const getWhatsAppMessage = () => {
    return (
      `Hari Om 🙏\n*Purva Yatra - Pilgrimage Booking Inquiry*\n\n` +
      `*Package:* ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N)\n` +
      `*Pilgrim Name:* ${fullName || 'Devotee'}\n` +
      `*Contact Phone:* ${phone || 'N/A'}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*City/Address:* ${address || 'N/A'}\n` +
      `*Travel Date:* ${travelDate}\n` +
      `*Travelers:* ${adults} Adults, ${children} Children\n` +
      `*Pickup Location:* ${pickupLocation}\n` +
      `*Accommodation:* ${hotelCategory}\n` +
      `*Gayawal Pandit:* ${panditRequired ? 'Required' : 'Self-arranged'}\n` +
      `*Pind Daan Rituals:* ${pindDaanRequired ? 'Required' : 'Temple Darshan Only'}\n` +
      (specialRequests ? `*Special Notes:* ${specialRequests}\n` : '') +
      `\nPlease confirm availability, pricing and arrange our sacred Yatra.`
    );
  };

  const handleCompleteBooking = async () => {
    setSubmitting(true);
    const newBk: Partial<Booking> = {
      userId: currentUser ? currentUser.id : 'usr-guest',
      userName: fullName || 'Pilgrim Devotee',
      userEmail: email || 'inquiry@purvayatra.in',
      userPhone: phone || '+91 99312 46394',
      userAddress: address,
      userAadhaar: aadhaar,
      packageId: pkg.id,
      packageName: pkg.name,
      travelDate,
      adultsCount: adults,
      childrenCount: children,
      pickupLocation,
      hotelCategory,
      panditRequired,
      pindDaanRequired,
      specialRequests,
      totalAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      finalAmount: 0,
      couponCode: '',
      bookingStatus: 'Confirmed',
      paymentStatus: 'Pending',
      paymentMethod: 'UPI',
      transactionId: `WA-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    try {
      const result = await apiService.createBooking(newBk);
      setCreatedBooking(result);
      setSubmitting(false);
      setStep(4); // Confirmation step

      // Direct WhatsApp redirect
      const waUrl = `https://wa.me/919931246394?text=${encodeURIComponent(getWhatsAppMessage())}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('Booking creation error:', err);
      setSubmitting(false);
      const waUrl = `https://wa.me/919931246394?text=${encodeURIComponent(getWhatsAppMessage())}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-amber-950 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-amber-200 dark:border-amber-800 shadow-2xl relative p-6 text-stone-900 dark:text-amber-100">
        {/* Close Button */}
        <button
          onClick={() => setBookingPackageId(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 dark:bg-amber-900 hover:bg-stone-200 text-stone-600 dark:text-amber-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-amber-100 dark:border-amber-900 pb-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2.5 py-0.5 rounded-full">
              {pkg.category} Inquiry & Booking
            </span>
            <div className="flex items-center gap-2 text-xs">
              <a
                href="tel:+919931246394"
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-amber-900/60 text-[#800000] dark:text-[#FF9933] font-bold text-[11px] flex items-center gap-1 hover:bg-stone-200"
              >
                <Phone className="w-3 h-3" /> +91 99312 46394
              </a>
              <a
                href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om! I am inquiring about package: ${pkg.name}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <h2 className="text-xl font-bold font-serif text-amber-900 dark:text-amber-100 mt-1.5">
            {pkg.name}
          </h2>
          <p className="text-xs text-stone-500 dark:text-amber-300">
            {pkg.durationDays} Days / {pkg.durationNights} Nights • Direct WhatsApp Inquiry & Ritual Confirmation
          </p>
        </div>

        {/* Step Progress Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-6 border-b border-amber-100 dark:border-amber-900 pb-3 text-xs font-bold">
            <span
              className={`flex items-center gap-1 ${
                step >= 1 ? 'text-amber-700 dark:text-amber-300' : 'text-stone-400'
              }`}
            >
              1. Traveler Details
            </span>
            <span
              className={`flex items-center gap-1 ${
                step >= 2 ? 'text-amber-700 dark:text-amber-300' : 'text-stone-400'
              }`}
            >
              2. Add-ons & Stay
            </span>
            <span
              className={`flex items-center gap-1 ${
                step >= 3 ? 'text-amber-700 dark:text-amber-300' : 'text-stone-400'
              }`}
            >
              3. Review & WhatsApp
            </span>
          </div>
        )}

        {/* STEP 1: Traveler Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Aadhaar Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="12 digit Aadhaar #"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                Residential Address / City
              </label>
              <input
                type="text"
                placeholder="City & State"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Adults Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Children Count
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                Pickup Location Selection
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
              >
                {pkg.pickupLocations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!fullName || !phone}
                className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Continue to Add-ons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Add-ons & Stay */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                Hotel Room Accommodation Tier
              </label>
              <select
                value={hotelCategory}
                onChange={(e) => setHotelCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
              >
                <option value="3 Star / Deluxe AC Room">3 Star / Deluxe AC Room near Temple</option>
                <option value="4 Star Luxury Hotel">4 Star Luxury Hotel with Swimming Pool</option>
                <option value="Dharamshala / Satvik Yatra Niwas">Dharamshala / Satvik Yatra Niwas</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={panditRequired}
                  onChange={(e) => setPanditRequired(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <div>
                  <span className="font-bold text-xs block">Gayawal Vedic Pandit</span>
                  <span className="text-[11px] text-stone-500 dark:text-amber-300">
                    Gotra registers & mantra chanting
                  </span>
                </div>
              </label>

              <label className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pindDaanRequired}
                  onChange={(e) => setPindDaanRequired(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <div>
                  <span className="font-bold text-xs block">Pind Daan Ritual Samagri</span>
                  <span className="text-[11px] text-stone-500 dark:text-amber-300">
                    Til, Barley flour, Kusha grass kit
                  </span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                Special Requests / Senior Citizen Wheelchair Requirement
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Need ground floor room for elderly parents, wheelchair assistance at station..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-amber-900 text-stone-700 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <span>Review & Connect on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review Details & Connect on WhatsApp (Payment Option Removed) */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Online Payment • Direct WhatsApp Assistance</span>
              </div>
              <p className="text-emerald-700 dark:text-emerald-400 text-[11px] leading-relaxed">
                We do not charge online payments on the website. After reviewing your details below, click the button to send your inquiry directly to our official Gaya WhatsApp Coordinator on <strong>+91 99312 46394</strong> for custom tariff, Pandit slot, and hotel confirmation.
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="p-4 bg-stone-50 dark:bg-amber-900/30 rounded-2xl border border-stone-200 dark:border-amber-800/80 space-y-2.5 text-xs">
              <h4 className="font-bold font-serif text-sm text-amber-900 dark:text-amber-100 border-b border-stone-200 dark:border-amber-800 pb-2">
                Yatra Inquiry Summary
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 dark:text-amber-200 text-[11px]">
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Selected Package:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{pkg.name} ({pkg.durationDays}D/{pkg.durationNights}N)</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Pilgrim Name:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{fullName || 'Devotee'}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Contact Phone:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Travel Date:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{travelDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Pilgrims Count:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{adults} Adults, {children} Children</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Pickup Station / Airport:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{pickupLocation}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Hotel Accommodation:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">{hotelCategory}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-amber-400 block font-semibold">Ritual / Pandit:</span>
                  <span className="font-bold text-stone-900 dark:text-amber-100">
                    {panditRequired ? 'Gayawal Pandit Required' : 'Self-guided'} • {pindDaanRequired ? 'Pind Daan Rituals' : 'Darshan Only'}
                  </span>
                </div>
              </div>

              {specialRequests && (
                <div className="pt-2 border-t border-stone-200 dark:border-amber-800/60 text-[11px]">
                  <span className="text-stone-500 dark:text-amber-400 font-semibold">Special Instructions:</span>
                  <p className="text-stone-800 dark:text-amber-200 italic mt-0.5">{specialRequests}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-amber-900 text-stone-700 dark:text-amber-200 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleCompleteBooking}
                disabled={submitting}
                className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                {submitting
                  ? 'Connecting to WhatsApp...'
                  : 'Send Details on WhatsApp & Confirm'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Inquiry Confirmation Screen */}
        {step === 4 && createdBooking && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Inquiry Forwarded to WhatsApp
              </span>
              <h3 className="text-2xl font-extrabold font-serif text-amber-900 dark:text-amber-100 mt-2">
                Jai Shree Vishnu! 🙏
              </h3>
              <p className="text-xs text-stone-600 dark:text-amber-200/90 mt-1 max-w-md mx-auto">
                Your Purva Yatra booking inquiry has been recorded and directed to our official WhatsApp Coordinator (+91 99312 46394).
              </p>
            </div>

            <div className="p-4 bg-amber-50/80 dark:bg-amber-900/40 rounded-2xl border border-amber-200 dark:border-amber-800/80 text-xs space-y-2 text-left max-w-md mx-auto font-sans">
              <div className="flex justify-between border-b border-amber-200 dark:border-amber-800 pb-2">
                <span className="font-bold text-stone-500">Inquiry ID:</span>
                <span className="font-extrabold text-amber-900 dark:text-amber-100">
                  {createdBooking.bookingCode}
                </span>
              </div>
              <div className="flex justify-between border-b border-amber-200 dark:border-amber-800 pb-2">
                <span className="font-bold text-stone-500">Pilgrim Name:</span>
                <span>{createdBooking.userName}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200 dark:border-amber-800 pb-2">
                <span className="font-bold text-stone-500">Travel Date:</span>
                <span>{createdBooking.travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-stone-500">Official Helpline:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  +91 99312 46394 (WhatsApp & Call)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919931246394?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Open WhatsApp Chat Again
              </a>

              <a
                href="tel:+919931246394"
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-amber-900 text-stone-800 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Coordinator
              </a>

              <button
                onClick={() => setBookingPackageId(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-amber-800 text-stone-700 dark:text-amber-200 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal Popup if requested */}
      {showInvoice && createdBooking && (
        <InvoiceModal booking={createdBooking} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
};
