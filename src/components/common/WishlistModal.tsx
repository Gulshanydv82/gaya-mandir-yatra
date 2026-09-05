import React, { useEffect, useState } from 'react';
import { Package } from '../../types';
import { apiService } from '../../services/api';
import { INITIAL_PACKAGES } from '../../data/initialData';
import { useAuth } from '../../context/AuthContext';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ onClose }) => {
  const { wishlist, toggleWishlist, setSelectedPackageId, setBookingPackageId, setActiveTab } = useAuth();
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);

  useEffect(() => {
    apiService
      .getPackages()
      .then((all) => {
        if (all && Array.isArray(all) && all.length > 0) {
          setSavedPackages(all.filter((p) => wishlist.includes(p.id)));
        } else {
          setSavedPackages(INITIAL_PACKAGES.filter((p) => wishlist.includes(p.id)));
        }
      })
      .catch(() => {
        setSavedPackages(INITIAL_PACKAGES.filter((p) => wishlist.includes(p.id)));
      });
  }, [wishlist]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#2A1D15] rounded-3xl max-w-lg w-full p-6 border border-amber-200 dark:border-amber-800 shadow-2xl relative space-y-4 text-stone-900 dark:text-amber-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 dark:bg-amber-900/60 text-stone-500 dark:text-amber-300 hover:bg-stone-200 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-amber-100 dark:border-amber-800 pb-3">
          <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
          <h3 className="text-lg font-bold font-serif text-[#800000] dark:text-[#FF9933]">
            Saved Yatra Wishlist ({wishlist.length})
          </h3>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {savedPackages.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/40 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-xs text-stone-500 dark:text-amber-300">
                You haven't added any packages to your wishlist yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('packages');
                }}
                className="px-4 py-2 rounded-xl bg-[#800000] text-white text-xs font-bold hover:bg-[#660000] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                Browse Yatra Packages <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            savedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-3.5 rounded-2xl border border-amber-200/80 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-900/20 flex items-center justify-between gap-3 text-xs hover:border-[#800000]/40 transition-colors"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => {
                    onClose();
                    setSelectedPackageId(pkg.id);
                  }}
                >
                  <img
                    src={pkg.images[0]}
                    alt={pkg.name}
                    className="w-14 h-14 rounded-xl object-cover border border-amber-300 dark:border-amber-700 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-amber-100 font-serif line-clamp-1">
                      {pkg.name}
                    </h4>
                    <p className="text-[11px] text-[#800000] dark:text-[#FF9933] font-semibold">
                      Contact for Best Price • {pkg.durationDays}D/{pkg.durationNights}N
                    </p>
                    <span className="text-[10px] text-stone-500 dark:text-amber-300">
                      {pkg.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I want to inquire about my wishlisted package: ${pkg.name} (${pkg.durationDays}D/${pkg.durationNights}N). Please share pricing and itinerary.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-[11px] cursor-pointer shadow-xs"
                  >
                    Contact Us
                  </a>

                  <button
                    onClick={() => toggleWishlist(pkg.id)}
                    title="Remove from wishlist"
                    className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
