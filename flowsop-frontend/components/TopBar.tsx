"use client";
import { Search, Bell, Moon, User } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-16 border-b border-white/10 bg-[#050505] flex items-center justify-between px-6 md:px-8">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Search SOPs..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-white/30 text-sm placeholder:text-white/30 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white/60">
          <Bell size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white/60">
          <Moon size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
          <User size={18} className="text-white/80" />
        </div>
      </div>
    </header>
  );
}
