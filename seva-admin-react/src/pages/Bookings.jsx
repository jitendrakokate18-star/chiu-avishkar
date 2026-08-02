import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Bookings() {
  const [visits, setVisits] = useState([]);
  const [patients, setPatients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setVisits([
      { "id": "BK-1001", "date": "2026-08-01", "time": "10:00 AM - 12:00 PM", "patientId": "PT-001", "caregiverId": "CG-001", "type": "Routine", "status": "Confirmed" },
      { "id": "BK-1002", "date": "2026-08-02", "time": "02:00 PM - 04:00 PM", "patientId": "PT-002", "caregiverId": "CG-002", "type": "Therapy", "status": "Pending" }
    ]);
    setPatients([
      { "id": "PT-001", "name": "Ramesh Kumar" },
      { "id": "PT-002", "name": "Meena Shah" }
    ]);
    setCaregivers([
      { "id": "CG-001", "name": "Sunita Verma" },
      { "id": "CG-002", "name": "Rahul Desai" }
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setVisits(visits.filter(v => v.id !== id));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dateTime = formData.get('datetime');
    const d = new Date(dateTime);

    const data = {
      id: "VST" + Math.floor(1000 + Math.random() * 9000),
      patientId: formData.get('patientId'),
      caregiverId: formData.get('caregiverId'),
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: "Confirmed",
      tasks: ["General Checkup"]
    };
    setVisits([...visits, data]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Booking Management</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">Export Schedule</button>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>New Booking</button>
        </div>
      </div>

      <div className="card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient</th>
                <th>Caregiver</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
              ) : visits.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-4">No bookings found</td></tr>
              ) : visits.map(v => {
                const assignedP = patients.find(p => p.id === v.patientId);
                const assignedC = caregivers.find(c => c.id === v.caregiverId);
                return (
                  <tr key={v.id}>
                    <td style={{ fontWeight: 500 }}>{v.id}</td>
                    <td>{assignedP ? assignedP.name : v.patientId}</td>
                    <td>{assignedC ? assignedC.name : v.caregiverId}</td>
                    <td>
                      <div>{v.date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{v.time}</div>
                    </td>
                    <td>
                      <span className={`badge ${v.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-outline py-1 px-2 text-xs text-error" onClick={() => handleDelete(v.id)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal title="New Booking" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Patient</label>
              <select name="patientId" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required>
                <option value="">Select Patient...</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Caregiver</label>
              <select name="caregiverId" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required>
                <option value="">Select Caregiver...</option>
                {caregivers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date & Time</label>
              <input type="datetime-local" name="datetime" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
