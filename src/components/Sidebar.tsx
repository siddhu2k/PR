import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Pill, 
  Activity, 
  UserCircle
} from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/medicines', icon: Pill, label: 'Medicines' },
  { to: '/exercises', icon: Activity, label: 'Exercises' },
  { to: '/profile', icon: UserCircle, label: 'Profile' }
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          HealthMentor
        </h1>
      </div>
      <nav className="mt-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 border-r-4 border-blue-600' : ''
              }`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}