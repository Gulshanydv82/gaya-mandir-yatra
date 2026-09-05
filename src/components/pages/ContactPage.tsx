import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Pind Daan Ritual');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getWhatsAppUrl = () => {
    const textMsg = `Hari Om 🙏\nInquiry Type: ${inquiryType}\nName: ${name || 'Pilgrim'}\nPhone: ${phone || 'N/A'}\nEmail: ${email || 'N/A'}\nDetails: ${message || 'I would like to inquire about Purva Yatra and Pind Daan rituals.'}`;
    return `https://wa.me/919931246394?text=${encodeURIComponent(textMsg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Direct WhatsApp redirect
    const waUrl = getWhatsAppUrl();
    window.open(waUrl, '_blank');
    
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="py-12 bg-amber-50/40 dark:bg-amber-950/20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
            Contact Purva Yatra Helpline
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Have questions about Vishnupad Temple darshan timing, Pandit availability, or custom group bookings? Speak directly with our local Purva Yatra team on Phone or WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-1 bg-white dark:bg-amber-950 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-serif text-amber-900 dark:text-amber-100">
              Purva Yatra Head Office
            </h3>

            <div className="space-y-4 text-xs text-stone-700 dark:text-amber-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#800000] dark:text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900 dark:text-amber-100">
                    Gaya Main Office
                  </span>
                  <p className="text-stone-500 dark:text-amber-300">
                    Vishnupad Temple Complex, Falgu Ghat Road, Chand Choura, Gaya, Bihar - 823001
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#800000] dark:text-[#FF9933] shrink-0" />
                <div>
                  <span className="font-bold block text-stone-900 dark:text-amber-100">
                    24/7 Pilgrim Helpline
                  </span>
                  <a href="tel:+919931246394" className="hover:underline font-bold text-[#800000] dark:text-[#FF9933] text-sm">
                    +91 99312 46394
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#800000] dark:text-[#FF9933] shrink-0" />
                <div>
                  <span className="font-bold block text-stone-900 dark:text-amber-100">
                    Email Assistance
                  </span>
                  <a href="mailto:Vikashsinha2@gmail.com" className="hover:underline font-semibold text-[#800000] dark:text-[#FF9933]">
                    Vikashsinha2@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#800000] dark:text-[#FF9933] shrink-0" />
                <div>
                  <span className="font-bold block text-stone-900 dark:text-amber-100">
                    Office Hours
                  </span>
                  <p>Monday - Sunday: 5:00 AM - 10:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Instant WhatsApp Inquiry</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Connect directly with our Purva Yatra coordinator on WhatsApp for instant booking, Pandit confirmation, and station pickup assistance.
              </p>
              <a
                href="https://wa.me/919931246394?text=Hari%20Om!%20I%20want%20to%20inquire%20about%20Purva%20Yatra%20and%20Pind%20Daan."
                target="_blank"
                rel="noreferrer"
                className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Direct WhatsApp Chat (+91 99312 46394)
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-amber-950 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-amber-100 mb-1">
              Send Your Pilgrimage Inquiry
            </h3>
            <p className="text-xs text-stone-500 dark:text-amber-300 mb-5">
              Fill details below to submit inquiry and directly chat with our team on WhatsApp.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="font-bold text-lg font-serif">Inquiry Sent & Redirecting to WhatsApp!</h4>
                <p className="text-xs max-w-md mx-auto">
                  Opening WhatsApp to connect with <strong>+91 99312 46394</strong>. If window didn't open automatically, click the button below:
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
                >
                  <MessageCircle className="w-4 h-4" /> Open WhatsApp Chat Now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9931246394"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Vikashsinha2@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs font-bold"
                    >
                      <option value="Pind Daan Ritual">Pind Daan Ritual Inquiry</option>
                      <option value="Package Booking">Package Booking Help</option>
                      <option value="Gayawal Pandit Booking">Gayawal Pandit Booking</option>
                      <option value="Station Pickup/Drop">Station Pickup/Drop</option>
                      <option value="Group / Special Senior Citizen Yatra">
                        Group / Senior Citizen Yatra
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                    Your Message / Travel Dates / Questions
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about expected travel dates, number of family members, and specific ritual requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" /> Send Inquiry via Direct WhatsApp
                  </button>

                  <a
                    href="tel:+919931246394"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call +91 99312 46394
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
