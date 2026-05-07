"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard`
    });
    if (error) setError(error.message);
    else setMessage('Password reset instructions have been sent to your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl liquid-glass border border-white/10"
      >
        <Link href="/" className="inline-block mb-8">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute w-full h-full border-2 border-white/80 rounded-full" />
            <div className="absolute w-1/3 h-1/3 bg-white rounded-full" />
          </div>
        </Link>
        
        <h1 className="text-2xl font-medium mb-2">Reset Password</h1>
        <p className="text-white/50 text-sm mb-8">Enter your email and we'll send you a link to reset your password.</p>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">{error}</div>}
        {message && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl">{message}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/40 transition text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm">
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-xs text-white/50 mt-8">
          Remember your password? <Link href="/login" className="text-white font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
