"use client";
import React from 'react';
import { motion } from 'framer-motion';

const FEEDBACK = [
  {
    name: "Dr. Sarah Chen",
    role: "Senior NLP Researcher",
    msg: "The accuracy of the combined SVM and Gemini approach is impressive. It outperforms standard classifiers in detecting complex propaganda.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "James Wilson",
    role: "Investigative Journalist",
    msg: "TruthLens has become an essential part of my fact-checking workflow. The keyword transparency saves me hours of manual verification.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  },
  {
    name: "Elena Rodriguez",
    role: "Media Literacy Advocate",
    msg: "Finally, a tool that doesn't just say 'FAKE', but explains why. It's an incredible educational resource for the public.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
            User Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Loved by Experts & Readers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEEDBACK.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative group transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-8 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21C14.017 20.2 13.617 19.4 12.817 19M5 21L5 18C5 16.8954 5.89543 16 7 16H10C11.1046 16 12 16.8954 12 18V21C12 22.1046 11.1046 23 10 23H7C5.89543 23 5 22.1046 5 21ZM5 21C5 20.2 4.6 19.4 3.8 19" />
                  <path d="M5.4,14.6l1.2-1.2C5.5,12.3,5,10.8,5,9.2c0-3.3,2.7-6,6-6s6,2.7,6,6c0,1.6-0.5,3.1-1.6,4.2l1.2,1.2C18.2,13,19,11.2,19,9.2 c0-4.4-3.6-8-8-8s-8,3.6-8,8C3,11.2,3.8,13,5.4,14.6z" />
                </svg>
              </div>

              <p className="text-slate-600 dark:text-slate-400 italic mb-8 relative z-10 leading-relaxed">
                "{item.msg}"
              </p>

              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
