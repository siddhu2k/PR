import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ExerciseCard from './ExerciseCard';
import { Plus } from 'lucide-react';
import type { Exercise } from '../types';

export default function Exercises() {
  const { exercises, addExercise } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExercise.type && newExercise.duration && newExercise.scheduledTime) {
      addExercise({
        id: Date.now().toString(),
        ...newExercise,
        completed: false,
      } as Exercise);
      setShowForm(false);
      setNewExercise({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Exercises</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Exercise
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={newExercise.type || ''}
              onChange={e => setNewExercise(prev => ({ ...prev, type: e.target.value as Exercise['type'] }))}
            >
              <option value="">Select type</option>
              <option value="running">Running</option>
              <option value="walking">Walking</option>
              <option value="meditation">Meditation</option>
              <option value="breathing">Breathing</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newExercise.duration || ''}
                onChange={e => setNewExercise(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Scheduled Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newExercise.scheduledTime || ''}
                onChange={e => setNewExercise(prev => ({ ...prev, scheduledTime: e.target.value }))}
              />
            </div>
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onToggleComplete={() => {
              // Update exercise completion status
              const updatedExercises = exercises.map(e =>
                e.id === exercise.id ? { ...e, completed: !e.completed } : e
              );
              // TODO: Add toggleExercise action to store
            }}
          />
        ))}
      </div>
    </div>
  );
}