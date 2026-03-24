const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// In-memory comments array
let comments = [];
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Load comments from file on startup
function loadCommentsFromFile() {
    try {
        if (fs.existsSync(COMMENTS_FILE)) {
            const data = fs.readFileSync(COMMENTS_FILE, 'utf-8');
            comments = JSON.parse(data);
            console.log(`Loaded ${comments.length} comments from file`);
        }
    } catch (err) {
        console.error('Error loading comments file:', err);
        comments = [];
    }
}

// Save comments to file
function saveCommentsToFile() {
    try {
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error saving comments file:', err);
    }
}

// API Endpoints
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.post('/api/comments', (req, res) => {
    const { author, text, type } = req.body;
    
    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required' });
    }
    
    const comment = {
        id: Date.now(),
        author,
        text,
        type: type || 'general',
        date: new Date().toISOString()
    };
    
    comments.push(comment);
    saveCommentsToFile();
    
    res.json(comment);
});

// Default route serves preview.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'preview.html'));
});

// Route for nudges prototype
app.get('/nudges', (req, res) => {
    res.sendFile(path.join(__dirname, 'nudges.html'));
});

// Route for see-more flow prototype
app.get('/see-more', (req, res) => {
    res.sendFile(path.join(__dirname, 'see-more.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    loadCommentsFromFile();
});
