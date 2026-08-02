const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'seva-admin');

// 1. Fix caregivers.html
let caregivers = fs.readFileSync(path.join(dir, 'caregivers.html'), 'utf8');
caregivers = caregivers.replace(
    `<button class="btn btn-secondary py-1 px-2 text-xs">Edit</button>`,
    `<button class="btn btn-secondary py-1 px-2 text-xs" onclick="showEditCaregiverModal('\${item.id}')">Edit</button>
     <button class="btn btn-outline py-1 px-2 text-xs text-error" onclick="deleteItem('caregivers', '\${item.id}')">Delete</button>`
);
fs.writeFileSync(path.join(dir, 'caregivers.html'), caregivers);

// 2. Fix patients.html
let patients = fs.readFileSync(path.join(dir, 'patients.html'), 'utf8');
patients = patients.replace(
    `<button class="btn btn-secondary py-1 px-2 text-xs">Edit</button>`,
    `<button class="btn btn-secondary py-1 px-2 text-xs" onclick="showEditPatientModal('\${item.id}')">Edit</button>
     <button class="btn btn-outline py-1 px-2 text-xs text-error" onclick="deleteItem('patients', '\${item.id}')">Delete</button>`
);
fs.writeFileSync(path.join(dir, 'patients.html'), patients);

// 3. Fix guardians.html
let guardians = fs.readFileSync(path.join(dir, 'guardians.html'), 'utf8');
guardians = guardians.replace(
    `<button class="btn btn-secondary py-1 px-2 text-xs">Edit</button>`,
    `<button class="btn btn-secondary py-1 px-2 text-xs" onclick="showEditGuardianModal('\${item.id}')">Edit</button>
     <button class="btn btn-outline py-1 px-2 text-xs text-error" onclick="deleteItem('guardians', '\${item.id}')">Delete</button>`
);
fs.writeFileSync(path.join(dir, 'guardians.html'), guardians);

console.log("HTML buttons updated!");
