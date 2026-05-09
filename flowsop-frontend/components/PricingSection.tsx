"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PaymentModal from './PaymentModal';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  const handleProClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-32 px-6 max-w-5xl mx-auto border-t border-white/10">
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          setIsModalOpen(false);
          router.push('/dashboard');
        }}
      />
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Simple, transparent pricing</h2>
        <p className="text-white/50">Start for free, upgrade when you need more power.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass p-8 rounded-3xl border border-white/10 flex flex-col"
        >
          <h3 className="text-2xl font-medium mb-2">Free</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-medium">₹0</span>
            <span className="text-white/50 text-sm">/mo</span>
          </div>
          <p className="text-white/60 text-sm mb-8 flex-1">Perfect for individuals trying out the platform.</p>
          
          <ul className="space-y-4 mb-8 text-sm text-white/80">
            {["3 SOPs per month", "Standard AI processing", "Web view export", "Basic screenshots"].map((feat, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} className="text-white/40" /> {feat}
              </li>
            ))}
          </ul>
          
          <Link href="/signup">
            <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition text-sm font-medium">
              Start Free
            </button>
          </Link>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#0d0d0d] p-8 rounded-3xl border border-white/40 relative flex flex-col"
        >
          <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
            Recommended
          </div>
          <h3 className="text-2xl font-medium mb-2 text-white">Pro</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-medium">₹50</span>
            <span className="text-white/50 text-sm">/50 uses</span>
          </div>
          <p className="text-white/60 text-sm mb-8 flex-1">For teams that need serious documentation.</p>
          
          <ul className="space-y-4 mb-8 text-sm text-white/90">
            {["50 SOP generations", "Priority AI generation", "High-res PDF Exports", "Custom branding", "API Access"].map((feat, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} className="text-accent" /> {feat}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={handleProClick}
            className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 transition text-sm font-medium"
          >
            Upgrade to Pro
          </button>
        </motion.div>
      </div>
    </section>
  );
}

