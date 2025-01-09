import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import AppointmentCard from './AppointmentCard';
import { Plus } from 'lucide-react';
import type { Appointment } from '../types';

export default function Appointments() {
  const { appointments, addAppointment } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.doctorName && newAppointment.date && newAppointment.time) {
      addAppointment({
        id: Date.now().toString(),
        ...newAppointment as Appointment
      });
      setShowForm(false);
      setNewAppointment({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newAppointment.doctorName || ''}
              onChange={e => setNewAppointment(prev => ({ ...prev, doctorName: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newAppointment.date?.toString() || ''}
                onChange={e => setNewAppointment(prev => ({ ...prev, date: new Date(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newAppointment.time || ''}
                onChange={e => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newAppointment.type || ''}
              onChange={e => setNewAppointment(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">Select type</option>
              <option value="Check-up">Check-up</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Consultation">Consultation</option>
              <option value="Treatment">Treatment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newAppointment.notes || ''}
              onChange={e => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}