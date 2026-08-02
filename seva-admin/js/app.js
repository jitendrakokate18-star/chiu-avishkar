document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Save state
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });

    // Restore state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
    }
  }

  // Active Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});

// Utility to populate tables or components
function renderTemplate(templateId, data) {}

// Modal Logic
window.showModal = function(title, contentHtml) {
  let overlay = document.getElementById('global-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-modal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal-content"><div class="modal-header"><h3 class="modal-title">${title}</h3><span class="material-icons modal-close" onclick="closeModal()" style="cursor:pointer;">close</span></div><div class="modal-body">${contentHtml}</div></div>`;
  // Small delay for animation
  setTimeout(() => overlay.classList.add('active'), 10);
};

window.closeModal = function() {
  const overlay = document.getElementById('global-modal');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.innerHTML = '', 300);
  }
};

// API Submissions
async function postData(endpoint, data) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      closeModal();
      if (typeof initData === 'function') initData(); // Reload data
    } else {
      alert("Error saving data");
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Make sure backend is running.");
  }
}

window.submitAddCaregiver = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    id: "CG" + Math.floor(1000 + Math.random() * 9000),
    name: formData.get('name'),
    specialization: formData.get('spec'),
    status: "Active",
    experience: "1+ years",
    rating: 5.0
  };
  postData('caregivers', data);
};

window.showAddCaregiverModal = function() {
  const html = `
    <form onsubmit="submitAddCaregiver(event)">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required placeholder="e.g. Sunita Verma">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Aadhaar Number</label>
        <input type="text" name="aadhaar" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required pattern="\\d{12}" title="12 digit Aadhaar number" placeholder="XXXX-XXXX-XXXX">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Specialization</label>
        <select name="spec" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option>Elder Care</option>
          <option>Post-Op Recovery</option>
          <option>Physiotherapy</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">City/Area</label>
        <select name="city" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option>Andheri</option>
          <option>Bandra</option>
          <option>Colaba</option>
          <option>Borivali</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Caregiver</button>
      </div>
    </form>
  `;
  showModal("Add Caregiver", html);
};

window.submitAddPatient = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    id: "PT" + Math.floor(1000 + Math.random() * 9000),
    name: formData.get('name'),
    age: formData.get('age') + " yrs",
    condition: formData.get('condition'),
    caregiverId: formData.get('caregiver'),
    guardianId: "GD801",
    status: "Active"
  };
  postData('patients', data);
};

