// Table rendering utility
function renderTable(tableBodyId, data, columns) {
  const tbody = document.getElementById(tableBodyId);
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (data.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="${columns.length}" class="text-center p-4 text-muted">No data available</td>`;
    tbody.appendChild(tr);
    return;
  }
  
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border)';
    tr.className = 'clickable-row';
    
    // Determine title for modal based on available data
    const title = item.name || item.patient || `Invoice ${item.id}`;
    
    tr.onclick = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') return;
      
      let detailsHtml = `<div class="modal-profile-header">
        <div class="modal-avatar"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random" /></div>
        <div><h4 class="text-lg font-bold">${title}</h4><span class="text-sm text-secondary">ID: ${item.id}</span></div>
      </div>`;
      
      for (const [key, val] of Object.entries(item)) {
        if (key !== 'name' && key !== 'id') {
          detailsHtml += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${val}</p>`;
        }
      }
      
      if (window.showModal) {
        window.showModal(title + ' Details', detailsHtml);
      }
    };
    
    columns.forEach(col => {
      const td = document.createElement('td');
      td.style.padding = 'var(--spacing-3) var(--spacing-4)';
      td.style.fontSize = '0.875rem';
      
      if (col.render) {
        td.innerHTML = col.render(item[col.key], item);
      } else {
        td.textContent = item[col.key];
      }
      
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
}

function getStatusBadge(status) {
  let badgeClass = 'badge-secondary';
  if (status === 'Active' || status === 'Confirmed' || status === 'Completed') badgeClass = 'badge-success';
  if (status === 'On Leave' || status === 'Pending' || status === 'In Progress') badgeClass = 'badge-warning';
  if (status === 'Inactive' || status === 'Cancelled') badgeClass = 'badge-error';
  
  return `<span class="badge ${badgeClass}">${status}</span>`;
}
