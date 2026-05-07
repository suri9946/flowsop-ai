"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, UploadCloud, FileType, Settings } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My SOPs', href: '/sops', icon: FileText },
  { name: 'Upload Video', href: '/upload', icon: UploadCloud },
  { name: 'Templates', href: '/templates', icon: FileType },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-white/10 bg-[#050505] hidden md:flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute w-full h-full border-2 border-white/80 rounded-full" />
            <div className="absolute w-1/3 h-1/3 bg-white rounded-full" />
          </div>
          <span className="font-medium text-lg tracking-tight">FlowSOP AI</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <span className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium",
                  isActive ? "bg-white text-black" : "text-white/60 hover:text-white hover:bg-white/5"
                )}>
                  <item.icon size={18} />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="p-4 rounded-2xl liquid-glass border border-white/10">
          <p className="text-xs text-white/50 mb-2">Plan: <span className="text-white">Free</span></p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
            <div className="h-full bg-accent w-[30%]" />
          </div>
          <p className="text-[10px] text-white/40">1/3 SOPs generated this month</p>
        </div>
      </div>
    </div>
  );
}
