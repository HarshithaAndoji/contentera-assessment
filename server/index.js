const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/reddit', async (req, res) => {
  try {
    const response = await fetch('https://www.reddit.com/r/reactjs.json?raw_json=1');

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Reddit posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
