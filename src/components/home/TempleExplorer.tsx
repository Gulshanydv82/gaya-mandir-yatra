import React, { useEffect, useState } from 'react';
import { Temple } from '../../types';
import { apiService } from '../../services/api';
import { MapPin, Clock, Info, ExternalLink, Sparkles, X } from 'lucide-react';

export const TempleExplorer: React.FC = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  useEffect(() => {
    apiService.getTemples().then((data) => setTemples(data));
  }, []);

  return (
    <section className="py-14 bg-white dark:bg-[#2A1D15] transition-colors border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/15 text-[#800000] dark:text-[#FF9933] text-xs font-bold mb-2 uppercase tracking-wider border border-[#FF9933]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>Gaya Dham Sacred Shrines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#3D2B1F] dark:text-[#FFFDF0] tracking-tight">
            Popular Temples & Ritual Spots in Gaya
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4D42] dark:text-[#E6E2D3] mt-1">
            Explore the ancient temples, footprint sanctorum, and 45-Vedis ritual locations across Gaya & Bodh Gaya.
          </p>
        </div>

        {/* Temple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="bg-white dark:bg-[#3D2B1F] rounded-2xl border border-[#E6E2D3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-1"
            >
              <div className="relative h-40 rounded-xl overflow-hidden">
                <img
                  src={temple.images[0]}
                  alt={temple.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold font-serif text-base">{temple.name}</h3>
                  <p className="text-[11px] text-[#E6E2D3] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF9933] shrink-0" />
                    <span className="truncate">{temple.location}</span>
                  </p>
                </div>
                {temple.pindDaanSpot && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider">
                    Pind Daan Spot
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#5C4D42] dark:text-[#E6E2D3] line-clamp-3">
                    {temple.significance}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#5C4D42] dark:text-[#E6E2D3] pt-2 border-t border-[#E6E2D3]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#800000]" /> {temple.visitingHours}
                    </span>
                    <span className="font-bold text-[#800000] dark:text-[#FF9933]">
                      Deity: {temple.deity.split('(')[0]}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTemple(temple)}
                  className="w-full py-2 rounded-lg bg-[#F5F5F0] text-[#800000] hover:bg-[#800000] hover:text-white text-xs font-bold border border-[#800000]/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-[#FF9933]" /> Read Full Temple History & Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temple Detail Modal */}
      {selectedTemple && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-amber-950 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-amber-200 dark:border-amber-800 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedTemple(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 dark:bg-amber-900 text-stone-600 dark:text-amber-200 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 rounded-xl overflow-hidden">
              <img
                src={selectedTemple.images[0]}
                alt={selectedTemple.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-extrabold font-serif">{selectedTemple.name}</h3>
                <p className="text-xs text-amber-200 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {selectedTemple.location}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-800 dark:text-amber-100">
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 uppercase text-[11px] tracking-wider">
                  Deity
                </h4>
                <p>{selectedTemple.deity}</p>
              </div>

              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 uppercase text-[11px] tracking-wider">
                  History & Puranic Context
                </h4>
                <p className="leading-relaxed">{selectedTemple.history}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/40 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
                  <span className="font-bold block text-amber-800 dark:text-amber-200">
                    Visiting Hours
                  </span>
                  <span>{selectedTemple.visitingHours}</span>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/40 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
                  <span className="font-bold block text-amber-800 dark:text-amber-200">
                    Dress Code
                  </span>
                  <span>{selectedTemple.dressCode}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-900/40 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
                <span className="font-bold block text-amber-800 dark:text-amber-200">
                  Best Time to Visit
                </span>
                <span>{selectedTemple.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200 dark:border-amber-800 flex justify-end">
              <button
                onClick={() => setSelectedTemple(null)}
                className="px-5 py-2 bg-amber-700 text-white font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
