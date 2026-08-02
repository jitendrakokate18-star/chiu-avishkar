import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Caregivers() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCaregiver, setEditingCaregiver] = useState(null);

  const fetchCaregivers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/caregivers`);
      if (res.ok) setCaregivers(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this caregiver?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/caregivers/${id}`, { method: 'DELETE' });
      fetchCaregivers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: "CG" + Math.floor(1000 + Math.random() * 9000),
      name: formData.get('name'),
      specialization: formData.get('spec'),
      status: "Active",
      experience: "1+ years",
      rating: 5.0
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/caregivers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setIsAddModalOpen(false);
      fetchCaregivers();
    } catch (e) { console.error(e); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...editingCaregiver,
      name: formData.get('name'),
      specialization: formData.get('spec')
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/caregivers/${editingCaregiver.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setEditingCaregiver(null);
      fetchCaregivers();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Caregiver Directory</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">Export List</button>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Caregiver</button>
        </div>
      </div>

      <div className="card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Caregiver Details</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
              ) : caregivers.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4">No caregivers found</td></tr>
              ) : caregivers.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="avatar">{c.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.specialization}</td>
                  <td>
                    <span className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-secondary py-1 px-2 text-xs" onClick={() => setEditingCaregiver(c)}>Edit</button>
                      <button className="btn btn-outline py-1 px-2 text-xs text-error" onClick={() => handleDelete(c.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal title="Add Caregiver" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
              <input type="text" name="name" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required placeholder="e.g. Sunita Verma" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Specialization</label>
              <select name="spec" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option>Elder Care</option>
                <option>Post-Op Recovery</option>
                <option>Physiotherapy</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Caregiver</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingCaregiver && (
        <Modal title="Edit Caregiver" onClose={() => setEditingCaregiver(null)}>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
              <input type="text" name="name" defaultValue={editingCaregiver.name} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Specialization</label>
              <select name="spec" defaultValue={editingCaregiver.specialization} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option>Elder Care</option>
                <option>Post-Op Recovery</option>
                <option>Physiotherapy</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setEditingCaregiver(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
