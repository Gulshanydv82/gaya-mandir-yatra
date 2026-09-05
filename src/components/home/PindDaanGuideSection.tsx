import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, CheckCircle2, Award, HeartHandshake, ShieldCheck, UserCheck } from 'lucide-react';

export const PindDaanGuideSection: React.FC = () => {
  const { setActiveTab } = useAuth();

  const steps = [
    {
      num: '01',
      title: 'Falgu River Snan & Sankalp',
      desc: 'Pilgrims gather at Dev Ghat on Falgu River at sunrise. The Gayawal Pandit conducts holy Sankalp with Ganga jal, black sesame seeds (Kala Til), and Kusha grass.',
    },
    {
      num: '02',
      title: 'Vishnupad Footprint Pind Offering',
      desc: 'Offerings of rice-flour pinds (Pind Daan) are placed directly at the 40 cm basalt rock footprint of Lord Vishnu inside the sanctorum with Vedic mantras.',
    },
    {
      num: '03',
      title: 'Sita Kund & Balu Pind Ceremony',
      desc: 'Visiting Sita Kund where Goddess Sita performed Pind Daan for King Dasharatha using river sand. Grants peace to souls trapped in untimely deaths.',
    },
    {
      num: '04',
      title: 'Akshaywat Final Blessing & Brahman Bhojan',
      desc: 'Completing the ritual under the Eternal Banyan Tree (Akshaywat) with Brahman Bhojan, cloth donation (Vastra Daan), and Gayawal Panda blessing.',
    },
  ];

  return (
    <section className="py-14 bg-amber-900 text-amber-50 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Vedic Ritual Science</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-amber-100 tracking-tight">
            How Gaya Pind Daan Grants Eternal Ancestral Salvation
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-2 leading-relaxed">
            Gaya is ordained in the Garuda Purana and Vayu Purana as the supreme pilgrimage for Pitru Rin (ancestral debt) discharge. Pind Daan performed here liberates 7 generations of ancestors.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-amber-950/80 border border-amber-700/60 rounded-2xl p-5 relative space-y-3 hover:border-amber-500/80 transition-all shadow-lg"
            >
              <span className="text-3xl font-extrabold font-serif text-amber-500/40 block">
                {step.num}
              </span>
              <h3 className="font-bold font-serif text-base text-amber-200">{step.title}</h3>
              <p className="text-xs text-amber-100/80 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Banner Box */}
        <div className="mt-12 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-2xl p-6 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold font-serif text-amber-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Need a Certified Gayawal Pandit for Your Family?
            </h3>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Our experienced Gayawal Pandas maintain traditional family Gotra registers (Bahi Khata). They guide you with full authenticity, providing all ritual materials (til, rice, barley flour, kusha grass) and managing Brahman Bhojan.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('pandits')}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all shrink-0"
          >
            Connect With Gayawal Pandit
          </button>
        </div>
      </div>
    </section>
  );
};
