import React, { useEffect, useState } from 'react';
import { Hotel } from '../../types';
import { apiService } from '../../services/api';
import { Building2, Star, MapPin, Check, Wifi, Utensils, ShieldCheck } from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    apiService.getHotels().then((data) => setHotels(data));
  }, []);

  return (
    <div className="py-12 bg-amber-50/40 dark:bg-amber-950/20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Verified Satvik Accommodation</span>
          </div>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
            Gaya Partner Hotels & Yatra Niwas
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Hygienic AC rooms close to Vishnupad Temple and Falgu Ghat with 100% pure vegetarian kitchen facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-amber-950 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 shadow-xs overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                  {hotel.category}
                </span>
              </div>

              <div className="md:w-3/5 p-5 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-stone-900 dark:text-amber-100 font-serif">
                      {hotel.name}
                    </h3>
                    <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {hotel.rating}
                    </span>
                  </div>

                  <p className="text-stone-500 dark:text-amber-300 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    {hotel.location} ({hotel.distanceToTemple} from Vishnupad Temple)
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-amber-900/40 text-stone-700 dark:text-amber-200 text-[10px] font-semibold"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-100 dark:border-amber-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block uppercase font-bold tracking-wider">Room Tariff</span>
                    <span className="text-base font-extrabold text-[#800000] dark:text-[#FF9933] font-serif">
                      Contact Us
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om 🙏 I want to book room at hotel: ${hotel.name} in Gaya (${hotel.location}). Please share tariff and room availability.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#800000] hover:bg-[#660000] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
