import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Caregivers from './pages/Caregivers';
import Patients from './pages/Patients';
import Guardians from './pages/Guardians';
import Bookings from './pages/Bookings';
import Scheduling from './pages/Scheduling';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Support from './pages/Support';
import Settings from './pages/Settings';

function Dashboard() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-label">Active Caregivers</div>
          <div className="kpi-value">142</div>
          <div className="kpi-trend text-success">↑ 12% from last month</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-label">Active Clients</div>
          <div className="kpi-value">328</div>
          <div className="kpi-trend text-success">↑ 8% from last month</div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="card p-6">
        <p>This page is a placeholder mockup.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="caregivers" element={<Caregivers />} />
        <Route path="patients" element={<Patients />} />
        <Route path="guardians" element={<Guardians />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="scheduling" element={<Scheduling />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PlaceholderPage title="Coming Soon" />} />
      </Route>
    </Routes>
  );
}
