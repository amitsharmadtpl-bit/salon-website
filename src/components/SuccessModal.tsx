/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar, Clock, MapPin, DollarSign, Share2, Sparkles, X, Star } from 'lucide-react';
import { Appointment } from '../types';

interface SuccessModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export default function SuccessModal({ appointment, onClose }: SuccessModalProps) {
  const [calendarAdded, setCalendarAdded] = React.useState(false);
  
  if (!appointment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="success-modal-backdrop">
        {/* Soft glass darkness background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-beige-900/40 backdrop-blur-xs"
        ></motion.div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white border border-brand-beige-200 shadow-2xl max-w-lg w-full p-6 md:p-8 z-10 text-center rounded-2xl"
          id="success-modal-body"
        >
          {/* Close trigger button */}
          <button
            onClick={onClose}
            id="btn-close-modal-x"
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-brand-beige-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Animated Emblem header */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-brand-beige-100 flex items-center justify-center border border-brand-beige-200">
                <Check className="w-8 h-8 text-[#8a817c]" />
              </div>
              <motion.div 
                className="absolute -top-1 -right-1 text-brand-beige-800"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 fill-current" />
              </motion.div>
            </div>
          </div>

          <span className="text-[9px] uppercase tracking-widest font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-150 inline-block mb-3 rounded-full">
            Appointment Secure
          </span>

          <h3 className="text-2xl font-serif text-brand-beige-900 mb-2">
            Your Session is Confirmed!
          </h3>
          
          <p className="text-brand-beige-800 text-xs font-mono max-w-xs mx-auto mb-6">
            An email with details has been sent to <span className="font-semibold">{appointment.clientEmail}</span>. Read below for preparation details.
          </p>

          <div className="w-12 h-[1px] bg-brand-beige-200 mx-auto mb-5"></div>

          {/* Core Reciprocated Summary Card */}
          <div className="bg-brand-beige-50 border border-brand-beige-200 text-left p-4 md:p-5 rounded-xl font-mono text-xs text-brand-beige-900 space-y-3 mb-6" id="success-receipt">
            
            <div className="flex justify-between items-start gap-4">
              <span className="text-gray-400">Treatment:</span>
              <span className="font-serif text-sm text-brand-beige-900 font-semibold text-right">{appointment.serviceName}</span>
            </div>

            <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-3">
              <span className="text-gray-400">Date:</span>
              <span className="font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-beige-300" />
                {appointment.date}
              </span>
            </div>

            <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-3">
              <span className="text-gray-400">Time:</span>
              <span className="font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-beige-300" />
                {appointment.time}
              </span>
            </div>

            <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-3">
              <span className="text-gray-400">Location:</span>
              <span className="font-semibold flex items-center gap-1 text-right">
                <MapPin className="w-3.5 h-3.5 text-brand-beige-300" />
                Aura Salon, 42 Elegant Blvd
              </span>
            </div>

            <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-3 text-sm">
              <span className="text-gray-400">Rate:</span>
              <span className="text-brand-beige-900 font-bold font-sans">${appointment.servicePrice}</span>
            </div>

          </div>

          {/* Elegant Checklist Tips */}
          <div className="text-left mb-6 text-xs text-brand-charcoal-700 bg-brand-beige-25 border border-brand-beige-200 p-3.5 rounded-xl" id="preparation-tips">
            <h4 className="font-serif font-medium text-brand-beige-900 mb-1.5 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#8a817c] fill-current" />
              Before your visit:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-gray-500">
              <li>Arrive 5–10 minutes early to enjoy our specialty herbal infusions.</li>
              <li>For hair/coloring, please wash your hair 24 hours prior if possible.</li>
              <li>Free parking is reserved for clients directly in block B.</li>
            </ul>
          </div>

          {/* Dialog Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                setCalendarAdded(true);
              }}
              id="btn-add-to-calendar"
              disabled={calendarAdded}
              className="flex-1 py-3 text-xs uppercase tracking-widest font-mono border border-[#8a817c] text-[#8a817c] hover:bg-brand-beige-50 transition-colors rounded-lg disabled:opacity-60"
            >
              {calendarAdded ? "✓ Synced with Calendar" : "Add to Calendar"}
            </button>
            <button
              onClick={onClose}
              id="btn-close-modal"
              className="flex-1 py-3 text-xs uppercase tracking-widest font-mono bg-[#2d2d2d] text-white hover:bg-brand-beige-900 transition-colors rounded-lg"
            >
              Close Summary
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
