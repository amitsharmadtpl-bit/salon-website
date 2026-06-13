/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, DollarSign, User, ShieldCheck, X, RefreshCw, Layers, PlusCircle, Trash, Search, Download } from 'lucide-react';
import { Appointment, AppointmentStatus } from '../types';
import { AVAILABLE_HOURS } from '../data/salonData';

interface StaffDashboardProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onRescheduleAppointment: (id: string, date: string, time: string) => void;
}

export default function StaffDashboard({
  appointments,
  onCancelAppointment,
  onUpdateStatus,
  onRescheduleAppointment
}: StaffDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rescheduling state
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-06-14');
  const [rescheduleTime, setRescheduleTime] = useState('11:00');

  // Inline toast notification state
  const [toast, setToast] = useState<string | null>(null);

  // Inline cancel appointment confirmation state
  const [cancelConfirmationId, setCancelConfirmationId] = useState<string | null>(null);

  // Filtered lists
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    const matchesSearch = 
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate metrics beautifully
  const totalRevenue = appointments
    .filter((a) => a.status !== 'Cancelled')
    .reduce((sum, a) => sum + a.servicePrice, 0);

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const activeCount = appointments.filter((a) => a.status === 'Confirmed').length;

  const handleOpenReschedule = (apt: Appointment) => {
    setReschedulingId(apt.id);
    setRescheduleDate(apt.date);
    setRescheduleTime(apt.time);
  };

  const handleSaveReschedule = (id: string) => {
    onRescheduleAppointment(id, rescheduleDate, rescheduleTime);
    setReschedulingId(null);
    showToast('Appointment successfully rescheduled.');
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  return (
    <section id="staff-dashboard" className="py-16 bg-white border-t border-brand-beige-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Toast Toast notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-[#2d2d2d] text-white text-xs font-mono tracking-wide px-4 py-3 rounded-xl shadow-lg border border-brand-beige-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{toast}</span>
              <button onClick={() => setToast(null)} className="ml-2 hover:text-gray-300">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8a817c] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-[#8a817c] font-mono font-semibold">
                Internal Portal Preview
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-beige-900 mt-1">
              Staff Appointment Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8a817c] hidden sm:inline">
              Secure Mode | Role: Receptionist
            </span>
            <div className="px-3 py-1 bg-brand-beige-100 border border-brand-beige-200 text-[10px] font-mono uppercase tracking-wider text-brand-beige-800 rounded-full">
              ● Active State Session
            </div>
          </div>
        </div>

        {/* Dynamic Metric Panels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" id="dashboard-metric-cards">
          
          <div className="bg-[#fdfcf9] border border-brand-beige-200 p-5 rounded-2xl shadow-xs">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#8a817c]">Scheduled Visits</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-semibold font-mono tracking-tight text-brand-beige-900">
                {appointments.length}
              </span>
              <span className="text-xs text-gray-400 font-mono">active total</span>
            </div>
          </div>

          <div className="bg-[#fdfcf9] border border-brand-beige-200 p-5 rounded-2xl shadow-xs">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#8a817c]">Projected Turnout</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-semibold font-mono tracking-tight text-[#8a817c]">
                ${totalRevenue}
              </span>
              <span className="text-xs text-brand-beige-800 font-mono">100% gross</span>
            </div>
          </div>

          <div className="bg-[#fdfcf9] border border-brand-beige-200 p-5 rounded-2xl shadow-xs">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#8a817c] flex items-center gap-1">
              <span>Confirmed Spot</span>
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-semibold font-mono tracking-tight text-brand-beige-900">
                {activeCount}
              </span>
              <span className="text-xs text-brand-beige-800 bg-brand-beige-100 px-1.5 py-0.5 rounded text-[10px]">
                ready
              </span>
            </div>
          </div>

          <div className="bg-[#fdfcf9] border border-brand-beige-200 p-5 rounded-2xl shadow-xs">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#8a817c] flex items-center gap-1">
              <span>Awaiting Approval</span>
              {pendingCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#8a817c] animate-pulse"></span>}
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-semibold font-mono tracking-tight text-brand-beige-900">
                {pendingCount}
              </span>
              <span className="text-xs text-gray-400 font-mono font-serif italic">pending</span>
            </div>
          </div>

        </div>

        {/* Filter Controls & Search */}
        <div className="bg-brand-beige-100 border border-brand-beige-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between rounded-2xl" id="dashboard-filter-bar">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs uppercase font-mono tracking-wider text-brand-beige-800 mr-2">Status:</span>
            {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map((status) => (
              <button
                key={status}
                id={`dashboard-filter-status-${status.toLowerCase()}`}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors rounded-lg border ${
                  filterStatus === status
                    ? 'bg-[#2d2d2d] border-[#2d2d2d] text-white font-medium'
                    : 'bg-white border-brand-beige-200 text-brand-beige-900 hover:bg-brand-beige-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-brand-beige-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="dashboard-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client or service..."
              className="w-full bg-white border border-brand-beige-200 pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-beige-800 rounded-lg"
            />
          </div>
        </div>

        {/* Appointments Table / Card Layout */}
        <div className="overflow-hidden border border-brand-beige-200 rounded-2xl shadow-xs" id="dashboard-table-holder">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-brand-beige-50 border-b border-brand-beige-200 text-[10px] uppercase font-mono tracking-widest text-[#8a817c]">
                <th className="p-4 font-semibold">Client details</th>
                <th className="p-4 font-semibold">Requested Treatment</th>
                <th className="p-4 font-semibold">Schedule Time</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-beige-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-gray-400 font-mono">
                    No appointments matches selected filter status.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => {
                  const isRescheduling = reschedulingId === apt.id;
                  const isConfirmingCancel = cancelConfirmationId === apt.id;
                  
                  return (
                    <motion.tr 
                      layout
                      key={apt.id} 
                      id={`row-appointment-${apt.id}`}
                      className="hover:bg-brand-beige-50/50 transition-colors"
                    >
                      
                      {/* Client Info Cell */}
                      <td className="p-4">
                        <div className="font-medium text-sm text-brand-beige-900">{apt.clientName}</div>
                        <div className="text-xs text-gray-400 font-mono flex flex-col gap-0.5 mt-0.5">
                          <span>{apt.clientEmail}</span>
                          <span>{apt.clientPhone}</span>
                        </div>
                      </td>

                      {/* Service Info Cell */}
                      <td className="p-4">
                        <div className="text-xs font-serif bg-brand-beige-100 inline-block px-2 py-0.5 text-brand-beige-900 rounded mb-1">
                          {apt.serviceName}
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                          Value: ${apt.servicePrice}
                        </div>
                      </td>

                      {/* Schedule Cell */}
                      <td className="p-4">
                        {isRescheduling ? (
                          <div className="flex flex-col gap-1.5 p-2 bg-[#fdfcf9] border border-brand-beige-300 rounded-lg">
                            <input
                              type="date"
                              value={rescheduleDate}
                              onChange={(e) => setRescheduleDate(e.target.value)}
                              className="text-xs border border-brand-beige-200 p-1 bg-white font-mono rounded"
                            />
                            <select
                              value={rescheduleTime}
                              onChange={(e) => setRescheduleTime(e.target.value)}
                              className="text-xs border border-brand-beige-200 p-1 bg-white font-mono rounded"
                            >
                              {AVAILABLE_HOURS.map((h) => (
                                <option key={h} value={h}>{h}</option>
                              ))}
                            </select>
                            <div className="flex gap-2 justify-end mt-1">
                              <button
                                type="button"
                                onClick={() => setReschedulingId(null)}
                                className="text-[10px] font-mono uppercase text-gray-400 hover:text-gray-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveReschedule(apt.id)}
                                className="text-[10px] font-mono uppercase bg-brand-beige-800 text-white px-2 py-0.5 rounded"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-brand-beige-900 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-brand-beige-300" />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                              <Clock className="w-3.5 h-3.5 text-brand-beige-300" />
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        )}
                        {apt.notes && (
                          <div className="text-[10px] italic text-[#8a817c] mt-1.5 max-w-xs border-l-2 border-brand-beige-200 pl-2 line-clamp-1 hover:line-clamp-none">
                            Notes: "{apt.notes}"
                          </div>
                        )}
                      </td>

                      {/* Status Cell */}
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : apt.status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {apt.status}
                        </span>
                      </td>

                      {/* Actions Cell */}
                      <td className="p-4 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {isConfirmingCancel ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 p-1 px-2 rounded-lg text-left">
                              <span className="text-[9px] font-mono text-red-700 animate-pulse">Confirm cancellation?</span>
                              <button
                                type="button"
                                onClick={() => {
                                  onCancelAppointment(apt.id);
                                  setCancelConfirmationId(null);
                                  showToast(`Appointment for ${apt.clientName} cancelled.`);
                                }}
                                className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] uppercase font-mono rounded"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setCancelConfirmationId(null)}
                                className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[9px] uppercase font-mono rounded"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <>
                              {apt.status === 'Pending' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onUpdateStatus(apt.id, 'Confirmed');
                                    showToast(`Appointment for ${apt.clientName} has been confirmed.`);
                                  }}
                                  className="px-2 py-1 bg-emerald-700 text-white text-[10px] uppercase font-mono tracking-wider hover:bg-emerald-800 rounded"
                                >
                                  Confirm
                                </button>
                              )}
                              
                              {apt.status !== 'Cancelled' && (
                                <>
                                  <button
                                    type="button"
                                    disabled={isRescheduling}
                                    onClick={() => handleOpenReschedule(apt)}
                                    className="px-2 py-1 border border-brand-beige-300 text-brand-beige-900 text-[10px] uppercase font-mono tracking-wider hover:bg-brand-beige-100 disabled:opacity-40 rounded"
                                  >
                                    Edit Slot
                                  </button>
                                  
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCancelConfirmationId(apt.id);
                                    }}
                                    className="px-2 py-1 bg-red-50 text-red-700 border border-red-100 text-[10px] uppercase font-mono tracking-wider hover:bg-red-100 rounded"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}

                              {apt.status === 'Cancelled' && (
                                <span className="text-xs text-gray-450 font-mono italic pr-2">
                                  Cancelled
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </td>

                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  );
}
