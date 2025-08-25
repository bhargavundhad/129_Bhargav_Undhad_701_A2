const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/api/catfact', async (req, res) => {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cat fact' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});