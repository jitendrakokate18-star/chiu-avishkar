import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGuardian, setEditingGuardian] = useState(null);

  const fetchGuardians = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guardians`);
      if (res.ok) setGuardians(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guardian?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/guardians/${id}`, { method: 'DELETE' });
      fetchGuardians();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: "GD" + Math.floor(1000 + Math.random() * 9000),
      name: formData.get('name'),
      contact: formData.get('contact'),
      relation: formData.get('relation'),
      patientId: "PT101" // Mock default
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/guardians`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setIsAddModalOpen(false);
      fetchGuardians();
    } catch (e) { console.error(e); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...editingGuardian,
      name: formData.get('name'),
      contact: formData.get('contact'),
      relation: formData.get('relation')
    };
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/guardians/${editingGuardian.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setEditingGuardian(null);
      fetchGuardians();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Guardian Directory</h1>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>Add Guardian</button>
        </div>
      </div>

      <div className="card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guardian Details</th>
                <th>Contact</th>
                <th>Relation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
              ) : guardians.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4">No guardians found</td></tr>
              ) : guardians.map(g => (
                <tr key={g.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="avatar">{g.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{g.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{g.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{g.contact}</td>
                  <td>
                    <span className="badge badge-success">{g.relation}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-secondary py-1 px-2 text-xs" onClick={() => setEditingGuardian(g)}>Edit</button>
                      <button className="btn btn-outline py-1 px-2 text-xs text-error" onClick={() => handleDelete(g.id)}>Delete</button>
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
        <Modal title="Add Guardian" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Guardian Name</label>
              <input type="text" name="name" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required placeholder="e.g. Vikram Sharma" />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contact Number</label>
              <input type="tel" name="contact" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required pattern="\\d{10}" title="10 digit phone number" placeholder="9876543210" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Relation to Patient</label>
              <select name="relation" className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option>Son</option>
                <option>Daughter</option>
                <option>Spouse</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Guardian</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingGuardian && (
        <Modal title="Edit Guardian" onClose={() => setEditingGuardian(null)}>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Guardian Name</label>
              <input type="text" name="name" defaultValue={editingGuardian.name} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contact Number</label>
              <input type="tel" name="contact" defaultValue={editingGuardian.contact} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }} required pattern="\\d{10}" title="10 digit phone number" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Relation</label>
              <select name="relation" defaultValue={editingGuardian.relation} className="form-control" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <option>Son</option>
                <option>Daughter</option>
                <option>Spouse</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setEditingGuardian(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
