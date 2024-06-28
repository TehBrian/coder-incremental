import * as Game from "./game.ts";
import * as Prestige from "./prestige.ts";
import * as Purchase from "./purchase.ts";
import * as View from "./view.ts";

export function createProject() {
  if (Game.data.projects === 0) {
    View.showMain();
  }
  Prestige.createProject();
  View.update();
}

export function upgradeDeveloperSkillLevel() {
  Purchase.upgradeDeveloperSkillLevel.purchase();
  View.update();
}

export function getDeveloperFriend() {
  Purchase.getDeveloperFriend.purchase();
  View.update();
}

export function upgradeFriends() {
  Purchase.upgradeFriends.purchase();
  View.update();
}
