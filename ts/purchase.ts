import * as Game from "./game.ts";

abstract class AbstractPurchase {
  abstract calculateCost(): number;

  abstract purchase(): void;

  abstract canPurchase(): void;
}

class UpgradeDeveloperSkillLevel extends AbstractPurchase {
  calculateCost(): number {
    return 10 + Math.floor(Game.data.developerSkillLevel ** 1.4);
  }
  purchase(): void {
    if (this.canPurchase()) {
      Game.data.linesOfCode -= this.calculateCost();
      Game.data.developerSkillLevel++;
    }
  }
  canPurchase(): boolean {
    return Game.data.linesOfCode >= this.calculateCost();
  }
}

class GetDeveloperFriend extends AbstractPurchase {
  calculateCost(): number {
    return 80 + Math.floor(Game.data.developerFriends ** 1.6);
  }
  purchase(): void {
    if (this.canPurchase()) {
      Game.data.linesOfCode -= this.calculateCost();
      Game.data.developerFriends++;
    }
  }
  canPurchase(): boolean {
    return Game.data.linesOfCode >= this.calculateCost();
  }
}

class UpgradeFriends extends AbstractPurchase {
  calculateCost(): number {
    return 160 + Math.floor(Game.data.friendUpgrades ** 1.8);
  }
  purchase(): void {
    if (this.canPurchase()) {
      Game.data.linesOfCode -= this.calculateCost();
      Game.data.friendUpgrades++;
    }
  }
  canPurchase(): boolean {
    return Game.data.linesOfCode >= this.calculateCost();
  }
}
// deno-fmt-ignore
export const upgradeDeveloperSkillLevel: UpgradeDeveloperSkillLevel = new UpgradeDeveloperSkillLevel();
export const getDeveloperFriend: GetDeveloperFriend = new GetDeveloperFriend();
export const upgradeFriends: UpgradeFriends = new UpgradeFriends();
