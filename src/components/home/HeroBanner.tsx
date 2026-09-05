import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Compass,
  Calendar,
  Users,
  Search,
  ShieldCheck,
  MapPin,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab } = useAuth();
  const { t } = useLanguage();
  const [searchCategory, setSearchCategory] = useState<string>('Pind Daan Rituals');
  const [searchDate, setSearchDate] = useState<string>('Nov 12 - Nov 15');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('packages');
  };

  return (
    <div className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden py-12 px-4 border-b border-[#E6E2D3]">
      {/* Background image & dark warm earth overlay */}
      <div className="absolute inset-0 bg-[#3D2B1F]/60 z-10"></div>
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ee/Vishnupad_temple_gaya_bihar.jpg')] bg-cover bg-center"></div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FF9933]/90 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{t('hero.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4 drop-shadow-lg">
          Experience the Sacred <br />
          <span className="italic text-[#FF9933]">Spirit of Gaya</span>
        </h1>

        <p className="text-white text-base sm:text-lg opacity-90 mb-8 font-light italic tracking-wide max-w-2xl mx-auto">
          Specialized Pind Daan, Vishnupad Temple Tours, and Authentic Pandit Services for your spiritual fulfillment.
        </p>

        {/* Floating Pill Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row bg-white p-2 rounded-2xl sm:rounded-full shadow-2xl max-w-2xl mx-auto items-center gap-2 border border-[#E6E2D3]"
        >
          <div className="flex-1 px-4 sm:px-6 py-2 border-b sm:border-b-0 sm:border-r border-gray-200 text-left w-full">
            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Package Type
            </label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-transparent w-full text-sm font-semibold text-[#3D2B1F] outline-none cursor-pointer"
            >
              <option value="Pind Daan Rituals">Pind Daan Rituals</option>
              <option value="Temple Darshan">Temple Darshan Tour</option>
              <option value="Hotels">Hotels & Stay</option>
              <option value="Pandit Service">Gayawal Pandit Service</option>
            </select>
          </div>

          <div className="flex-1 px-4 sm:px-6 py-2 border-b sm:border-b-0 sm:border-r border-gray-200 text-left w-full">
            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Travel Date / Window
            </label>
            <input
              type="text"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Nov 12 - Nov 15"
              className="bg-transparent w-full text-sm font-semibold text-[#3D2B1F] outline-none"
            />
          </div>

          <div className="flex-none px-2 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#FF9933] text-white p-3.5 sm:p-4 rounded-full hover:bg-[#e68a2e] transition-colors shadow-md flex items-center justify-center gap-2 font-bold text-sm"
            >
              <Search className="w-5 h-5" />
              <span className="sm:hidden">Search Yatra</span>
            </button>
          </div>
        </form>

        {/* Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-white/90 font-medium">
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-[#FF9933]" /> Certified Vedic Pandits
          </span>
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-[#FF9933]" /> Vishnupad Priority Access
          </span>
          <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-[#FF9933]" /> 100% Satisfaction Guarantee
          </span>
        </div>
      </div>
    </div>
  );
};
