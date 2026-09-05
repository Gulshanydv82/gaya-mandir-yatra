import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Booking, User as UserType } from '../../types';
import { apiService } from '../../services/api';
import { InvoiceModal } from '../booking/InvoiceModal';
import {
  User,
  Calendar,
  Heart,
  Bell,
  Key,
  LogOut,
  Edit3,
  Download,
  XCircle,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Save,
  MessageCircle,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser, setCurrentUser, wishlist, toggleWishlist, logout } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'bookings' | 'wishlist' | 'notifs'>(
    'bookings'
  );
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Booking | null>(null);

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      apiService.getBookings(currentUser.id).then((data) => setUserBookings(data));
      setEditName(currentUser.name);
      setEditPhone(currentUser.phone);
      setEditAddress(currentUser.address || '');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="py-20 text-center bg-stone-50 dark:bg-amber-950/40">
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-amber-100">
          Please Login to Access Your Dashboard
        </h2>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await apiService.updateUser(currentUser.id, {
        name: editName,
        phone: editPhone,
        address: editAddress,
      });
      setCurrentUser(updated);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      console.error('Update profile failed:', err);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        const result = await apiService.cancelBooking(bookingId);
        setUserBookings(userBookings.map((b) => (b.id === bookingId ? result : b)));
      } catch (err) {
        console.error('Cancel booking failed:', err);
      }
    }
  };

  return (
    <div className="py-10 bg-amber-50/40 dark:bg-amber-950/20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Header Card */}
        <div className="bg-white dark:bg-amber-950 rounded-2xl p-6 border border-amber-200 dark:border-amber-800 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={
                currentUser.avatar ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
              }
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
            />
            <div>
              <h2 className="text-xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
                {currentUser.name}
              </h2>
              <p className="text-xs text-stone-500 dark:text-amber-300 flex items-center gap-3 mt-1">
                <span>📧 {currentUser.email}</span>
                <span>📞 {currentUser.phone}</span>
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-[10px] font-extrabold uppercase tracking-wider">
                Role: {currentUser.role}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 bg-white dark:bg-amber-950 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-1 h-fit">
            <button
              onClick={() => setActiveSubTab('bookings')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeSubTab === 'bookings'
                  ? 'bg-amber-700 text-white'
                  : 'text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <Calendar className="w-4 h-4" /> My Bookings ({userBookings.length})
            </button>

            <button
              onClick={() => setActiveSubTab('profile')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeSubTab === 'profile'
                  ? 'bg-amber-700 text-white'
                  : 'text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <User className="w-4 h-4" /> Edit Profile
            </button>

            <button
              onClick={() => setActiveSubTab('wishlist')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeSubTab === 'wishlist'
                  ? 'bg-amber-700 text-white'
                  : 'text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <Heart className="w-4 h-4" /> My Wishlist ({wishlist.length})
            </button>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3">
            {/* BOOKINGS TAB */}
            {activeSubTab === 'bookings' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-6">
                <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                  My Pilgrimage Bookings
                </h3>

                {userBookings.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500 dark:text-amber-300">
                    You have no bookings recorded yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userBookings.map((bk) => (
                      <div
                        key={bk.id}
                        className="p-5 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-900/20 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-800 pb-3">
                          <div>
                            <span className="text-xs font-extrabold text-amber-900 dark:text-amber-100 font-serif">
                              Booking ID: {bk.bookingCode}
                            </span>
                            <span className="text-[11px] text-stone-500 dark:text-amber-400 block">
                              Booked on: {new Date(bk.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                bk.bookingStatus === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                                  : bk.bookingStatus === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              Status: {bk.bookingStatus}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="font-bold text-stone-500 block">Package:</span>
                            <span className="font-bold text-stone-900 dark:text-amber-100">
                              {bk.packageName}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-stone-500 block">Travel Date:</span>
                            <span>{bk.travelDate}</span>
                          </div>
                          <div>
                            <span className="font-bold text-stone-500 block">Tariff / Status:</span>
                            <span className="font-bold text-emerald-700 dark:text-emerald-400">
                              {bk.finalAmount > 0 ? `₹${bk.finalAmount.toLocaleString('en-IN')}` : 'Direct WhatsApp Quote'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om! Inquiry regarding my booking ${bk.bookingCode} for ${bk.packageName}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Coordinator
                          </a>

                          <button
                            onClick={() => setSelectedInvoice(bk)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" /> View Slip
                          </button>

                          {bk.bookingStatus !== 'Cancelled' && (
                            <button
                              onClick={() => handleCancelBooking(bk.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE EDIT TAB */}
            {activeSubTab === 'profile' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-6">
                <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                  Edit Personal Information
                </h3>

                {profileSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                    ✓ Profile details updated successfully!
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeSubTab === 'wishlist' && (
              <div className="bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-4">
                <h3 className="font-bold font-serif text-lg text-stone-900 dark:text-amber-100">
                  Saved Wishlist Packages
                </h3>
                <p className="text-xs text-stone-500">
                  You have {wishlist.length} packages saved in your wishlist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Popup */}
      {selectedInvoice && (
        <InvoiceModal booking={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};
