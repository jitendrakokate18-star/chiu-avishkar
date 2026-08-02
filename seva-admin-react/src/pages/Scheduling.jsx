import React from 'react';
import '../css/scheduling.css';

export default function Scheduling() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Weekly Scheduling</h1>
        <div className="flex gap-2">
          <button className="btn btn-secondary">&lt; Prev Week</button>
          <span className="btn btn-outline font-semibold">Aug 3 - Aug 9, 2026</span>
          <button className="btn btn-secondary">Next Week &gt;</button>
        </div>
      </div>

      <div className="card p-0 mb-6">
        <div className="p-4 border-b border flex justify-between items-center" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Caregiver:</label>
            <select className="form-control" style={{ width: '250px' }}>
              <option>All Caregivers</option>
              <option>Sunita Verma</option>
              <option>Rahul Desai</option>
              <option>Anjali Patel</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Add Booking logic goes here')}>Assign Slot</button>
        </div>
        
        <div className="calendar-grid">
          {/* Header */}
          <div className="calendar-header-cell text-muted">Time</div>
          <div className="calendar-header-cell">Mon (3)</div>
          <div className="calendar-header-cell">Tue (4)</div>
          <div className="calendar-header-cell">Wed (5)</div>
          <div className="calendar-header-cell">Thu (6)</div>
          <div className="calendar-header-cell">Fri (7)</div>
          <div className="calendar-header-cell">Sat (8)</div>
          <div className="calendar-header-cell">Sun (9)</div>

          {/* 08:00 AM */}
          <div className="time-cell">08:00 AM</div>
          <div className="day-cell">
            <div className="booking-slot completed" onClick={() => alert('Booking Details: Caregiver S. Verma assigned to Patient R. Kumar')}>
              <div className="font-semibold text-primary">S. Verma</div>
              <div className="text-secondary text-xs">R. Kumar</div>
            </div>
          </div>
          <div className="day-cell"></div>
          <div className="day-cell">
            <div className="booking-slot" onClick={() => alert('Booking Details: Caregiver A. Patel assigned to Patient M. Shah')}>
              <div className="font-semibold text-primary">A. Patel</div>
              <div className="text-secondary text-xs">M. Shah</div>
            </div>
          </div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>

          {/* 09:00 AM */}
          <div className="time-cell">09:00 AM</div>
          <div className="day-cell"></div>
          <div className="day-cell">
            <div className="booking-slot completed" onClick={() => alert('Booking Details: Caregiver S. Verma assigned to Patient R. Kumar')}>
              <div className="font-semibold text-primary">S. Verma</div>
              <div className="text-secondary text-xs">R. Kumar</div>
            </div>
          </div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>

          {/* 10:00 AM */}
          <div className="time-cell">10:00 AM</div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell">
            <div className="booking-slot" onClick={() => alert('Booking Details: Caregiver R. Desai assigned to Patient A. Gupta')}>
              <div className="font-semibold text-primary">R. Desai</div>
              <div className="text-secondary text-xs">A. Gupta</div>
            </div>
          </div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>

          {/* 11:00 AM */}
          <div className="time-cell">11:00 AM</div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
          <div className="day-cell"></div>
        </div>
      </div>
    </div>
  );
}
