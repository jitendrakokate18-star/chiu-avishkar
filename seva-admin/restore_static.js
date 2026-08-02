const fs = require('fs');
const path = require('path');

const dir = __dirname;
const filesToUpdate = {
    'attendance.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Today's Attendance</h2>
            <table class="data-table">
                <thead><tr><th>Caregiver</th><th>Check-in</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td>Sunita Verma</td><td>08:55 AM</td><td><span class="badge badge-success">On Time</span></td></tr>
                    <tr><td>Rahul Desai</td><td>09:15 AM</td><td><span class="badge badge-warning">Late</span></td></tr>
                    <tr><td>Anjali Patel</td><td>--</td><td><span class="badge badge-error">Absent</span></td></tr>
                </tbody>
            </table>
        </div>
    `,
    'payroll.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Payroll Summary (August 2026)</h2>
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                <div class="stat-card bg-primary-light" style="padding:1.5rem; border-radius:12px; flex:1;">
                    <div style="font-size:0.875rem; color:#4B5563;">Total Disbursed</div>
                    <div style="font-size:1.5rem; font-weight:700;">₹ 12,45,000</div>
                </div>
                <div class="stat-card bg-warning-light" style="padding:1.5rem; border-radius:12px; flex:1;">
                    <div style="font-size:0.875rem; color:#4B5563;">Pending Processing</div>
                    <div style="font-size:1.5rem; font-weight:700;">₹ 45,000</div>
                </div>
            </div>
            <table class="data-table">
                <thead><tr><th>Caregiver</th><th>Hours Worked</th><th>Net Pay</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td>Sunita Verma</td><td>160 hrs</td><td>₹ 45,000</td><td><span class="badge badge-success">Paid</span></td></tr>
                    <tr><td>Rahul Desai</td><td>120 hrs</td><td>₹ 32,500</td><td><span class="badge badge-warning">Pending</span></td></tr>
                </tbody>
            </table>
        </div>
    `,
    'payments.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Recent Invoices (Guardians)</h2>
            <table class="data-table">
                <thead><tr><th>Invoice #</th><th>Guardian</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td>INV-2026-081</td><td>Sita Kumar</td><td>₹ 15,000</td><td><span class="badge badge-success">Paid</span></td></tr>
                    <tr><td>INV-2026-082</td><td>Rohan Gupta</td><td>₹ 18,500</td><td><span class="badge badge-warning">Overdue</span></td></tr>
                    <tr><td>INV-2026-083</td><td>Kavita Shah</td><td>₹ 12,000</td><td><span class="badge badge-success">Paid</span></td></tr>
                </tbody>
            </table>
        </div>
    `,
    'reports.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Monthly Analytics</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div style="border: 1px solid #E5E7EB; padding: 2rem; border-radius: 8px; text-align:center;">
                    <div class="material-icons" style="font-size: 3rem; color: #2563EB;">trending_up</div>
                    <h3 class="mt-4 font-bold text-lg">Patient Growth</h3>
                    <p class="text-secondary">+15% this month</p>
                </div>
                <div style="border: 1px solid #E5E7EB; padding: 2rem; border-radius: 8px; text-align:center;">
                    <div class="material-icons" style="font-size: 3rem; color: #10B981;">health_and_safety</div>
                    <h3 class="mt-4 font-bold text-lg">Care Quality Score</h3>
                    <p class="text-secondary">4.8 / 5.0 Avg Rating</p>
                </div>
            </div>
        </div>
    `,
    'support.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Active Support Tickets</h2>
            <table class="data-table">
                <thead><tr><th>Ticket ID</th><th>Reported By</th><th>Issue</th><th>Priority</th></tr></thead>
                <tbody>
                    <tr><td>#TK-901</td><td>Rahul Desai</td><td>App login issue</td><td><span class="badge badge-error">High</span></td></tr>
                    <tr><td>#TK-902</td><td>Sita Kumar</td><td>Billing discrepancy</td><td><span class="badge badge-warning">Medium</span></td></tr>
                </tbody>
            </table>
        </div>
    `,
    'settings.html': `
        <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Admin Preferences</h2>
            <div style="display:flex; flex-direction:column; gap:1rem;">
                <label style="display:flex; justify-content:space-between; padding:1rem; border:1px solid #E5E7EB; border-radius:8px;">
                    <span>Enable Email Notifications</span>
                    <input type="checkbox" checked>
                </label>
                <label style="display:flex; justify-content:space-between; padding:1rem; border:1px solid #E5E7EB; border-radius:8px;">
                    <span>Require 2FA for Admins</span>
                    <input type="checkbox" checked>
                </label>
                <label style="display:flex; justify-content:space-between; padding:1rem; border:1px solid #E5E7EB; border-radius:8px;">
                    <span>System Language</span>
                    <select><option>English (India)</option><option>Hindi</option></select>
                </label>
                <button class="btn btn-primary" style="align-self:flex-start; margin-top:1rem;">Save Settings</button>
            </div>
        </div>
    `
};

for (const [filename, newContent] of Object.entries(filesToUpdate)) {
    const filepath = path.join(dir, filename);
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const replaceRegex = /<div class="card p-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/i;
        content = content.replace(replaceRegex, newContent + '\n      </div>\n    </main>');
        fs.writeFileSync(filepath, content, 'utf8');
    }
}
console.log("Static files restored.");
