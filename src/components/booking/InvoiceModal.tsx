import React from 'react';
import { Booking } from '../../types';
import { X, Printer, Download, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-stone-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border border-amber-300 print:shadow-none print:border-none print:m-0 print:p-0">
        {/* Screen Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 print:hidden">
          <h3 className="font-bold font-serif text-lg text-amber-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" /> Pilgrimage Booking Receipt / Invoice
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 text-white text-xs font-bold hover:bg-amber-800 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="space-y-6 print:p-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-amber-200 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold font-serif text-amber-900 tracking-tight">
                Purva Yatra
              </h2>
              <p className="text-[11px] text-stone-500 font-semibold">
                Vishnupad Temple Complex, Falgu Ghat Road, Gaya, Bihar - 823001
              </p>
              <p className="text-[11px] text-stone-500">Helpline & WhatsApp: +91 99312 46394 • Email: Vikashsinha2@gmail.com</p>
            </div>
            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full uppercase">
                Yatra Booking Slip
              </span>
              <p className="text-xs font-extrabold text-stone-800 mt-1">
                Booking ID: {booking.bookingCode}
              </p>
              <p className="text-[11px] text-stone-500">
                Date: {new Date(booking.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Pilgrim / Customer
              </p>
              <p className="font-bold text-stone-900">{booking.userName}</p>
              <p className="text-stone-600">{booking.userPhone}</p>
              <p className="text-stone-600">{booking.userEmail}</p>
              {booking.userAddress && <p className="text-stone-600">{booking.userAddress}</p>}
              {booking.userAadhaar && (
                <p className="text-stone-500 text-[10px]">Aadhaar: {booking.userAadhaar}</p>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Yatra Details
              </p>
              <p className="font-bold text-stone-900">{booking.packageName}</p>
              <p className="text-stone-600">Travel Date: {booking.travelDate}</p>
              <p className="text-stone-600">
                Travelers: {booking.adultsCount} Adults, {booking.childrenCount} Children
              </p>
              <p className="text-stone-600">Pickup: {booking.pickupLocation}</p>
            </div>
          </div>

          {/* Table Breakdown */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-amber-100/80 text-amber-900 font-bold border-b border-amber-300">
                <th className="p-2.5">Item Description</th>
                <th className="p-2.5 text-center">Qty</th>
                <th className="p-2.5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td className="p-2.5">
                  <p className="font-bold">{booking.packageName}</p>
                  <p className="text-[10px] text-stone-500">
                    Includes Vishnupad Temple VIP Darshan & AC Transfers
                  </p>
                </td>
                <td className="p-2.5 text-center">{booking.adultsCount} Adults</td>
                <td className="p-2.5 text-right font-medium">
                  ₹{booking.totalAmount.toLocaleString('en-IN')}
                </td>
              </tr>

              {booking.panditRequired && (
                <tr>
                  <td className="p-2.5">
                    <p className="font-bold">Gayawal Vedic Pandit Service</p>
                    <p className="text-[10px] text-stone-500">
                      Gotra recitation, mantra chanting & Brahmin Bhojan arrangement
                    </p>
                  </td>
                  <td className="p-2.5 text-center">Included</td>
                  <td className="p-2.5 text-right font-medium">₹0</td>
                </tr>
              )}

              {booking.hotelName && (
                <tr>
                  <td className="p-2.5">
                    <p className="font-bold">Hotel Room Stay</p>
                    <p className="text-[10px] text-stone-500">{booking.hotelName}</p>
                  </td>
                  <td className="p-2.5 text-center">{booking.hotelCategory}</td>
                  <td className="p-2.5 text-right font-medium">Included</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Subtotal & Total */}
          <div className="border-t border-amber-300 pt-3 space-y-1.5 text-xs text-right">
            {booking.finalAmount > 0 ? (
              <>
                <div className="flex justify-between text-stone-600">
                  <span>Gross Total:</span>
                  <span>₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({booking.couponCode}):</span>
                    <span>- ₹{booking.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>GST / Taxes (5%):</span>
                  <span>₹{booking.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-amber-900 font-serif pt-2 border-t border-amber-300">
                  <span>Tariff Amount:</span>
                  <span>₹{booking.finalAmount.toLocaleString('en-IN')}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-xs font-bold text-amber-900 font-serif pt-2">
                <span>Tariff & Pricing:</span>
                <span className="text-emerald-700 font-bold">Custom Quotation via WhatsApp (+91 99312 46394)</span>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[10px] text-stone-600 space-y-1">
            <p className="font-bold flex items-center gap-1 text-stone-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authentic Purva Yatra Guarantee
            </p>
            <p>
              Please present this invoice / booking ID at station pickup or hotel check-in. For any schedule changes or special ritual requests, please call your personal Yatra Manager at +91 99312 46394.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
