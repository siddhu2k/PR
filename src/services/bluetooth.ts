export async function connectToDevice() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['health_thermometer'] }]
    });
    
    const server = await device.gatt?.connect();
    return server;
  } catch (error) {
    console.error('Bluetooth connection failed:', error);
    throw error;
  }
}

export async function disconnectDevice(device: BluetoothDevice) {
  if (device.gatt?.connected) {
    device.gatt.disconnect();
  }
}