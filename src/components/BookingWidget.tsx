/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, HelpCircle, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { SALON_SERVICES, AVAILABLE_HOURS } from '../data/salonData';
import { Service, Appointment } from '../types';

interface BookingWidgetProps {
  onBookingConfirmed: (appointment: Appointment) => void;
  preSelectedService: Service | null;
  clearPreSelectedService: () => void;
}

// Generate next 14 days starting from today (2026-06-13)
const generateDates = () => {
  const dates = [];
  const start = new Date(2026, 5, 13); // June 13, 2026 (0-indexed month 5)
  for (let i = 0; i < 14; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    dates.push(current);
  }
  return dates;
};

export default function BookingWidget({
  onBookingConfirmed,
  preSelectedService,
  clearPreSelectedService
}: BookingWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-fill service if preselected from services grid
  React.useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
      setStep(2); // take them straight to date selection
      clearPreSelectedService();
    }
  }, [preSelectedService, clearPreSelectedService]);

  const datesList = useMemo(() => generateDates(), []);

  // Validation
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedDate) newErrors.date = 'Please select an appointment date';
    if (!selectedTime) newErrors.time = 'Please select an appointment slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!clientName.trim()) newErrors.name = 'Full name is required';
    if (!clientEmail.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!clientPhone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (clientPhone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (selectedService) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const selectService = (service: Service) => {
    setSelectedService(service);
    setStep(2); // advances to next step seamlessly
  };

  const formatDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !validateStep3()) return;

    const formattedDate = formatDateString(selectedDate);
    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: formattedDate,
      time: selectedTime,
      status: 'Confirmed', // Automatically confirmed in this elegant portal flow
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    onBookingConfirmed(appointment);

    // Reset Widget Form
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setStep(1);
  };

  return (
    <div id="booking-widget-container" className="bg-white border border-brand-beige-200 shadow-sm p-6 md:p-8 relative overflow-hidden rounded-2xl">
      {/* Soft natural top decorative dash */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-beige-800/20"></div>

      {/* Progress Bar */}
      <div className="mb-8" id="booking-progress-track">
        <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest text-brand-beige-800 mb-2">
          <span className={step >= 1 ? 'text-brand-beige-900 font-semibold text-[#8a817c]' : ''}>1. Service</span>
          <span className={step >= 2 ? 'text-brand-beige-900 font-semibold text-[#8a817c]' : ''}>2. Schedule</span>
          <span className={step >= 3 ? 'text-brand-beige-900 font-semibold text-[#8a817c]' : ''}>3. Personal details</span>
        </div>
        <div className="w-full bg-[#f8f5ee] h-[3px] rounded-full overflow-hidden">
          <div 
            className="bg-brand-beige-800 h-full transition-all duration-500 ease-out" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-serif text-brand-beige-900 mb-1">Select a Service</h3>
            <p className="text-xs text-gray-500 mb-5">Click a service below to configure your custom salon experience.</p>
            
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1" id="booking-service-list">
              {SALON_SERVICES.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <button
                    key={service.id}
                    id={`booking-service-opt-${service.id}`}
                    onClick={() => selectService(service)}
                    type="button"
                    className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between group rounded-xl ${
                      isSelected 
                        ? 'border-brand-beige-800 bg-[#faf7f2]' 
                        : 'border-brand-beige-200 bg-white hover:border-brand-beige-300 hover:bg-brand-beige-50'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-medium text-brand-beige-900 group-hover:text-brand-beige-800">
                          {service.name}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-brand-beige-800 animate-pulse"></span>}
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-gray-400 font-mono">
                        <span>{service.duration} mins</span>
                        <span>•</span>
                        <span>${service.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-[#8a817c] font-semibold tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Select <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif text-brand-beige-900">Choose Date & Time</h3>
              {selectedService && (
                <span className="text-[10px] font-mono tracking-wider uppercase bg-brand-beige-100 text-brand-beige-800 px-2 py-1 rounded">
                  {selectedService.name}
                </span>
              )}
            </div>
            
            {/* Minimalist Date Picker */}
            <div className="mb-6" id="date-picker-block">
              <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-2">
                Available Dates (June 2026)
              </label>
              
              <div className="grid grid-cols-4 md:grid-cols-7 gap-1.5" id="date-picker-grid">
                {datesList.map((date, idx) => {
                  const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                  const isToday = idx === 0;
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = date.getDate();

                  return (
                    <button
                      key={idx}
                      id={`date-opt-${dayNum}`}
                      type="button"
                      onClick={() => {
                        setSelectedDate(date);
                        setErrors(prev => ({ ...prev, date: '' }));
                      }}
                      className={`py-3 text-center transition-all flex flex-col items-center justify-center border rounded-lg ${
                        isSelected
                          ? 'bg-brand-beige-800 border-brand-beige-800 text-white'
                          : 'bg-[#fafaf8] border-brand-beige-200 text-brand-beige-900 hover:bg-brand-beige-100 hover:border-brand-beige-300'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider font-mono opacity-80">{dayName}</span>
                      <span className="text-sm font-semibold font-mono mt-1">{dayNum}</span>
                      {isToday && (
                        <span className={`text-[8px] uppercase tracking-tighter ${isSelected ? 'text-brand-beige-300' : 'text-[#8a817c]'} font-serif mt-0.5`}>
                          Today
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1 font-mono">{errors.date}</p>}
            </div>

            {/* Time Slot Picker */}
            <div className="mb-6" id="time-picker-block">
              <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-2">
                Available Slots
              </label>
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-2" id="time-slots-grid">
                  {AVAILABLE_HOURS.map((hour) => {
                    const isSelected = selectedTime === hour;
                    return (
                      <button
                        key={hour}
                        id={`time-slot-${hour.replace(':', '')}`}
                        type="button"
                        onClick={() => {
                          setSelectedTime(hour);
                          setErrors(prev => ({ ...prev, time: '' }));
                        }}
                        className={`py-2 text-xs font-mono tracking-wider text-center border transition-all rounded-lg ${
                          isSelected
                            ? 'bg-brand-beige-800 border-brand-beige-800 text-white font-medium'
                            : 'bg-white border-brand-beige-200 text-brand-beige-900 hover:bg-brand-beige-50 hover:border-brand-beige-300'
                        }`}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 border border-dashed border-brand-beige-200 text-center text-xs text-gray-400 font-serif rounded-lg">
                  Please pick a date first to view hours
                </div>
              )}
              {errors.time && <p className="text-red-500 text-xs mt-1 font-mono">{errors.time}</p>}
            </div>

            {/* Step 2 navigation buttons */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-beige-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1 text-xs uppercase font-mono tracking-wider text-brand-beige-800 hover:text-brand-beige-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!selectedDate || !selectedTime}
                className="flex items-center gap-1 px-5 py-2.5 bg-[#2d2d2d] hover:bg-[#404040] text-white text-xs uppercase font-mono tracking-widest disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-serif text-brand-beige-900 mb-1">Guest Details</h3>
            <p className="text-xs text-gray-500 mb-5">Please finalize your booking details so we can welcome you beautifully.</p>

            {/* Appointment mini summary */}
            <div className="p-4 bg-brand-beige-50 border border-brand-beige-200 flex flex-col gap-2 mb-5 text-xs text-brand-beige-900 font-mono rounded-xl" id="summary-badge">
              <div className="flex justify-between">
                <span className="text-[#8a817c]">Treatment:</span>
                <span className="font-semibold text-right">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-1.5 mt-1">
                <span className="text-[#8a817c]">Date & Time:</span>
                <span className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {selectedTime}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-brand-beige-200 pt-1.5 mt-1">
                <span className="text-[#8a817c]">Investment:</span>
                <span className="font-semibold text-brand-beige-900 font-sans text-sm">${selectedService?.price}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} id="booking-client-info-form" className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige-300" />
                  <input
                    type="text"
                    id="input-client-name"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Cynthia Rogers"
                    className={`w-full pl-9 pr-4 py-2.5 bg-[#fafaf8] border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-brand-beige-800 rounded-lg ${
                      errors.name ? 'border-red-400' : 'border-brand-beige-200 focus:border-brand-beige-300'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-0.5 font-mono">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige-300" />
                    <input
                      type="email"
                      id="input-client-email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. cynthia@example.com"
                      className={`w-full pl-9 pr-4 py-2.5 bg-[#fafaf8] border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-brand-beige-800 rounded-lg ${
                        errors.email ? 'border-red-400' : 'border-brand-beige-200 focus:border-brand-beige-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-0.5 font-mono">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-beige-300" />
                    <input
                      type="tel"
                      id="input-client-phone"
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="e.g. (555) 000-0000"
                      className={`w-full pl-9 pr-4 py-2.5 bg-[#fafaf8] border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-brand-beige-800 rounded-lg ${
                        errors.phone ? 'border-red-400' : 'border-brand-beige-200 focus:border-brand-beige-300'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-0.5 font-mono">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#8a817c] font-mono mb-1">
                  Special Notes or Requests (Optional)
                </label>
                <textarea
                  id="input-client-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us if you have any style preferences, allergies, or require a specific stylist treatment..."
                  rows={2}
                  className="w-full px-4 py-2 bg-[#fafaf8] border border-brand-beige-200 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-brand-beige-800 focus:border-brand-beige-300 rounded-lg"
                />
              </div>

              {/* Action row */}
              <div className="flex justify-between items-center pt-4 border-t border-brand-beige-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1 text-xs uppercase font-mono tracking-wider text-brand-beige-800 hover:text-brand-beige-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Slots
                </button>
                <button
                  type="submit"
                  id="btn-confirm-booking"
                  className="w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2d2d2d] hover:bg-[#404040] transition-colors text-white text-xs font-mono tracking-widest uppercase rounded-lg"
                >
                  Confirm Booking <Check className="w-4 h-4 text-brand-beige-205" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
