import React, { useEffect, useState } from 'react';
import { Package } from '../../types';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  Hotel,
  Award,
  Sparkles,
  Phone,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

export const PackageDetailModal: React.FC = () => {
  const { selectedPackageId, setSelectedPackageId, setBookingPackageId } = useAuth();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [activeImg, setActiveImg] = useState<string>('');
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    if (selectedPackageId) {
      apiService.getPackageById(selectedPackageId).then((data) => {
        setPkg(data);
        if (data && data.images.length > 0) setActiveImg(data.images[0]);
      });
    } else {
      setPkg(null);
    }
  }, [selectedPackageId]);

  if (!selectedPackageId || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-amber-950 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-amber-200 dark:border-amber-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedPackageId(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative h-64 sm:h-80 bg-stone-900">
          <img src={activeImg || pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
            {pkg.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-transform ${
                  activeImg === img ? 'border-amber-500 scale-105' : 'border-white/60 opacity-80'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-stone-900 dark:text-amber-100">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
                {pkg.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>
                  {pkg.rating} ({pkg.reviewCount} Pilgrim Reviews)
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold font-serif mt-2">{pkg.name}</h2>
            <p className="text-xs text-stone-500 dark:text-amber-300 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> {pkg.destination}
            </p>
          </div>

          {/* Description */}
          <div className="bg-amber-50/60 dark:bg-amber-900/30 p-4 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-xs leading-relaxed">
            {pkg.description}
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-50 dark:bg-amber-900/40 rounded-xl border border-amber-100 dark:border-amber-900">
              <span className="text-stone-500 dark:text-amber-400 block text-[10px] uppercase font-bold">
                Duration
              </span>
              <span className="font-bold">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-amber-900/40 rounded-xl border border-amber-100 dark:border-amber-900">
              <span className="text-stone-500 dark:text-amber-400 block text-[10px] uppercase font-bold">
                Hotel Stay
              </span>
              <span className="font-bold">{pkg.hotelCategory}</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-amber-900/40 rounded-xl border border-amber-100 dark:border-amber-900">
              <span className="text-stone-500 dark:text-amber-400 block text-[10px] uppercase font-bold">
                Pandit Service
              </span>
              <span className="font-bold">{pkg.panditService ? 'Included (Gayawal)' : 'Available'}</span>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-amber-900/40 rounded-xl border border-amber-100 dark:border-amber-900">
              <span className="text-stone-500 dark:text-amber-400 block text-[10px] uppercase font-bold">
                Transfers
              </span>
              <span className="font-bold">{pkg.vehicleDetails}</span>
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-bold font-serif text-base mb-3 text-amber-900 dark:text-amber-200">
              Day-by-Day Detailed Itinerary
            </h3>

            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 border-b border-amber-100 dark:border-amber-900">
              {pkg.itinerary.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setActiveDay(item.day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeDay === item.day
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 dark:bg-amber-900/40 text-stone-700 dark:text-amber-200'
                  }`}
                >
                  Day {item.day}
                </button>
              ))}
            </div>

            {pkg.itinerary
              .filter((i) => i.day === activeDay)
              .map((dayItem) => (
                <div
                  key={dayItem.day}
                  className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/60 space-y-2 text-xs"
                >
                  <h4 className="font-bold font-serif text-sm text-stone-900 dark:text-amber-100">
                    Day {dayItem.day}: {dayItem.title}
                  </h4>
                  <p className="leading-relaxed text-stone-700 dark:text-amber-200/90">
                    {dayItem.description}
                  </p>
                  {dayItem.placesVisited && dayItem.placesVisited.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="font-bold text-amber-800 dark:text-amber-300">
                        Places Visited:
                      </span>
                      {dayItem.placesVisited.map((place, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-[10px] font-semibold"
                        >
                          📍 {place}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Package Inclusions
              </h4>
              <ul className="space-y-1 text-stone-700 dark:text-emerald-200/90">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i}>✓ {inc}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800/60 space-y-2 text-xs">
              <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Package Exclusions
              </h4>
              <ul className="space-y-1 text-stone-700 dark:text-rose-200/90">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i}>✗ {exc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Pricing & Trigger */}
          <div className="pt-4 border-t border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                Yatra Pricing
              </span>
              <span className="text-xl font-extrabold font-serif text-[#800000] dark:text-[#FF9933] flex items-center gap-1.5">
                Contact Us for Best Quote
              </span>
              <p className="text-[11px] text-stone-500 dark:text-amber-300">
                Customized rates based on group size, dates & ritual preferences
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="tel:+919931246394"
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-amber-900/60 text-[#800000] dark:text-amber-200 font-bold text-xs border border-stone-200 dark:border-amber-800 flex items-center gap-1.5 hover:bg-stone-200 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" /> Call Us
              </a>
              <a
                href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I am inquiring about package: ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N). Please share best price quotation and ritual details.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Coordinator
              </a>
              <a
                href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I want to book/inquire about package: ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N). Please contact me with itinerary details.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs shadow-md transition-all text-center flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
