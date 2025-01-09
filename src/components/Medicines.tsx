import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import MedicineCard from './MedicineCard';
import { Plus } from 'lucide-react';
import type { Medicine } from '../types';

export default function Medicines() {
  const { medicines, addMedicine } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    timeSlots: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedicine.name && newMedicine.dosage && newMedicine.frequency) {
      addMedicine({
        id: Date.now().toString(),
        ...newMedicine,
        timeSlots: newMedicine.timeSlots?.filter(Boolean) || [],
      } as Medicine);
      setShowForm(false);
      setNewMedicine({ timeSlots: [''] });
    }
  };

  const handleAddTimeSlot = () => {
    setNewMedicine(prev => ({
      ...prev,
      timeSlots: [...(prev.timeSlots || []), '']
    }));
  };

  const handleTimeSlotChange = (index: number, value: string) => {
    setNewMedicine(prev => ({
      ...prev,
      timeSlots: prev.timeSlots?.map((slot, i) => (i === index ? value : slot))
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Medicines</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={newMedicine.name || ''}
              onChange={e => setNewMedicine(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={newMedicine.dosage || ''}
                onChange={e => setNewMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                placeholder="e.g., 500mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={newMedicine.frequency || ''}
                onChange={e => setNewMedicine(prev => ({ ...prev, frequency: e.target.value }))}
              >
                <option value="">Select frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
            {newMedicine.timeSlots?.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="time"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={slot}
                  onChange={e => handleTimeSlotChange(index, e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              + Add another time
            </button>
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
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map(medicine => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
}