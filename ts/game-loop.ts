import * as CodeArea from "./code-area.ts";
import * as Game from "./game.ts";
import * as View from "./view.ts";

export function calculateCodePerSecond(): number {
  return Math.floor(
    (Game.data.friendUpgrades + 1) ** 2 * Game.data.developerFriends,
  );
}

export function run(): void {
  if (calculateCodePerSecond() >= 1) {
    CodeArea.type(calculateCodePerSecond());
  }
  View.update();
  Game.save();
}
