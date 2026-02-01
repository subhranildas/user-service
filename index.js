const express = require('express');
const path = require('path');

const app = express();
app.use(express.json()); // 👈 IMPORTANT

// In-memory user store
let users = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
];

// Serve GUI
app.use(express.static(path.join(__dirname, 'public')));

// Get users
app.get('/users', (req, res) => {
  res.json({ users });
});

// Add user
app.post('/users', (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});
