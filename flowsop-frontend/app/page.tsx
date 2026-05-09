import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <PricingSection />
      <FinalCTA />
      
      <footer className="py-8 px-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
          <span>© 2026 FlowSOP AI. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="mailto:forzoo4u@gmail.com" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </main>
  );
}
