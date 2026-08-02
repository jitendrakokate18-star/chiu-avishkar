const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`SEVA Admin Portal is running perfectly!`);
    console.log(`-> Access it at: http://localhost:${PORT}`);
    console.log(`===========================================\n`);
});
