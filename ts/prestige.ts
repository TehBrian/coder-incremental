import * as CodeArea from "./code-area.ts";
import * as Game from "./game.ts";

export function createProject(): void {
  if (canCreateProject()) {
    Game.data.linesOfCode = 0;
    Game.data.developerFriends = 0;
    Game.data.developerSkillLevel = 0;
    Game.data.friendUpgrades = 0;
    Game.data.projects += 1;
    CodeArea.reset();
  }
}

export function canCreateProject(): boolean {
  if (Game.data.projects === 0) {
    return true;
  }
  return Game.data.linesOfCode >= calculateRequirement();
}

export function calculateRequirement(): number {
  return 2000 + Math.floor(Game.data.projects ** 1.7);
}
