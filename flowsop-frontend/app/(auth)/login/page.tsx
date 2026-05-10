"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/dashboard');
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
        
        <h1 className="text-2xl font-medium mb-2">Welcome back</h1>
        <p className="text-white/50 text-sm mb-8">Sign in to continue to FlowSOP AI</p>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
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
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-xs font-medium text-white/60">Password</label>
              <Link href="/forgot" className="text-xs text-accent hover:text-accent/80 transition">Forgot?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/40 transition text-sm"
              required
            />
          </div>
          <div className="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-white cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-white/50 cursor-pointer hover:text-white/70 transition">
              Remember me
            </label>
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm">
            Sign In
          </button>

        </form>

        <p className="text-center text-xs text-white/50 mt-8">
          Don't have an account? <Link href="/signup" className="text-white font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
