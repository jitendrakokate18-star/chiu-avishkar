const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'seva-admin', 'js', 'app.js');
let content = fs.readFileSync(file, 'utf8');

const editLogic = `
// --- EDIT & DELETE LOGIC --- //

window.deleteItem = async function(endpoint, id) {
  if (!confirm("Are you sure you want to delete this item?")) return;
  try {
    const res = await fetch(\`http://localhost:3000/\${endpoint}/\${id}\`, { method: 'DELETE' });
    if (res.ok) {
      if (typeof initData === 'function') initData();
    } else {
      alert("Error deleting item.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
};

async function putData(endpoint, id, data) {
  try {
    const res = await fetch(\`http://localhost:3000/\${endpoint}/\${id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal();
      if (typeof initData === 'function') initData();
    } else {
      alert("Error updating data.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
}

// CAREGIVERS EDIT
window.submitEditCaregiver = function(event, id) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = window.mockData.caregivers.find(c => c.id === id);
  if (!data) return;
  const updatedData = {
    ...data,
    name: formData.get('name'),
    specialization: formData.get('spec')
  };
  putData('caregivers', id, updatedData);
};

window.showEditCaregiverModal = function(id) {
  const item = window.mockData.caregivers.find(c => c.id === id);
  if (!item) return;
  const html = \`
    <form onsubmit="submitEditCaregiver(event, '\${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Specialization</label>
        <select name="spec" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option \${item.specialization === 'Elder Care' ? 'selected' : ''}>Elder Care</option>
          <option \${item.specialization === 'Post-Op Recovery' ? 'selected' : ''}>Post-Op Recovery</option>
          <option \${item.specialization === 'Physiotherapy' ? 'selected' : ''}>Physiotherapy</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  \`;
  showModal("Edit Caregiver", html);
};

// PATIENTS EDIT
window.submitEditPatient = function(event, id) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = window.mockData.patients.find(p => p.id === id);
  if (!data) return;
  const updatedData = {
    ...data,
    name: formData.get('name'),
    age: formData.get('age') + (formData.get('age').includes('yrs') ? '' : ' yrs'),
    condition: formData.get('condition'),
    caregiverId: formData.get('caregiver')
  };
  putData('patients', id, updatedData);
};

window.showEditPatientModal = function(id) {
  const item = window.mockData.patients.find(p => p.id === id);
  if (!item) return;

  let caregiverOptions = '<option value="">-- Unassigned --</option>';
  if (window.mockData && window.mockData.caregivers) {
    window.mockData.caregivers.forEach(c => {
      const isSelected = c.id === item.caregiverId ? 'selected' : '';
      caregiverOptions += \\\`<option value="\${c.id}" \${isSelected}>\${c.name}</option>\\\`;
    });
  }

  const numericAge = item.age.replace(/\\D/g, '');

  const html = \`
    <form onsubmit="submitEditPatient(event, '\${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Patient Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Age</label>
        <input type="number" name="age" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${numericAge}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Condition</label>
        <input type="text" name="condition" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${item.condition}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Assigned Caregiver</label>
        <select name="caregiver" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          \${caregiverOptions}
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  \`;
  showModal("Edit Patient", html);
};

// GUARDIANS EDIT
window.submitEditGuardian = function(event, id) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = window.mockData.guardians.find(g => g.id === id);
  if (!data) return;
  const updatedData = {
    ...data,
    name: formData.get('name'),
    contact: formData.get('contact'),
    relation: formData.get('relation')
  };
  putData('guardians', id, updatedData);
};

window.showEditGuardianModal = function(id) {
  const item = window.mockData.guardians.find(g => g.id === id);
  if (!item) return;

  const html = \`
    <form onsubmit="submitEditGuardian(event, '\${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Guardian Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Contact Number</label>
        <input type="tel" name="contact" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="\${item.contact}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Relation</label>
        <select name="relation" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option \${item.relation === 'Son' ? 'selected' : ''}>Son</option>
          <option \${item.relation === 'Daughter' ? 'selected' : ''}>Daughter</option>
          <option \${item.relation === 'Spouse' ? 'selected' : ''}>Spouse</option>
          <option \${item.relation === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  \`;
  showModal("Edit Guardian", html);
};
`;

if (!content.includes('EDIT & DELETE LOGIC')) {
    fs.writeFileSync(file, content + editLogic);
}
console.log("Edit logic appended to js/app.js");
