import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';

const VehicleLogs = ({ isModalOpen, handleCancel }) => {
  const [vehicleData, setVehicleData] = useState(null);
 
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8087/ws/mqtt");

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      console.log("📩 Live Data:", event.data);
      try {
        const parsedData = JSON.parse(event.data);
        setVehicleData(parsedData);
      } catch (err) {
        setVehicleData({ data: event.data });
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close();
  }, []);

  const renderKeyValue = (data) => {
    if (typeof data === 'object' && data !== null) {
      return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>{key}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p>{data}</p>;
  };

  return (
    <Modal
      title="Installation Logs"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <h2>🚗 Vehicle Live Data</h2>
        {vehicleData ? renderKeyValue(vehicleData) : <p>Waiting for data...</p>}
      </div>
    </Modal>
  );
};

export default VehicleLogs;
