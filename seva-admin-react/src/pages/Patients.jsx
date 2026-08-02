import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [viewPlanPatient, setViewPlanPatient] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/patients`),
        fetch(`${import.meta.env.VITE_API_URL}/caregivers`)
      ]);
      if (pRes.ok) setPatients(await pRes.json());
      if (cRes.ok) setCaregivers(await cRes.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/patients/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let age = formData.get('age');
    if (!age.includes('yrs')) age += ' yrs';

    const data = {
      id: "PT" + Math.floor(1000 + Math.random() * 9000),
      name: formData.get('name'),
      age: age,
      condition: formData.get('condition'),
      caregiverId: formData.get('caregiver'),
      guardianId: "GD801", // Default mock
      status: "Active"
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setIsAddModalOpen(false);
      fetchData();
    } catch (e) { console.error(e); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let age = formData.get('age');
    if (!age.includes('yrs')) age += ' yrs';

    const data = {
      ...editingPatient,
      name: formData.get('name'),
      age: age,
      condition: formData.get('condition'),
      caregiverId: formData.get('caregiver')
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/patients/${editingPatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setEditingPatient(null);
      fetchData();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Patient Management</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Patient</button>
        </div>
      </div>

      <div className="card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Age & Condition</th>
                <th>Assigned Caregiver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr>
              ) : patients.length === 0 ? (
                <tr><td colSpan="5" className="text-center p-4">No patients found</td></tr>
              ) : patients.map(p => {
                const assignedCG = caregivers.find(c => c.id === p.caregiverId);
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="avatar">{p.name.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{p.age}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.condition}</div>
                    </td>
                    <td>{assignedCG ? assignedCG.name : 'Unassigned'}</td>
                    <td>
                      <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-secondary py-1 px-2 text-xs" onClick={() => setViewPlanPatient(p.name)}>View Plan</button>
                        <button className="btn btn-secondary py-1 px-2 text-xs" onClick={() => setEditingPatient(p)}>Edit</button>
                        <button className="btn btn-outline py-1 px-2 text-xs text-error" onClick={() => handleDelete(p.id)}>Delete</button>
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
        <Modal title="Add Patient" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Patient Name</label>
              <input type="text" name="name" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required placeholder="e.g. Ramesh Kumar" />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Age</label>
              <input type="number" name="age" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required placeholder="Age" />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Condition</label>
              <input type="text" name="condition" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required placeholder="e.g. Alzheimer's" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Assigned Caregiver</label>
              <select name="caregiver" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option value="">-- Unassigned --</option>
                {caregivers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Patient</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingPatient && (
        <Modal title="Edit Patient" onClose={() => setEditingPatient(null)}>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Patient Name</label>
              <input type="text" name="name" defaultValue={editingPatient.name} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Age</label>
              <input type="number" name="age" defaultValue={editingPatient.age.replace(/\\D/g, '')} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Condition</label>
              <input type="text" name="condition" defaultValue={editingPatient.condition} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Assigned Caregiver</label>
              <select name="caregiver" defaultValue={editingPatient.caregiverId} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option value="">-- Unassigned --</option>
                {caregivers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setEditingPatient(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Plan Modal */}
      {viewPlanPatient && (
        <Modal title={`Care Plan: ${viewPlanPatient}`} onClose={() => setViewPlanPatient(null)}>
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Daily Schedule</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginBottom: '1rem' }}>
              <li>10:00 AM - Medication (Aspirin)</li>
              <li>01:00 PM - Lunch & Rest</li>
              <li>02:30 PM - Physiotherapy Session</li>
              <li>06:00 PM - Evening Walk</li>
            </ul>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Notes</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ensure low-sodium diet. Patient prefers reading in the evening.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-primary" onClick={() => setViewPlanPatient(null)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
