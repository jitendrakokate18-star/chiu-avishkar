import React from 'react';

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button id="sidebar-toggle" className="icon-btn" onClick={toggleSidebar}>
          <span className="material-icons" style={{ fontSize: '1.2rem', transform: 'translateY(4px)' }}>menu</span>
        </button>
        <div className="search-bar">
          <span className="search-icon">
            <span className="material-icons" style={{ fontSize: '1.2rem', transform: 'translateY(4px)' }}>search</span>
          </span>
          <input type="text" placeholder="Search across SEVA..." />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn">
          <span className="material-icons" style={{ fontSize: '1.2rem', transform: 'translateY(4px)' }}>notifications</span>
          <span className="icon-badge"></span>
        </button>
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
