const { decideAction } = require('../bot');

describe("Bot War – Tests avancés de logique", () => {
  test("1. Priorise un trophée 🏆 proche", () => {
    const state = {
      map: [
        [" ", " ", "🏆", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", "🤖", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "]
      ]
    };
    const res = decideAction(state);
    expect(res.move).not.toBe("STAY");
    expect(res.action).toBe("COLLECT");
  });

  test("2. Évite une bombe 💥 en chemin", () => {
    const state = {
      map: [
        [" ", "💥", " ", " ", " "],
        [" ", " ", "💎", " ", " "],
        [" ", " ", "🤖", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "]
      ]
    };
    const res = decideAction(state);
    expect(res.move).not.toBe("LEFT"); // évite la bombe
    expect(res.action).toBe("COLLECT");
  });

  test("3. Pose une bombe si ennemi 👾 adjacent", () => {
    const state = {
      map: [
        [" ", " ", " ", " ", " "],
        [" ", " ", "👾", " ", " "],
        [" ", " ", "🤖", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "]
      ]
    };
    const res = decideAction(state);
    expect(res.action).toBe("BOMB");
    expect(res.bombType).toBe("proximity");
  });

  test("4. Coincé entre des bombes → STAY", () => {
    const state = {
      map: [
        [" ", "💥", " ", "💥", " "],
        ["💥", " ", "💥", " ", "💥"],
        [" ", "💥", "🤖", "💥", " "],
        ["💥", " ", "💥", " ", "💥"],
        [" ", "💥", " ", "💥", " "]
      ]
    };
    const res = decideAction(state);
    expect(res.move).toBe("STAY");
    expect(res.action).toBe("COLLECT");
  });

  test("5. Prend un point 💎 s’il n’y a rien d’autre", () => {
    const state = {
      map: [
        [" ", " ", " ", " ", " "],
        [" ", " ", "💎", " ", " "],
        [" ", " ", "🤖", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "]
      ]
    };
    const res = decideAction(state);
    expect(res.action).toBe("COLLECT");
  });
});
