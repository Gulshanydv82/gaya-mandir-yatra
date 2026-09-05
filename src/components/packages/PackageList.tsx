import React, { useEffect, useState } from 'react';
import { Package } from '../../types';
import { apiService } from '../../services/api';
import { INITIAL_PACKAGES } from '../../data/initialData';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Check,
  Heart,
  Calendar,
  SlidersHorizontal,
  PhoneCall,
  Phone,
} from 'lucide-react';

export const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [loading, setLoading] = useState(false);
  const { wishlist, toggleWishlist, setSelectedPackageId, setBookingPackageId } = useAuth();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [pindDaanOnly, setPindDaanOnly] = useState(false);
  const [panditOnly, setPanditOnly] = useState(false);

  useEffect(() => {
    apiService
      .getPackages()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setPackages(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    if (categoryFilter !== 'All' && pkg.category !== categoryFilter) return false;
    if (pkg.pricePerAdult > maxPrice) return false;
    if (pindDaanOnly && !pkg.pindDaanService) return false;
    if (panditOnly && !pkg.panditService) return false;
    if (
      searchQuery &&
      !pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pkg.temples.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div id="package-list" className="py-12 bg-amber-50/40 dark:bg-amber-950/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
            Gaya Pilgrimage & Yatra Packages
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Browse all verified packages for Vishnupad Yatra, Bodh Gaya, and 45-Vedis Pind Daan rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter Panel */}
          <div className="lg:col-span-1 bg-white dark:bg-amber-950 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-6 h-fit">
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2 font-serif">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" /> Filter Packages
              </h3>
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setMaxPrice(15000);
                  setPindDaanOnly(false);
                  setPanditOnly(false);
                  setSearchQuery('');
                }}
                className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                Search Keyword / Temple
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Vishnupad, Bodh Gaya, Pind..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs text-stone-900 dark:text-amber-100"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-2">
                Category
              </label>
              <div className="space-y-1.5 text-xs">
                {['All', 'Pind Daan', 'Temple Yatra', 'Circuit Tour', 'VIP Express'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors font-medium ${
                      categoryFilter === cat
                        ? 'bg-amber-700 text-white font-bold'
                        : 'text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact & Custom Quote */}
            <div className="p-4 rounded-xl bg-amber-100/70 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 space-y-2 text-xs">
              <span className="font-bold text-[#800000] dark:text-[#FF9933] uppercase text-[10px] tracking-wider block">
                Custom Yatra Quotation
              </span>
              <p className="text-stone-600 dark:text-amber-200 text-[11px] leading-relaxed">
                Need customized dates, family group pricing, or 45-Vedis ritual planning?
              </p>
              <div className="space-y-1.5 pt-1">
                <a
                  href="https://wa.me/919931246394?text=Hari%20Om!%20I%20need%20a%20customized%20Yatra%20quotation%20and%20Pind%20Daan%20guidance."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Coordinator
                </a>
                <a
                  href="tel:+919931246394"
                  className="w-full py-2 px-3 rounded-lg bg-stone-100 dark:bg-amber-900/60 hover:bg-stone-200 text-[#800000] dark:text-amber-200 font-bold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5" /> Call: +91 99312 46394
                </a>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-amber-100 dark:border-amber-900">
              <label className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pindDaanOnly}
                  onChange={(e) => setPindDaanOnly(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                Pind Daan Ritual Included
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={panditOnly}
                  onChange={(e) => setPanditOnly(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                Certified Gayawal Pandit
              </label>
            </div>
          </div>

          {/* Main Packages Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between text-xs text-stone-600 dark:text-amber-300 font-semibold">
              <span>Showing {filteredPackages.length} packages</span>
            </div>

            {filteredPackages.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-amber-950 rounded-2xl border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-bold text-stone-700 dark:text-amber-200">
                  No packages match your search filters.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter('All');
                    setMaxPrice(15000);
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPackages.map((pkg) => {
                  const isSaved = wishlist.includes(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className="bg-white dark:bg-amber-950 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row group"
                    >
                      <div className="md:w-2/5 relative h-52 md:h-auto overflow-hidden">
                        <img
                          src={pkg.images[0]}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(pkg.id);
                          }}
                          title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-amber-200 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-xs cursor-pointer active:scale-90 z-10"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`}
                          />
                        </button>
                        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                          {pkg.category}
                        </span>
                      </div>

                      <div className="md:w-3/5 p-5 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-base text-stone-900 dark:text-amber-100 font-serif">
                              {pkg.name}
                            </h3>
                            <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold text-xs shrink-0">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              {pkg.rating}
                            </span>
                          </div>

                          <p className="text-xs text-stone-500 dark:text-amber-300/80 mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            {pkg.destination}
                          </p>

                          <p className="text-xs text-stone-600 dark:text-amber-200/80 mt-2 line-clamp-2">
                            {pkg.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-stone-700 dark:text-amber-200">
                          <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800">
                            ⏱ {pkg.durationDays}D / {pkg.durationNights}N
                          </span>
                          <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800">
                            🏨 {pkg.hotelCategory}
                          </span>
                          <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800">
                            🙏 Gayawal Pandit
                          </span>
                        </div>

                        <div className="pt-3 border-t border-amber-100 dark:border-amber-900 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block uppercase font-bold tracking-wider">
                              Yatra Pricing
                            </span>
                            <span className="text-base font-extrabold text-[#800000] dark:text-[#FF9933] font-serif">
                              Contact Us
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedPackageId(pkg.id)}
                              className="px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 text-xs font-bold hover:bg-amber-200 cursor-pointer"
                            >
                              View Details
                            </button>
                            <a
                              href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I want to inquire about package: ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N). Please share itinerary, customization & best quotation.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 rounded-xl bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
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
        </div>
      </div>
    </div>
  );
};
