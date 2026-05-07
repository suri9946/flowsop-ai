"use client";
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "It used to take me 2 hours to write out a Notion guide for a new Shopify integration. Now I just record a 3-minute video and FlowSOP handles the rest.",
    name: "Sarah Jenkins",
    role: "Head of Ops, Acme Corp"
  },
  {
    quote: "The screenshot detection is magic. It perfectly aligns the visual context with the AI-generated text. Unbelievable time saver.",
    name: "David Chen",
    role: "Founder, ScaleUp"
  },
  {
    quote: "Our support onboarding time was cut in half. New hires just follow the generated checklists and rarely need to ask questions.",
    name: "Elena Rodriguez",
    role: "CS Lead, Zendash"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="liquid-glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full"
          >
            <p className="text-white/80 leading-relaxed mb-8">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg">
                {t.name[0]}
              </div>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-white/50 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
