import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Dashboard' },
  { path: '/caregivers', icon: 'medical_services', label: 'Caregivers' },
  { path: '/guardians', icon: 'family_restroom', label: 'Guardians' },
  { path: '/patients', icon: 'elderly', label: 'Patients' },
  { path: '/bookings', icon: 'event', label: 'Bookings' },
  { path: '/scheduling', icon: 'calendar_month', label: 'Scheduling' },
  { path: '/attendance', icon: 'schedule', label: 'Attendance' },
  { path: '/payroll', icon: 'payments', label: 'Payroll' },
  { path: '/payments', icon: 'credit_card', label: 'Payments' },
  { path: '/reports', icon: 'bar_chart', label: 'Reports' },
  { path: '/support', icon: 'headset_mic', label: 'Support' },
  { path: '/settings', icon: 'settings', label: 'Settings' }
];

export default function Sidebar({ isCollapsed }) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="brand" style={{ textDecoration: 'none' }}>
          <div className="brand-icon">
            <img src="/logo.jpg" alt="SEVA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'inherit', backgroundColor: 'white' }} />
          </div>
          <span className="brand-text">SEVA Health</span>
        </NavLink>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="nav-icon">
              <span className="material-icons" style={{ fontSize: '1.2rem', transform: 'translateY(4px)' }}>
                {item.icon}
              </span>
            </div>
            <span className="nav-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="btn btn-outline w-full text-center">Logout</a>
      </div>
    </aside>
  );
}
