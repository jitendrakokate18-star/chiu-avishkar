import React from 'react';

export default function Settings() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Admin Preferences</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <span>Enable Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <span>Require 2FA for Admins</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <span>System Language</span>
            <select className="form-control" style={{ width: '200px' }}>
              <option>English (India)</option>
              <option>Hindi</option>
            </select>
          </label>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
