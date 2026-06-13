/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Appointment } from '../types';

export const SALON_SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Haircut & Style',
    description: 'Personalized wash, precision cut, scalp massage, and custom blow-dry finished with high-end botanical products.',
    price: 65,
    duration: 45,
    category: 'Hair',
    iconName: 'Scissors',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's2',
    name: 'Artisanal Coloring & Balayage',
    description: 'Tailored dimensional highlight or balayage technique, root fusion gloss, and deep bond-rebuilding treatment.',
    price: 145,
    duration: 120,
    category: 'Hair',
    iconName: 'Sparkles',
    imageUrl: '/Artisanal Coloring & Balayage.jpg'
  },
  {
    id: 's3',
    name: 'Classic Manicure & Polish',
    description: 'Nail shaping, cuticle restoration, moisturizing hand massage, finished with high-shine vegan gel or lacquer.',
    price: 35,
    duration: 30,
    category: 'Nails',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's4',
    name: 'Deluxe Pedicure Experience',
    description: 'Warm sea salt soak, natural sugar exfoliation, intensive heel treatment, and smooth stone massage.',
    price: 55,
    duration: 50,
    category: 'Nails',
    iconName: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's5',
    name: 'Botanical Hydration Facial',
    description: 'Vitamin-rich deep steam cleanse, ultrasonic exfoliation, restorative mask, and specialized lymphatic face massage.',
    price: 85,
    duration: 60,
    category: 'Skin',
    iconName: 'Smile',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's6',
    name: 'Radiance Glow Peel',
    description: 'Gentle fruit enzyme skin renewal procedure, custom hydration serum infusion, and calming SPF defense.',
    price: 110,
    duration: 45,
    category: 'Skin',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's7',
    name: 'Swedish Remedial Massage',
    description: 'Calming full-body massage utilizing moderate pressure and heated organic chamomile oils to release tension.',
    price: 95,
    duration: 60,
    category: 'Massage',
    iconName: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 's8',
    name: 'Deep Tissue Muscle Release',
    description: 'Targeted deep-pressure therapy focused on alignment, tension-melt trigger points, and cooling herb extracts.',
    price: 125,
    duration: 75,
    category: 'Massage',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400&q=80'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    clientName: 'Eleanor Vance',
    clientEmail: 'eleanor.vance@example.com',
    clientPhone: '+1 (555) 234-5678',
    serviceId: 's1',
    serviceName: 'Signature Haircut & Style',
    servicePrice: 65,
    date: '2026-06-14',
    time: '10:00',
    status: 'Confirmed',
    notes: 'Prefer extra conditioning; wants a curtain bangs styling tip.',
    createdAt: '2026-06-12T09:30:00Z'
  },
  {
    id: 'apt-2',
    clientName: 'Julian Sterling',
    clientEmail: 'sterling.j@example.com',
    clientPhone: '+1 (555) 876-5432',
    serviceId: 's7',
    serviceName: 'Swedish Remedial Massage',
    servicePrice: 95,
    date: '2026-06-14',
    time: '11:15',
    status: 'Pending',
    notes: 'First visit. Focus on shoulders.',
    createdAt: '2026-06-13T14:15:00Z'
  },
  {
    id: 'apt-3',
    clientName: 'Sofia Castillo',
    clientEmail: 'sofia.castillo@example.com',
    clientPhone: '+1 (555) 432-1098',
    serviceId: 's3',
    serviceName: 'Classic Manicure & Polish',
    servicePrice: 35,
    date: '2026-06-15',
    time: '09:00',
    status: 'Confirmed',
    notes: 'Requesting French tips if possible.',
    createdAt: '2026-06-11T16:45:00Z'
  },
  {
    id: 'apt-4',
    clientName: 'Marcus Brodie',
    clientEmail: 'mbrodie@example.com',
    clientPhone: '+1 (555) 901-2345',
    serviceId: 's2',
    serviceName: 'Artisanal Coloring & Balayage',
    servicePrice: 145,
    date: '2026-06-15',
    time: '14:00',
    status: 'Confirmed',
    notes: 'No previous coloring done, blonde balayage focus.',
    createdAt: '2026-06-12T11:20:00Z'
  },
  {
    id: 'apt-5',
    clientName: 'Gwendolyn Thorne',
    clientEmail: 'gwen.thorne@example.com',
    clientPhone: '+1 (555) 765-4321',
    serviceId: 's5',
    serviceName: 'Botanical Hydration Facial',
    servicePrice: 85,
    date: '2026-06-16',
    time: '16:30',
    status: 'Pending',
    createdAt: '2026-06-13T08:10:00Z'
  }
];

export const AVAILABLE_HOURS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];
