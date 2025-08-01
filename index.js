const express = require('express');
const cors = require('cors');
const { decideAction } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/action', (req, res) => {
  const decision = decideAction(); 
  res.json(decision);
});

app.listen(PORT, () => {
  console.log(`Bot en ligne sur le port ${PORT}`);
});
