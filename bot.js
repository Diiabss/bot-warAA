// Fonction pour trouver la position du bot
function findBotPosition(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '🤖') return { x, y };
    }
  }
  return null;
}

// Vérifie si une cellule est "sûre" (sans bombe)
function isCellSafe(cell) {
  return cell !== '💥';
}

// Cherche la cible la plus proche (🏆 ou 💎)
function findNearestTarget(map, targetChars, botPos) {
  let nearest = null;
  let minDist = Infinity;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      if (targetChars.includes(cell) && isCellSafe(cell)) {
        const dist = Math.abs(botPos.x - x) + Math.abs(botPos.y - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = { x, y };
        }
      }
    }
  }

  return nearest;
}

// Retourne une direction vers la cible OU un mouvement aléatoire vers une case sûre
function getMoveDirection(botPos, targetPos, map) {
  const directions = [
    { dir: "UP", x: 0, y: -1 },
    { dir: "DOWN", x: 0, y: 1 },
    { dir: "LEFT", x: -1, y: 0 },
    { dir: "RIGHT", x: 1, y: 0 }
  ];

  // 1. Aller vers la cible si elle existe
  if (targetPos) {
    for (const { dir, x, y } of directions) {
      const newX = botPos.x + x;
      const newY = botPos.y + y;
      if (
        newX >= 0 && newX < map[0].length &&
        newY >= 0 && newY < map.length &&
        isCellSafe(map[newY][newX])
      ) {
        const newDist = Math.abs(targetPos.x - newX) + Math.abs(targetPos.y - newY);
        const oldDist = Math.abs(targetPos.x - botPos.x) + Math.abs(targetPos.y - botPos.y);
        if (newDist < oldDist) return dir;
      }
    }
  }

  // 2. Sinon → choisir un mouvement aléatoire vers une case vide et sûre
  const safeDirections = directions.filter(({ x, y }) => {
    const newX = botPos.x + x;
    const newY = botPos.y + y;
    return (
      newX >= 0 && newX < map[0].length &&
      newY >= 0 && newY < map.length &&
      isCellSafe(map[newY][newX]) &&
      map[newY][newX] === ' '
    );
  });

  if (safeDirections.length > 0) {
    const random = Math.floor(Math.random() * safeDirections.length);
    return safeDirections[random].dir;
  }

  // 3. Aucune issue sûre → rester
  return "STAY";
}

// Vérifie s’il y a un ennemi adjacent
function isEnemyNearby(botPos, map) {
  const directions = [
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: -1, y: 0 }, { x: 1, y: 0 }
  ];

  for (const { x, y } of directions) {
    const newX = botPos.x + x;
    const newY = botPos.y + y;
    if (
      newX >= 0 && newX < map[0].length &&
      newY >= 0 && newY < map.length
    ) {
      const cell = map[newY][newX];
      if (cell === '👾' || cell === '🦾' || (cell.startsWith('🤖') && cell !== '🤖')) {
        return true;
      }
    }
  }

  return false;
}

// Fonction principale appelée par l’API
function decideAction(state) {
  const map = state.map;
  const botPos = findBotPosition(map);

  if (!botPos) {
    return { move: "STAY", action: "NONE" };
  }

  // 1. Poser une bombe si ennemi proche
  if (isEnemyNearby(botPos, map)) {
    return {
      move: "STAY",
      action: "BOMB",
      bombType: "proximity"
    };
  }

  // 2. Trouver la cible la plus proche
  const target = findNearestTarget(map, ['🏆', '💎'], botPos);
  const move = getMoveDirection(botPos, target, map);

  return {
    move,
    action: "COLLECT"
  };
}

module.exports = { decideAction };
