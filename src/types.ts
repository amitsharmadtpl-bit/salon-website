/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'Hair' | 'Nails' | 'Skin' | 'Massage';
  iconName: string;
  imageUrl?: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string; // Snapshotted name
  servicePrice: number; // Snapshotted price
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  notes?: string;
  createdAt: string; // ISO string
}

export interface SalonReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
