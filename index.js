const express = require('express');
const { decideAction } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); 
  }
  next();
});

app.get('/action', (req, res) => {
  const decision = decideAction();
  res.json(decision);
});

app.listen(PORT, () => {
  console.log(`Bot en ligne sur le port ${PORT}`);
});
