import React from 'react';

export default function Payments() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Client Payments & Invoices</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Invoices (Guardians)</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Guardian</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-2026-081</td>
                <td>Sita Kumar</td>
                <td>₹ 15,000</td>
                <td><span className="badge badge-success">Paid</span></td>
              </tr>
              <tr>
                <td>INV-2026-082</td>
                <td>Rohan Gupta</td>
                <td>₹ 18,500</td>
                <td><span className="badge badge-warning">Overdue</span></td>
              </tr>
              <tr>
                <td>INV-2026-083</td>
                <td>Kavita Shah</td>
                <td>₹ 12,000</td>
                <td><span className="badge badge-success">Paid</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
