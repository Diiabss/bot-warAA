const express = require('express');
const { decideAction } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS complet (autorise toutes origines et méthodes nécessaires)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // ✅ POST au lieu de GET
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); 
  }
  next();
});

// ✅ Remplacer GET par POST
app.post('/action', (req, res) => {
  try {
    const gameState = req.body;
    const decision = decideAction(gameState);
    res.json(decision);
  } catch (error) {
    console.error('Erreur dans /action:', error);
    res.status(500).json({ error: 'Erreur interne serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot en ligne sur le port ${PORT}`);
});
