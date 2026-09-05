import React, { useEffect, useState } from 'react';
import { Pandit } from '../../types';
import { apiService } from '../../services/api';
import { UserCheck, Star, Award, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PanditsPage: React.FC = () => {
  const [pandits, setPandits] = useState<Pandit[]>([]);

  useEffect(() => {
    apiService.getPandits().then((data) => setPandits(data));
  }, []);

  return (
    <div className="py-12 bg-amber-50/40 dark:bg-amber-950/20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Hereditary Gayawal Pandas</span>
          </div>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
            Certified Gayawal Pandits Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Our Pandits maintain ancestral Bahi-Khata Gotra registers and recite authentic Vedic mantras for your family's Pind Daan rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pandits.map((pandit) => (
            <div
              key={pandit.id}
              className="bg-white dark:bg-amber-950 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 shadow-xs p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={pandit.avatar}
                    alt={pandit.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-base font-serif text-stone-900 dark:text-amber-100">
                      {pandit.name}
                    </h3>
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                      {pandit.specialization}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{pandit.rating} ({pandit.experienceYears}+ Yrs Exp)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/60 dark:bg-amber-900/30 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-500">Ancestral Gotras:</span>
                    <span className="font-bold text-stone-800 dark:text-amber-100">
                      {pandit.gotraSupported.slice(0, 3).join(', ')}...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-500">Languages Spoken:</span>
                    <span className="font-medium text-stone-700 dark:text-amber-200">
                      {pandit.languages.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href="tel:+919931246394"
                  className="flex-1 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call {pandit.name.split(' ')[0]}
                </a>
                <a
                  href={`https://wa.me/919931246394?text=${encodeURIComponent(`Hari Om! I want to book Pandit ${pandit.name} for Pind Daan rituals.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center transition-colors"
                  title="Connect on WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
