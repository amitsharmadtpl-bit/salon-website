/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Star, Heart, Award } from 'lucide-react';

interface HeroSectionProps {
  children: React.ReactNode; // Pass the BookingWidget as children
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <header className="relative pt-24 pb-16 md:py-28 overflow-hidden bg-gradient-to-b from-brand-beige-100 to-white" id="salon-hero">
      {/* Decorative organic background highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e9ecef] rounded-full blur-3xl opacity-50 -translate-y-12"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ced4da] rounded-full blur-3xl opacity-25 translate-y-12"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement & Testimonial */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="hero-statement-column">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-beige-100 border border-brand-beige-200 text-brand-beige-800 text-[10px] uppercase tracking-widest font-mono rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#8a817c]" />
                <span>The Aura Studio Sanctuary</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-brand-beige-900 leading-[1.1] mb-6"
            >
              Elevate Your <br />
              <span className="italic font-normal text-[#8a817c]">Personal Style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-brand-charcoal-700 text-sm md:text-base leading-relaxed max-w-xl mb-6"
            >
              A boutique oasis dedicated to precision styling, conscious botanical treatments, and indulgent services. Experience luxury and peace calculated to illuminate your natural elegance.
            </motion.p>

            {/* Featured Salon Inner Showpiece Image */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative w-full h-44 sm:h-52 overflow-hidden rounded-2xl mb-6 border border-brand-beige-200 shadow-xs group"
            >
              <img 
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85" 
                alt="Aura Studio Salon Interior Sanctuary" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-beige-900/10 to-transparent"></div>
            </motion.div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-beige-200 pt-6 mb-8"
              id="hero-features-grid"
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-brand-beige-100 border border-brand-beige-200 rounded-lg mt-0.5 text-brand-beige-800">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-brand-beige-900">Elite Stylists</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Award-winning colorists & precision hair designers.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-brand-beige-100 border border-brand-beige-200 rounded-lg mt-0.5 text-brand-beige-800">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-brand-beige-900">Botanical Care</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">100% cruelty-free, sustainable, premium organic brands.</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonials snippet */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-brand-beige-100 border border-brand-beige-200 rounded-2xl p-4 flex gap-4 items-center shadow-xs"
              id="hero-testimonial"
            >
              <div className="flex -space-x-2 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" 
                  alt="Client review" 
                  className="w-8 h-8 rounded-full border border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" 
                  alt="Client portrait" 
                  className="w-8 h-8 rounded-full border border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80" 
                  alt="Stylist feedback reviewer" 
                  className="w-8 h-8 rounded-full border border-white object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="flex text-amber-500 text-xs gap-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <p className="text-[11px] font-serif italic text-brand-beige-900 mt-0.5">
                  "The balayage and experience was absolutely transformative. Aura is my permanent refuge."
                </p>
                <span className="text-[9px] font-mono uppercase text-gray-400">— Gwendolyn T.</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Interactive Form slot */}
          <div className="lg:col-span-5" id="hero-widget-column">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          </div>

        </div>
      </div>
    </header>
  );
}
