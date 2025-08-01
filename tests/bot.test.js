const { decideAction } = require('../bot');

test("Le bot trouve un point et agit", () => {
  const state = {
    map: [
      [" ", " ", "🏆", "💎", " "],
      [" ", "💎", " ", " ", "💥"],
      [" ", " ", "🤖", " ", " "],
      [" ", " ", " ", " ", "💎"],
      ["💥", " ", " ", " ", " "]
    ]
  };

  const result = decideAction(state);
  expect(result).toHaveProperty('move');
  expect(result).toHaveProperty('action');
  expect(result.action).toBe("COLLECT");
  expect(["UP", "DOWN", "LEFT", "RIGHT", "STAY"]).toContain(result.move);
});
