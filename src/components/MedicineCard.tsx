import React from 'react';
import { Clock, Pill } from 'lucide-react';
import type { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Pill className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          {medicine.frequency}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">Dosage: {medicine.dosage}</p>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <div className="flex flex-wrap gap-2">
            {medicine.timeSlots.map((time, index) => (
              <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}