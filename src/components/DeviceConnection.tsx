import React, { useState } from 'react';
import { Bluetooth, AlertCircle } from 'lucide-react';
import { connectToDevice, disconnectDevice } from '../services/bluetooth';

export default function DeviceConnection() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [error, setError] = useState<string>('');

  const handleConnect = async () => {
    try {
      setError('');
      const server = await connectToDevice();
      if (server?.device) {
        setDevice(server.device);
      }
    } catch (err) {
      setError('Failed to connect to device. Please make sure Bluetooth is enabled.');
    }
  };

  const handleDisconnect = async () => {
    if (device) {
      await disconnectDevice(device);
      setDevice(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Device Connection</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bluetooth className={`w-6 h-6 ${device ? 'text-blue-600' : 'text-gray-400'}`} />
            <div>
              <h2 className="text-lg font-semibold">Bluetooth Connection</h2>
              <p className="text-sm text-gray-500">
                {device ? `Connected to ${device.name || 'Unknown Device'}` : 'No device connected'}
              </p>
            </div>
          </div>
          
          <button
            onClick={device ? handleDisconnect : handleConnect}
            className={`px-4 py-2 rounded-lg ${
              device
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {device ? 'Disconnect' : 'Connect Device'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </div>

      {device && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Device Information</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="text-gray-900">{device.name || 'Unknown'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">ID</dt>
              <dd className="text-gray-900">{device.id}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}