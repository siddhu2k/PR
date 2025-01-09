import React from 'react';
import { Activity, Clock, CheckCircle } from 'lucide-react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onToggleComplete: () => void;
}

export default function ExerciseCard({ exercise, onToggleComplete }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-gray-900 capitalize">{exercise.type}</h3>
        </div>
        <button
          onClick={onToggleComplete}
          className={`p-2 rounded-full ${
            exercise.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{exercise.scheduledTime}</span>
        </div>
        <p className="text-gray-600">Duration: {exercise.duration} minutes</p>
      </div>
    </div>
  );
}