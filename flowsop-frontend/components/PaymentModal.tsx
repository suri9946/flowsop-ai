"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, CreditCard, Smartphone, Copy, Check } from 'lucide-react';
import { api } from '@/lib/api';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<'options' | 'upi'>('options');
  const [utr, setUtr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const upiId = "7483353574@ibl";
  const amount = 50;
  const upiLink = `upi://pay?pa=${upiId}&pn=FlowSOP%20AI&am=${amount}&cu=INR&tn=FlowSOP%2050%20Uses`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!utr || utr.length < 10) {
      setError('Please enter a valid 12-digit UTR/Transaction ID');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // In lib/api.ts we need to add verifyPayment
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await api.getAuthToken())}`
        },
        body: JSON.stringify({ utr, amount })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      
      onSuccess();
      setStep('options');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition">
          <X size={20} />
        </button>

        <div className="p-8">
          {step === 'options' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-medium mb-2">Upgrade to Pro</h2>
                <p className="text-white/50 text-sm">Get 50 SOP generations for just ₹50</p>
              </div>

              <div className="space-y-3">
                <a 
                  href={upiLink}
                  onClick={() => setStep('upi')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Smartphone size={20} className="text-white/80" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Pay via UPI App</p>
                    <p className="text-xs text-white/40">GPay, PhonePe, Paytm, etc.</p>
                  </div>
                </a>

                <button 
                  onClick={() => setStep('upi')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <CreditCard size={20} className="text-white/80" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Scan QR Code</p>
                    <p className="text-xs text-white/40">Pay from any UPI app</p>
                  </div>
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span>Secure payment powered by UPI</span>
                <div className="flex gap-2">
                    <div className="w-8 h-4 bg-white/10 rounded" />
                    <div className="w-8 h-4 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="inline-block p-4 bg-white rounded-2xl mb-2">
                <img src={qrUrl} alt="UPI QR Code" className="w-48 h-48" />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Scan to pay ₹50</p>
                <div 
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition"
                >
                  <span className="text-xs text-white/60">{upiId}</span>
                  {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-white/40" />}
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 ml-1">Enter Transaction ID / UTR</label>
                  <input 
                    type="text" 
                    placeholder="12-digit number from your app"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/40 transition text-sm"
                  />
                </div>

                {error && <p className="text-xs text-red-400 ml-1">{error}</p>}

                <button 
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Payment'}
                </button>
                
                <button 
                  onClick={() => setStep('options')}
                  className="w-full py-2 text-xs text-white/40 hover:text-white transition"
                >
                  ← Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
