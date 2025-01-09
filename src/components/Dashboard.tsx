import React from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Clock, Activity } from 'lucide-react';

export default function Dashboard() {
  const { profile, appointments, medicines, exercises } = useStore();

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {profile?.name || 'Guest'}
        </h1>
        <p className="text-gray-600">Here's your health overview for today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Next Appointment</h2>
          </div>
          {appointments[0] ? (
            <div>
              <p className="text-gray-700">{appointments[0].doctorName}</p>
              <p className="text-sm text-gray-500">
                {new Date(appointments[0].date).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Next Medicine</h2>
          </div>
          {medicines[0] ? (
            <div>
              <p className="text-gray-700">{medicines[0].name}</p>
              <p className="text-sm text-gray-500">{medicines[0].timeSlots[0]}</p>
            </div>
          ) : (
            <p className="text-gray-500">No medicines scheduled</p>
          )}
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold">Today's Exercise</h2>
          </div>
          {exercises[0] ? (
            <div>
              <p className="text-gray-700">{exercises[0].type}</p>
              <p className="text-sm text-gray-500">{exercises[0].duration} minutes</p>
            </div>
          ) : (
            <p className="text-gray-500">No exercises scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}