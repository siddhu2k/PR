export interface Appointment {
  id: string;
  doctorName: string;
  date: Date;
  time: string;
  type: string;
  notes?: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeSlots: string[];
}

export interface Exercise {
  id: string;
  type: 'running' | 'walking' | 'meditation' | 'breathing';
  duration: number;
  completed: boolean;
  scheduledTime: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  bloodGroup: string;
  weight: number;
  height: number;
}