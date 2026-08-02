// Chart.js initialization script (Assumes Chart.js is loaded in the HTML)
function initDashboardCharts() {
  const weeklyVisitsCtx = document.getElementById('weeklyVisitsChart');
  const revenueTrendCtx = document.getElementById('revenueTrendChart');

  if (weeklyVisitsCtx && window.Chart) {
    new Chart(weeklyVisitsCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Visits',
          data: [12, 19, 15, 22, 28, 20, 24],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (revenueTrendCtx && window.Chart) {
    new Chart(revenueTrendCtx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Revenue',
          data: [5000, 7500, 6200, 8900],
          backgroundColor: '#10b981',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initDashboardCharts();
});
