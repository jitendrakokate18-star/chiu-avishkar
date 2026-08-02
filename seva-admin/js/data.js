// Dynamic Data Fetching for SEVA Admin Portal
const API_URL = 'http://localhost:3000';

window.mockData = { caregivers: [], patients: [], guardians: [], bookings: [] };

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

async function initData() {
  const [caregivers, patients, guardians, visits, earnings] = await Promise.all([
    fetchFromAPI('caregivers'),
    fetchFromAPI('patients'),
    fetchFromAPI('guardians'),
    fetchFromAPI('visits'),
    fetchFromAPI('earnings')
  ]);

  window.mockData = { caregivers, patients, guardians, bookings: visits, earnings };

  document.dispatchEvent(new Event('dataLoaded'));
}

document.addEventListener('DOMContentLoaded', initData);
