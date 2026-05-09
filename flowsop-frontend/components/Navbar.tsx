"use client";
import Link from 'next/link';
import { Twitter, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8">
          <div className="absolute w-full h-full border-2 border-white/80 rounded-full" />
          <div className="absolute w-2/3 h-2/3 border-2 border-white/50 rounded-full" />
          <div className="absolute w-1/3 h-1/3 bg-white rounded-full" />
        </div>
        <span className="font-medium text-lg tracking-tight">FlowSOP AI</span>
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
        <Link href="#features" className="hover:text-white transition">Features</Link>
        <span className="w-1 h-1 bg-white/30 rounded-full" />
        <Link href="#how-it-works" className="hover:text-white transition">How It Works</Link>
        <span className="w-1 h-1 bg-white/30 rounded-full" />
        <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
      </div>

      {/* Right Socials & Actions */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="https://twitter.com" className="w-10 h-10 flex items-center justify-center rounded-full liquid-glass hover:scale-105 transition">
          <Twitter size={18} className="text-white/80" />
        </Link>

        <Link href="/login" className="ml-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition">
          Login
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden liquid-glass p-2 rounded-full">
        <Menu size={20} />
      </div>
    </nav>
  );
}
