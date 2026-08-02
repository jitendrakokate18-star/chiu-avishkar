import React from 'react';

export default function Support() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Support & Complaints</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Active Support Tickets</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Reported By</th>
                <th>Issue</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#TK-901</td>
                <td>Rahul Desai</td>
                <td>App login issue</td>
                <td><span className="badge badge-error">High</span></td>
              </tr>
              <tr>
                <td>#TK-902</td>
                <td>Sita Kumar</td>
                <td>Billing discrepancy</td>
                <td><span className="badge badge-warning">Medium</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
