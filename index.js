const express = require('express');
const { decideAction } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware CORS (autorise toutes les origines et méthodes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ✅ GET (par défaut pour Gogokodo)
app.get('/action', (req, res) => {
  try {
    const defaultMap = {
      map: [
        [' ', ' ', ' '],
        [' ', '🤖', ' '],
        [' ', ' ', ' ']
      ]
    };
    const decision = decideAction(defaultMap); // fallback si pas de body
    res.json(decision);
  } catch (error) {
    console.error('Erreur GET /action:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ POST (pour tester manuellement ou simuler)
app.post('/action', (req, res) => {
  try {
    const decision = decideAction(req.body);
    res.json(decision);
  } catch (error) {
    console.error('Erreur POST /action:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot en ligne sur le port ${PORT}`);
});
