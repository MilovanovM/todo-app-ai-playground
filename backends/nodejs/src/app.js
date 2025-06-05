const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Get all todos
app.get('/todos/', (req, res) => {
    db.all('SELECT * FROM todos ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a new todo
app.post('/todos/', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }

    db.run('INSERT INTO todos (text) VALUES (?)', [text], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({
            id: this.lastID,
            text,
            created_at: new Date().toISOString()
        });
    });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.status(204).send();
    });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
}); 