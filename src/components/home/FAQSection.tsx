import React, { useEffect, useState } from 'react';
import { FAQ } from '../../types';
import { apiService } from '../../services/api';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    apiService.getFaqs().then((data) => setFaqs(data));
  }, []);

  return (
    <section className="py-14 bg-white dark:bg-amber-950/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Common Pilgrim Queries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100 tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Important information about Gaya Vishnupad Temple rules, Pind Daan rituals, and travel arrangements.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-amber-200/80 dark:border-amber-800/60 overflow-hidden bg-stone-50/60 dark:bg-amber-900/20 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-serif font-bold text-sm text-stone-900 dark:text-amber-100 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 dark:text-amber-200/90 leading-relaxed border-t border-amber-100 dark:border-amber-900/60 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
