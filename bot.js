function findBotPosition(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '🤖') return { x, y };
    }
  }
  return null;
}

function findNearestTarget(map, targetChars, botPos) {
  let nearest = null;
  let minDist = Infinity;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (targetChars.includes(map[y][x])) {
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

function getMoveDirection(botPos, targetPos) {
  if (!targetPos) return "STAY";

  const dx = targetPos.x - botPos.x;
  const dy = targetPos.y - botPos.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "RIGHT" : "LEFT";
  } else {
    return dy > 0 ? "DOWN" : "UP";
  }
}

function isSafeMove(map, pos, direction) {
  const moves = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    STAY: { x: 0, y: 0 }
  };

  const newX = pos.x + moves[direction].x;
  const newY = pos.y + moves[direction].y;

  if (
    newX >= 0 && newX < map[0].length &&
    newY >= 0 && newY < map.length
  ) {
    return map[newY][newX] !== '💥';
  }

  return false;
}

function decideAction(state) {
  const map = state.map;
  if (!map) return { move: "STAY", action: "NONE" };

  const botPos = findBotPosition(map);
  const target = findNearestTarget(map, ['🏆', '💎'], botPos);

  let move = getMoveDirection(botPos, target);

  if (!isSafeMove(map, botPos, move)) {
    move = "STAY";
  }

  return {
    move,
    action: "COLLECT"
  };
}

module.exports = { decideAction };
