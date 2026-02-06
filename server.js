const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from project root
app.use(express.static(__dirname));

// Default route serves preview.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'preview.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
