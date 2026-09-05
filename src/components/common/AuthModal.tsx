import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, User, Phone, MapPin, ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    initSendOTP?: (configuration: any) => void;
    sendOtp?: (identifier: string, success?: (data: any) => void, failure?: (error: any) => void) => void;
    verifyOtp?: (otp: number | string, success?: (data: any) => void, failure?: (error: any) => void, reqId?: string) => void;
    retryOtp?: (channel: string | null, success?: (data: any) => void, failure?: (error: any) => void, reqId?: string) => void;
  }
}

interface AuthModalProps { onClose: () => void; }

const WIDGET_ID = import.meta.env.VITE_MSG91_WIDGET_ID || '366964725032323637363038';
const WIDGET_TOKEN = import.meta.env.VITE_MSG91_WIDGET_TOKEN || '';

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { setCurrentUser, authModalTab, setAuthModalTab } = useAuth();
  const [isRegister, setIsRegister] = useState(authModalTab === 'register');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [reqId, setReqId] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!WIDGET_TOKEN) {
      setError('MSG91 widget token is not configured. Add VITE_MSG91_WIDGET_TOKEN in .env.local.');
      return;
    }

    if (window.sendOtp) return;

    const configuration = {
      widgetId: WIDGET_ID,
      tokenAuth: WIDGET_TOKEN,
      identifier: '',
      exposeMethods: true,
      captchaRenderId: 'msg91-captcha',
      success: () => {},
      failure: () => {},
    };

    const existing = document.querySelector('script[data-msg91-otp="true"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://verify.msg91.com/otp-provider.js';
    script.async = true;
    script.dataset.msg91Otp = 'true';
    script.onload = () => window.initSendOTP?.(configuration);
    script.onerror = () => setError('MSG91 OTP script load nahi hua. Internet check karke page refresh karo.');
    document.head.appendChild(script);
  }, []);

  const handleSendOtp = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (isRegister && !name.trim()) return setError('Please enter your full name.');
    if (isRegister && !email.trim()) return setError('Please enter your email address.');

    const identifier = normalizePhone(phone);
    if (!/^91\d{10}$/.test(identifier)) {
      return setError('Please enter a valid 10-digit Indian mobile number.');
    }
    if (!window.sendOtp) {
      return setError('MSG91 OTP is still loading. Please wait 1-2 seconds and try again.');
    }

    setLoading(true);
    window.sendOtp(
      identifier,
      (data) => {
        setReqId(data?.reqId || data?.requestId || '');
        setOtpSent(true);
        setSuccessMsg(`OTP sent to +${identifier}.`);
        setLoading(false);
      },
      (err) => {
        console.error('MSG91 sendOtp error:', err);
        setError(err?.message || 'OTP send nahi hua. Number aur MSG91 configuration check karo.');
        setLoading(false);
      }
    );
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!/^\d{4,6}$/.test(otp.trim())) {
      return setError('Please enter the OTP received on your mobile.');
    }
    if (!window.verifyOtp) return setError('MSG91 OTP is still loading. Please refresh the page.');

    setLoading(true);
    window.verifyOtp(
      otp.trim(),
      async (data) => {
        try {
          console.log("MSG91 VERIFY RESPONSE:", data);
          const accessToken =
  data?.accessToken ||
  data?.access_token ||
  data?.token ||
  (data?.type === 'success' ? data?.message : null);
          if (!accessToken) throw new Error('MSG91 verification token was not returned.');

          const identifier = normalizePhone(phone);
          const response = await fetch('/api/auth/msg91', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              accessToken,
              identifier,
              mode: isRegister ? 'register' : 'login',
              name: name.trim(),
              email: email.trim(),
              address: address.trim(),
              role: 'user',
            }),
          });
          const result = await response.json();
          if (!response.ok || !result.success || !result.user) {
            throw new Error(result.message || 'Server authentication failed.');
          }

          // MSG91 has already been verified by the server. Put that user into the existing auth state.
          setCurrentUser(result.user);

          setSuccessMsg(isRegister ? 'Account created successfully! Welcome to Purva Yatra.' : 'Logged in successfully!');
          setTimeout(onClose, 800);
        } catch (err: any) {
          setError(err?.message || 'Authentication failed.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('MSG91 verifyOtp error:', err);
        setError(err?.message || 'Invalid or expired OTP.');
        setLoading(false);
      },
      reqId || undefined
    );
  };

  const handleRetry = () => {
    if (!window.retryOtp) return setError('MSG91 OTP is still loading.');
    setError(null);
    setSuccessMsg(null);
    setResending(true);
    window.retryOtp(
      '11',
      (data) => {
        setReqId(data?.reqId || data?.requestId || reqId);
        setSuccessMsg('OTP resent successfully.');
        setResending(false);
      },
      (err) => {
        setError(err?.message || 'OTP resend nahi hua.');
        setResending(false);
      },
      reqId || undefined
    );
  };

  const switchTab = (toRegister: boolean) => {
    setIsRegister(toRegister);
    setAuthModalTab(toRegister ? 'register' : 'login');
    setOtpSent(false);
    setOtp('');
    setReqId('');
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#2A1D15] rounded-3xl max-w-md w-full p-6 border border-amber-200 dark:border-amber-800 shadow-2xl relative space-y-4 text-stone-900 dark:text-amber-100">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 dark:bg-amber-900/60 text-stone-500 dark:text-amber-300 hover:bg-stone-200 cursor-pointer transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex bg-stone-100 dark:bg-amber-900/40 p-1 rounded-2xl border border-amber-200/60 dark:border-amber-800/60">
          <button type="button" onClick={() => switchTab(false)} className={`flex-1 py-2 text-xs font-bold rounded-xl ${!isRegister ? 'bg-[#800000] text-white' : 'text-stone-600 dark:text-amber-200'}`}>Sign In / Login</button>
          <button type="button" onClick={() => switchTab(true)} className={`flex-1 py-2 text-xs font-bold rounded-xl ${isRegister ? 'bg-[#800000] text-white' : 'text-stone-600 dark:text-amber-200'}`}>Register / Sign Up</button>
        </div>

        <div className="text-center pt-1">
          <div className="w-12 h-12 rounded-2xl bg-[#800000] text-white flex items-center justify-center mx-auto font-bold shadow-md"><User className="w-6 h-6" /></div>
          <h3 className="text-xl font-bold font-serif mt-2 text-[#800000] dark:text-[#FF9933]">{isRegister ? 'Register Pilgrim Account' : 'Pilgrim & Devotee Sign In'}</h3>
          <p className="text-xs text-stone-500 dark:text-amber-300 mt-1">{isRegister ? 'Create an account with mobile OTP.' : 'Sign in securely using your mobile OTP.'}</p>
        </div>

        {error && <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>}
        {successMsg && <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /><span>{successMsg}</span></div>}

        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-3">
          {isRegister && !otpSent && <>
            <div><label className="block text-xs font-bold mb-1">Full Name *</label><div className="relative"><User className="w-4 h-4 text-stone-400 absolute left-3 top-3" /><input type="text" required placeholder="e.g. Ramesh Chandra Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs" /></div></div>
            <div><label className="block text-xs font-bold mb-1">Email Address *</label><div className="relative"><Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" /><input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs" /></div></div>
            <div><label className="block text-xs font-bold mb-1">City / Hometown (Optional)</label><div className="relative"><MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" /><input type="text" placeholder="e.g. Varanasi, UP" value={address} onChange={e => setAddress(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs" /></div></div>
          </>}

          <div><label className="block text-xs font-bold mb-1">Mobile Number *</label><div className="relative"><Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" /><input type="tel" required disabled={otpSent} placeholder="99312 46394" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-xs disabled:opacity-60" /></div></div>

          {otpSent && <div><label className="block text-xs font-bold mb-1">Enter OTP</label><input type="text" inputMode="numeric" maxLength={6} autoFocus placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className="w-full px-3 py-3 rounded-xl border border-stone-300 dark:border-amber-800 bg-stone-50 dark:bg-amber-900/50 text-center tracking-[0.5em] font-bold text-lg" /></div>}

          <div id="msg91-captcha" className="min-h-0" />

          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#800000] hover:bg-[#660000] text-white font-bold text-xs disabled:opacity-50">
            {loading ? 'Please wait...' : otpSent ? 'Verify OTP & Continue' : 'Send OTP'}
          </button>
        </form>

        {otpSent && <div className="flex gap-2"><button type="button" onClick={handleRetry} disabled={resending} className="flex-1 py-2 rounded-xl border border-amber-300 text-xs font-bold">{resending ? 'Resending...' : 'Resend OTP'}</button><button type="button" onClick={() => { setOtpSent(false); setOtp(''); setReqId(''); setError(null); }} className="flex-1 py-2 rounded-xl border border-stone-300 text-xs font-bold">Change Number</button></div>}

        <div className="pt-1 text-center text-xs text-stone-500 dark:text-amber-300">{isRegister ? 'Already registered? ' : "Don't have an account yet? "}<button type="button" onClick={() => switchTab(!isRegister)} className="text-[#800000] dark:text-[#FF9933] font-bold hover:underline ml-1">{isRegister ? 'Sign In here' : 'Sign Up / Register now'}</button></div>
        <div className="text-[10px] text-center text-stone-400 flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure OTP verification by MSG91</div>
      </div>
    </div>
  );
};