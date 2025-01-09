import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import type { Appointment } from '../types';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {appointment.type}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{format(appointment.date, 'MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{appointment.time}</span>
        </div>
        {appointment.notes && (
          <p className="text-gray-500 text-sm mt-2">{appointment.notes}</p>
        )}
      </div>
    </div>
  );
}