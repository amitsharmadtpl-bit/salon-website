/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Footprints, Smile, Heart, Clock, DollarSign } from 'lucide-react';
import { SALON_SERVICES } from '../data/salonData';
import { Service } from '../types';

interface ServicesPricingProps {
  onSelectService: (service: Service) => void;
}

const CATEGORIES = ['All', 'Hair', 'Nails', 'Skin', 'Massage'] as const;

export default function ServicesPricing({ onSelectService }: ServicesPricingProps) {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');

  const filteredServices = SALON_SERVICES.filter(service => 
    selectedCategory === 'All' || service.category === selectedCategory
  );

  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'Scissors':
        return <Scissors className={className} id={`icon-scissors-${name}`} />;
      case 'Activity':
        return <Heart className={className} id={`icon-activity-${name}`} />;
      case 'Heart':
        return <Heart className={className} id={`icon-heart-${name}`} />;
      case 'Smile':
        return <Smile className={className} id={`icon-smile-${name}`} />;
      case 'Pedicure':
      case 'Flower':
        return <Footprints className={className} id={`icon-pedicure-${name}`} />;
      default:
        return <Sparkles className={className} id={`icon-sparkles-${name}`} />;
    }
  };

  return (
    <section id="services-and-pricing" className="py-20 bg-brand-beige-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-brand-beige-800/80 font-mono">The Menu</span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-beige-900 mt-2 mb-4">
              Curated Treatments & Styling
            </h2>
            <div className="w-16 h-[1px] bg-brand-beige-300 mx-auto mb-6"></div>
            <p className="text-brand-charcoal-700 max-w-xl mx-auto font-sans leading-relaxed text-sm md:text-base">
              Indulge in our exquisite services designed to rejuvenate your senses and enhance your unique, natural elegance.
            </p>
          </motion.div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none" id="category-filter-tabs">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              id={`tab-category-${category.toLowerCase()}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border-b-2 rounded-none ${
                selectedCategory === category
                  ? 'border-brand-beige-800 text-brand-beige-900 font-medium'
                  : 'border-transparent text-gray-500 hover:text-brand-beige-800 hover:border-brand-beige-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" id="services-catalog-grid">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white shadow-xs hover:shadow-md border border-brand-beige-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-beige-300 group"
            >
              {service.imageUrl && (
                <div className="relative w-full h-44 overflow-hidden bg-brand-beige-100 border-b border-brand-beige-200">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                    id={`service-card-img-${service.id}`}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs font-mono text-[9px] uppercase font-semibold text-brand-beige-800 tracking-wider rounded-full shadow-xs">
                    {service.category}
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-beige-50 border border-brand-beige-200 text-brand-beige-800 rounded-xl group-hover:bg-brand-beige-100 transition-colors">
                      {getIcon(service.iconName, 'w-4 h-4')}
                    </div>
                    <h3 className="font-serif text-lg text-brand-beige-900 group-hover:text-brand-beige-850 transition-colors leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  <div className="flex items-center text-brand-beige-900 font-mono font-medium shrink-0">
                    <DollarSign className="w-3.5 h-3.5 text-brand-beige-800" />
                    <span className="text-lg">{service.price}</span>
                  </div>
                </div>
                
                <p className="text-brand-charcoal-700 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                <div className="flex items-center justify-between border-t border-brand-beige-200 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-brand-beige-805" />
                    <span>{service.duration} mins</span>
                  </div>
                  <button
                    id={`btn-book-shortcut-${service.id}`}
                    onClick={() => onSelectService(service)}
                    className="text-xs uppercase tracking-widest font-mono text-brand-beige-800 hover:text-brand-beige-900 transition-colors border-b border-brand-beige-300 hover:border-brand-beige-800 pb-0.5 cursor-pointer font-medium"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