window.showAddPatientModal = function() {
  // Populate caregiver options dynamically if available
  let caregiverOptions = '<option value="">-- Unassigned --</option>';
  if (window.mockData && window.mockData.caregivers) {
    window.mockData.caregivers.forEach(c => {
      caregiverOptions += \`<option value="\${c.id}">\${c.name}</option>\`;
    });
  }

  const html = `
    <form onsubmit="submitAddPatient(event)">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Patient Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required placeholder="e.g. Ramesh Kumar">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Age</label>
        <input type="number" name="age" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required placeholder="Age">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Primary Condition</label>
        <input type="text" name="condition" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required placeholder="e.g. Alzheimer's">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Assigned Caregiver (Optional)</label>
        <select name="caregiver" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          ${caregiverOptions}
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Patient</button>
      </div>
    </form>
  `;
  showModal("Add Patient", html);
};

window.submitNewBooking = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
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
  postData('visits', data);
};

window.showNewBookingModal = function() {
  let patientOptions = '';
  let caregiverOptions = '';
  
  if (window.mockData && window.mockData.patients) {
    window.mockData.patients.forEach(p => { patientOptions += \`<option value="\${p.id}">\${p.name}</option>\`; });
  }
  if (window.mockData && window.mockData.caregivers) {
    window.mockData.caregivers.forEach(c => { caregiverOptions += \`<option value="\${c.id}">\${c.name}</option>\`; });
  }

  const html = `
    <form onsubmit="submitNewBooking(event)">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Patient</label>
        <select name="patientId" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required>
          ${patientOptions}
        </select>
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Caregiver</label>
        <select name="caregiverId" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required>
          ${caregiverOptions}
        </select>
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Date & Time</label>
        <input type="datetime-local" name="datetime" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Confirm Booking</button>
      </div>
    </form>
  `;
  showModal("New Booking", html);
};

window.showReportModal = function() {
  const html = `
    <form onsubmit="event.preventDefault(); closeModal(); alert('Report generated!');">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Select Region</label>
        <select class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option>All Mumbai</option>
          <option>Andheri</option>
          <option>Bandra</option>
          <option>South Mumbai</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Report Type</label>
        <select class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option>Care Quality</option>
          <option>Payroll & Revenue</option>
          <option>Attendance</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Generate</button>
      </div>
    </form>
  `;
  showModal("Generate Report", html);
};

window.showActivityDetailModal = function(title, time, desc) {
  const html = `
    <div style="margin-bottom: 1.5rem;">
      <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${time}</p>
      <p style="color: var(--text-primary);">${desc}</p>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
      <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
    </div>
  `;
  showModal(title, html);
};

window.submitAddGuardian = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    id: "GD" + Math.floor(1000 + Math.random() * 9000),
    name: formData.get('name'),
    contact: formData.get('contact'),
    relation: formData.get('relation'),
    patientId: "PT101" // Assign default patient id for mock
  };
  postData('guardians', data);
};

window.showAddGuardianModal = function() {
  const html = `
    <form onsubmit="submitAddGuardian(event)">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Guardian Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required placeholder="e.g. Vikram Sharma">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Contact Number</label>
        <input type="tel" name="contact" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required pattern="\\d{10}" title="10 digit phone number" placeholder="9876543210">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Relation to Patient</label>
        <select name="relation" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option>Son</option>
          <option>Daughter</option>
          <option>Spouse</option>
          <option>Other</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Guardian</button>
      </div>
    </form>
  `;
  showModal("Add Guardian", html);
};

window.showViewPlanModal = function(patientName) {
  const html = `
    <div style="margin-bottom: 1.5rem; color: var(--text-primary);">
      <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Daily Schedule</h4>
      <ul style="list-style-type: disc; padding-left: 1.25rem; margin-bottom: 1rem;">
        <li>10:00 AM - Medication (Aspirin)</li>
        <li>01:00 PM - Lunch & Rest</li>
        <li>02:30 PM - Physiotherapy Session</li>
        <li>06:00 PM - Evening Walk</li>
      </ul>
      <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Notes</h4>
      <p style="font-size: 0.875rem; color: var(--text-secondary);">Ensure low-sodium diet. Patient prefers reading in the evening.</p>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
      <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
    </div>
  `;
  showModal(\`Care Plan: \${patientName}\`, html);
};

window.toggleDarkMode = function() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
};

(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// --- EDIT & DELETE LOGIC --- //

window.deleteItem = async function(endpoint, id) {
  if (!confirm("Are you sure you want to delete this item?")) return;
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`, { method: 'DELETE' });
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
    const res = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
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
  const html = `
    <form onsubmit="submitEditCaregiver(event, '${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Specialization</label>
        <select name="spec" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option ${item.specialization === 'Elder Care' ? 'selected' : ''}>Elder Care</option>
          <option ${item.specialization === 'Post-Op Recovery' ? 'selected' : ''}>Post-Op Recovery</option>
          <option ${item.specialization === 'Physiotherapy' ? 'selected' : ''}>Physiotherapy</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `;
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
      caregiverOptions += \`<option value="${c.id}" ${isSelected}>${c.name}</option>\`;
    });
  }

  const numericAge = item.age.replace(/\D/g, '');

  const html = `
    <form onsubmit="submitEditPatient(event, '${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Patient Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Age</label>
        <input type="number" name="age" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${numericAge}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Condition</label>
        <input type="text" name="condition" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${item.condition}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Assigned Caregiver</label>
        <select name="caregiver" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          ${caregiverOptions}
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `;
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

  const html = `
    <form onsubmit="submitEditGuardian(event, '${id}')">
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Guardian Name</label>
        <input type="text" name="name" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${item.name}">
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Contact Number</label>
        <input type="tel" name="contact" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);" required value="${item.contact}">
      </div>
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Relation</label>
        <select name="relation" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-primary);">
          <option ${item.relation === 'Son' ? 'selected' : ''}>Son</option>
          <option ${item.relation === 'Daughter' ? 'selected' : ''}>Daughter</option>
          <option ${item.relation === 'Spouse' ? 'selected' : ''}>Spouse</option>
          <option ${item.relation === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `;
  showModal("Edit Guardian", html);
};
