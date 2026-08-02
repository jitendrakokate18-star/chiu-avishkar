import React from 'react';

export default function Payroll() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Payroll</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Payroll Summary (August 2026)</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>Total Disbursed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹ 12,45,000</div>
          </div>
          <div className="stat-card" style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '12px', flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>Pending Processing</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹ 45,000</div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Caregiver</th>
                <th>Hours Worked</th>
                <th>Net Pay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sunita Verma</td>
                <td>160 hrs</td>
                <td>₹ 45,000</td>
                <td><span className="badge badge-success">Paid</span></td>
              </tr>
              <tr>
                <td>Rahul Desai</td>
                <td>120 hrs</td>
                <td>₹ 32,500</td>
                <td><span className="badge badge-warning">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
