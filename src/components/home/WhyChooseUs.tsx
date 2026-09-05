import React from 'react';
import { ShieldCheck, UserCheck, Hotel, Car, HeartHandshake, Headset } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
      title: 'Verified Gayawal Pandits',
      desc: 'Authentic hereditary Pandas with full Gotra registers to ensure proper Vedic mantras and complete ritual satisfaction.',
    },
    {
      icon: <Hotel className="w-6 h-6 text-amber-600" />,
      title: 'Hygienic Satvik Hotels',
      desc: 'Selected AC hotels within 5-10 mins from Vishnupad Temple with pure vegetarian kitchen facilities.',
    },
    {
      icon: <Car className="w-6 h-6 text-amber-600" />,
      title: 'Station & Airport Transfers',
      desc: 'Clean private AC vehicles waiting for your arrival at Gaya Junction or Patna Airport.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: '100% Price Transparency',
      desc: 'No hidden charges or unexpected demands during rituals. Full invoice receipt generated instantly.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
      title: 'Special Senior Citizen Care',
      desc: 'Wheelchair assistance, ground floor rooms, and e-rickshaw transfers organized for elderly family members.',
    },
    {
      icon: <Headset className="w-6 h-6 text-amber-600" />,
      title: 'Dedicated Local Yatra Manager',
      desc: '24/7 personal manager stationed in Gaya to assist your family from station arrival to drop-off.',
    },
  ];

  return (
    <section className="py-14 bg-[#FFFDF0] dark:bg-[#2A1D15] transition-colors border-b border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#3D2B1F] dark:text-[#FFFDF0] tracking-tight">
            Why Pilgrims Trust Gaya Mandir Yatra
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4D42] dark:text-[#E6E2D3] mt-1">
            Over 50,000 families from across India & abroad have performed their sacred Gaya pilgrimage with our seamless management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#3D2B1F] border border-[#E6E2D3] hover:border-[#800000]/40 shadow-xs transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFFDF0] dark:bg-[#2A1D15] border border-[#E6E2D3] flex items-center justify-center text-[#800000]">
                {item.icon}
              </div>
              <h3 className="font-bold font-serif text-base text-[#3D2B1F] dark:text-[#FFFDF0]">
                {item.title}
              </h3>
              <p className="text-xs text-[#5C4D42] dark:text-[#E6E2D3] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
