import React, { useEffect, useState } from 'react';
import { Package } from '../../types';
import { apiService } from '../../services/api';
import { INITIAL_PACKAGES } from '../../data/initialData';
import { useAuth } from '../../context/AuthContext';
import {
  Star,
  Clock,
  MapPin,
  Check,
  Heart,
  ChevronRight,
  Sparkles,
  Users,
  Hotel as HotelIcon,
  Award,
  PhoneCall,
} from 'lucide-react';

export const FeaturedPackages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [loading, setLoading] = useState(false);
  const { wishlist, toggleWishlist, setSelectedPackageId, setBookingPackageId } = useAuth();

  useEffect(() => {
    apiService
      .getPackages()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setPackages(data);
        }
      })
      .catch((err) => {
        console.error('Error loading packages:', err);
      });
  }, []);

  return (
    <section className="py-14 bg-[#FFFDF0] dark:bg-[#2A1D15] transition-colors border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/15 text-[#800000] dark:text-[#FF9933] text-xs font-bold mb-2 uppercase tracking-wider border border-[#FF9933]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Sacred Yatra Offerings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#3D2B1F] dark:text-[#FFFDF0] tracking-tight">
              Featured Gaya Pilgrimage Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4D42] dark:text-[#E6E2D3] mt-1 max-w-xl">
              All inclusive tours featuring Vishnupad darshan, Pind Daan rituals, certified Gayawal Pandits, AC hotel stay, and station/airport transfers.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('package-list');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="self-start md:self-end px-5 py-2 rounded-full bg-[#F5F5F0] text-[#800000] text-xs font-bold border border-[#800000]/20 hover:bg-[#800000] hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>View All Packages</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-[#E6E2D3]/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isSaved = wishlist.includes(pkg.id);
              return (
                <div
                  key={pkg.id}
                  className="bg-white dark:bg-[#3D2B1F] rounded-2xl border border-[#E6E2D3] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group p-1"
                >
                  {/* Image Banner */}
                  <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100">
                    <img
                      src={pkg.images[0]}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {pkg.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded bg-[#FF9933] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                          Best Seller
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider">
                        {pkg.category}
                      </span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(pkg.id);
                      }}
                      title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[#3D2B1F] dark:text-[#FFFDF0] hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-xs z-10 cursor-pointer active:scale-90"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`}
                      />
                    </button>

                    {/* Duration & Rating on bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                        {pkg.durationDays}D / {pkg.durationNights}N
                      </span>
                      <span className="flex items-center gap-1 bg-[#800000] px-2 py-0.5 rounded-md font-bold text-white">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        {pkg.rating} ({pkg.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="px-4 py-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-[#3D2B1F] dark:text-[#FFFDF0] font-serif leading-snug line-clamp-2 hover:text-[#800000] transition-colors">
                        {pkg.name}
                      </h3>

                      <p className="text-xs text-[#5C4D42] dark:text-[#E6E2D3] mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#800000] shrink-0" />
                        <span className="truncate">{pkg.destination}</span>
                      </p>

                      <p className="text-xs text-[#5C4D42] dark:text-[#E6E2D3]/80 mt-2 line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Key Highlights Indicators */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#5C4D42] dark:text-[#E6E2D3] pt-2 border-t border-[#E6E2D3]">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {pkg.pindDaanService ? 'Pind Daan Ritual' : 'Temple Darshan'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {pkg.panditService ? 'Gayawal Pandit' : 'Local Guide'}
                      </span>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-3 border-t border-[#E6E2D3] dark:border-amber-900/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block uppercase font-bold tracking-wider">
                          Best Rate Guarantee
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-base font-bold text-[#800000] dark:text-[#FF9933] font-serif">
                            Contact Us
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className="px-3.5 py-2 bg-[#F5F5F0] dark:bg-amber-900/40 text-[#800000] dark:text-amber-200 text-xs font-bold rounded-lg border border-[#800000]/20 dark:border-amber-800 hover:bg-[#800000] hover:text-white transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                        <a
                          href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I want to inquire about package: ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N). Please share itinerary, customization & best quotation.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
