"use client";
import { motion } from 'framer-motion';

const cases = [
  { title: "Shopify Training", subtitle: "E-commerce" },
  { title: "Employee Onboarding", subtitle: "HR" },
  { title: "Customer Support", subtitle: "CS" },
  { title: "CRM Workflows", subtitle: "Sales" },
  { title: "Operations Docs", subtitle: "Ops" },
];

export default function UseCases() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
          Built for <span className="font-serif italic pr-2">every</span> team
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {cases.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="px-6 py-4 rounded-full liquid-glass border border-white/10 flex items-center gap-3 hover:bg-white/5 transition cursor-default"
          >
            <span className="text-sm text-white/40">{c.subtitle}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-medium">{c.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
