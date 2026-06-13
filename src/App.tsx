/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Sparkles, MapPin, Phone, Clock, Mail, ChevronRight, Menu, X, ShieldAlert, CheckCircle, CalendarDays, ExternalLink } from 'lucide-react';
import { INITIAL_APPOINTMENTS } from './data/salonData';
import { Appointment, Service, AppointmentStatus } from './types';
import HeroSection from './components/HeroSection';
import BookingWidget from './components/BookingWidget';
import ServicesPricing from './components/ServicesPricing';
import StaffDashboard from './components/StaffDashboard';
import SuccessModal from './components/SuccessModal';

export default function App() {
  // Master reactive state of active appointments
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  
  // State for showing the premium Success Confirmation Dialog
  const [latestBookedAppointment, setLatestBookedAppointment] = useState<Appointment | null>(null);
  
  // State to handle shortcut linking from Services Menu directly into Step 2 of the Booking Form
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);

  // Toggle state to reveal/scroll to the staff admin panel preview
  const [showStaffPreview, setShowStaffPreview] = useState<boolean>(true);

  // Notification logs system for reactive receptionist previews
  const [logs, setLogs] = useState<string[]>([
    "System Initialized. Loaded 5 upcoming secure appointments.",
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 4)]);
  };

  // State actions
  const handleBookingConfirmed = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    setLatestBookedAppointment(newApt);
    addLog(`Success: New client '${newApt.clientName}' requested '${newApt.serviceName}'.`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' as AppointmentStatus } : apt))
    );
    const origin = appointments.find(a => a.id === id);
    if (origin) {
      addLog(`Cancelled: Appointment of '${origin.clientName}' updated to Cancelled.`);
    }
  };

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    const origin = appointments.find(a => a.id === id);
    if (origin) {
      addLog(`Status: Updated '${origin.clientName}' to status: ${status}.`);
    }
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, date: newDate, time: newTime, status: 'Confirmed' as AppointmentStatus } : apt
      )
    );
    const origin = appointments.find(a => a.id === id);
    if (origin) {
      addLog(`Reschedule: '${origin.clientName}' rescheduled to ${newDate} at ${newTime}.`);
    }
  };

  const handleServiceShortcut = (service: Service) => {
    setPreSelectedService(service);
    // Smooth scroll straight up to the booking widget
    const widget = document.getElementById('booking-portal');
    if (widget) {
      widget.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige-50 selection:bg-brand-beige-300 selection:text-brand-beige-900" id="application-root">
      
      {/* Elegantly Polished Sticky Header */}
      <nav id="global-navigation-bar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-beige-200 transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2" id="brand-logo-container">
            <div className="w-10 h-10 bg-brand-beige-800 text-brand-beige-50 flex items-center justify-center font-serif text-xl tracking-tight rounded-xl">
              A
            </div>
            <div>
              <span className="font-serif text-lg tracking-widest uppercase block text-brand-beige-900">Aura</span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-gray-400 block -mt-1">Botanical Salon</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-brand-beige-800" id="nav-links-desktop">
            <a href="#services-and-pricing" className="hover:text-brand-beige-900 transition-colors">Treatments</a>
            <a href="#salon-details" className="hover:text-brand-beige-900 transition-colors">About & Location</a>
            <button
              onClick={() => {
                const target = document.getElementById('booking-portal');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-brand-beige-900 transition-colors cursor-pointer"
            >
              Book Seat
            </button>
            <a href="#staff-dashboard" className="text-brand-beige-800 hover:text-brand-beige-900 font-semibold transition-colors flex items-center gap-1">
              Dashboard <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const target = document.getElementById('booking-portal');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              id="nav-btn-book-top"
              className="px-5 py-2.5 bg-brand-beige-900 hover:bg-[#404040] text-brand-beige-25 text-[10px] uppercase font-mono tracking-widest transition-all duration-300 cursor-pointer rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Your Seat Now
            </button>
          </div>
        </div>
      </nav>

      {/* Main flow containing Hero Area & widget */}
      <div id="booking-portal">
        <HeroSection>
          <BookingWidget 
            onBookingConfirmed={handleBookingConfirmed} 
            preSelectedService={preSelectedService}
            clearPreSelectedService={() => setPreSelectedService(null)}
          />
        </HeroSection>
      </div>

      {/* Quick Location & Salon Details Section */}
      <section id="salon-details" className="py-12 bg-white border-y border-brand-beige-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm divide-y md:divide-y-0 md:divide-x divide-brand-beige-100">
            
            <div className="flex items-start gap-3.5 pb-4 md:pb-0">
              <MapPin className="w-5 h-5 text-brand-beige-300 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige-800 font-semibold">Our Studio</h4>
                <p className="text-brand-charcoal-700 mt-1 font-serif text-sm">42 Elegant Blvd, Suite 100</p>
                <p className="text-xs text-gray-500 font-mono">Downtown Metro Center</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8 pb-4 md:pb-0">
              <Clock className="w-5 h-5 text-brand-beige-300 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige-800 font-semibold">Studio Hours</h4>
                <p className="text-brand-charcoal-700 mt-1 font-mono text-xs">Mon – Fri: 09:00 – 21:00</p>
                <p className="text-brand-charcoal-700 font-mono text-xs">Sat: 10:00 – 17:00 | Sun: Closed</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
              <Phone className="w-5 h-5 text-brand-beige-300 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-beige-800 font-semibold">Reserve & Ask</h4>
                <p className="text-brand-charcoal-700 mt-1 font-serif text-sm">(555) 345-6789</p>
                <p className="text-xs text-gray-500 font-mono">concierge@aurasalon.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services and Pricing Menu Section */}
      <ServicesPricing onSelectService={handleServiceShortcut} />

      {/* Staff Dashboard Preview Header Controls */}
      <div className="bg-[#2d2d2d] text-brand-beige-100 py-6 px-4 md:px-6 border-b border-brand-beige-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-beige-800 text-brand-beige-25 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-brand-beige-25" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase font-mono">
                Admin Preview Switch
              </h3>
              <p className="text-xs text-[#c2bbaf] font-sans">
                Below has a fully operational staff terminal simulated with state integration. Take a look!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              id="btn-toggle-staff-dashboard"
              onClick={() => setShowStaffPreview(prev => !prev)}
              type="button"
              className="px-5 py-2 border border-brand-beige-300 text-brand-beige-100 font-mono text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors rounded-lg"
            >
              {showStaffPreview ? 'Hide Staff Preview' : 'Show Staff Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Logger Terminal snippet */}
      {showStaffPreview && (
        <div className="bg-[#1a1a1c] text-[#8a817c] p-4 border-b border-brand-beige-900" id="terminal-audit-log">
          <div className="max-w-6xl mx-auto font-mono text-[11px] flex flex-col md:flex-row gap-3 md:items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a817c] animate-pulse"></span>
              <span className="text-[#c2bbaf]">Receptionist Action Logger stream:</span>
            </div>
            <div className="flex-1 md:overflow-hidden truncate italic text-gray-300 px-2" id="latest-action-log-text">
              {logs[0] || "Waiting for interaction logs..."}
            </div>
            <div className="text-[10px] text-[#c2bbaf]">
              Total logs count: {logs.length}
            </div>
          </div>
        </div>
      )}

      {/* Staff Dashboard view */}
      <AnimatePresence>
        {showStaffPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <StaffDashboard
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
              onUpdateStatus={handleUpdateStatus}
              onRescheduleAppointment={handleRescheduleAppointment}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand footer */}
      <footer id="brand-salon-footer" className="mt-auto bg-[#121213] border-t border-brand-beige-900 text-brand-beige-100 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            <div className="md:col-span-1">
              <h4 className="font-serif text-lg tracking-widest uppercase text-white mb-2">AURA</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Precision cut & conscious styling treatments for the contemporary aesthetic. Inspired by nature, perfected through craftsmanship.
              </p>
              <p className="text-gray-500 text-[10px] mt-4 font-mono">
                © 2026 Aura Salon Studio Inc. All rights reserved.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-[#8a817c] mb-4">Location</h5>
              <p className="text-gray-300 text-xs font-serif">42 Elegant Blvd, Suite 100</p>
              <p className="text-gray-305 text-xs font-serif">Downtown Metro Center</p>
              <p className="text-gray-400 text-[11px] font-mono mt-2">(555) 345-6789</p>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-[#8a817c] mb-4">Schedule</h5>
              <div className="text-gray-300 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span>Mon – Fri:</span>
                  <span>9:00am – 9:00pm</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Saturday:</span>
                  <span>10:00am – 5:05pm</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest text-[#8a817c] mb-4">Staff Notice</h5>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Appointments are automatically updated on the local receptionist cache state immediately.
              </p>
              <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1.5 bg-brand-charcoal-700/30 p-2 border border-brand-charcoal-700 rounded-lg">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                <span>Simulated Offline-First Cache Enabled</span>
              </div>
            </div>

          </div>

          <div className="border-t border-[#2d2d2d] pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
            <div className="flex gap-4">
              <a href="#services-and-pricing" className="hover:text-white">Treatments Directory</a>
              <span>•</span>
              <a href="#booking-portal" className="hover:text-white">Scheduler API</a>
              <span>•</span>
              <a href="#staff-dashboard" className="hover:text-white">Staff Management</a>
            </div>
            <div>
              <span>Designed with ❤️. Elegant Beige Theme.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup Dialog confirming reservation */}
      <SuccessModal
        appointment={latestBookedAppointment}
        onClose={() => setLatestBookedAppointment(null)}
      />
    </div>
  );
}
