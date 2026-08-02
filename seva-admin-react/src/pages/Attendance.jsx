import React from 'react';

export default function Attendance() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Attendance & Check-ins</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Today's Attendance</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Caregiver</th>
                <th>Check-in</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sunita Verma</td>
                <td>08:55 AM</td>
                <td><span className="badge badge-success">On Time</span></td>
              </tr>
              <tr>
                <td>Rahul Desai</td>
                <td>09:15 AM</td>
                <td><span className="badge badge-warning">Late</span></td>
              </tr>
              <tr>
                <td>Anjali Patel</td>
                <td>--</td>
                <td><span className="badge" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>Absent</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
