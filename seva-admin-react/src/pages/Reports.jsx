import React from 'react';

export default function Reports() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Analytics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ border: '1px solid #E5E7EB', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div className="material-icons" style={{ fontSize: '3rem', color: '#2563EB' }}>trending_up</div>
            <h3 className="mt-4 font-bold text-lg">Patient Growth</h3>
            <p className="text-secondary">+15% this month</p>
          </div>
          <div style={{ border: '1px solid #E5E7EB', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <div className="material-icons" style={{ fontSize: '3rem', color: '#10B981' }}>health_and_safety</div>
            <h3 className="mt-4 font-bold text-lg">Care Quality Score</h3>
            <p className="text-secondary">4.8 / 5.0 Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
