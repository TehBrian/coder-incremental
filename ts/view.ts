import * as Elements from "./elements.ts";
import * as GameLoop from "./game-loop.ts";
import * as Game from "./game.ts";
import * as Prestige from "./prestige.ts";
import * as Purchase from "./purchase.ts";

/**
 * Updates the view.
 */
export function update() {
  Elements.createProject.disabled = !Prestige.canCreateProject();
  Elements.createProjectText.innerHTML = `
  After ${Prestige.calculateRequirement()} lines of code, you can reasonably call this project finished and begin anew.
  `; //deno-fmt-ignore

  Elements.linesOfCode.innerHTML = `
  ${Game.data.linesOfCode} line${Game.data.linesOfCode == 0 ? "" : "s"} of code written.
  `;
  Elements.projects.innerHTML = `
  ${Game.data.projects} project${Game.data.projects == 0 ? "" : "s"} created.
  `;
  Elements.friendProduction.innerHTML = `
  Your developer friends are currently mashing their keyboard ${GameLoop.calculateCodePerSecond()}x per second.
  `;

  Elements.upgradeDeveloperSkillLevel.innerHTML = `
  Upgrade Developer Skill Level<br>(Currently Level ${Game.data.developerSkillLevel})<br>Cost: ${Purchase.upgradeDeveloperSkillLevel.calculateCost()} LoC
  `;
  Elements.getDeveloperFriend.innerHTML = `
  Get Developer Friend<br>(Currently Have ${Game.data.developerFriends})<br>Cost: ${Purchase.getDeveloperFriend.calculateCost()} LoC
  `;
  Elements.upgradeFriends.innerHTML = `
  Upgrade Friends<br>(Currently Level ${Game.data.friendUpgrades})<br>Cost: ${Purchase.upgradeFriends.calculateCost()} LoC
  `; //deno-fmt-ignore

  Elements.upgradeDeveloperSkillLevel.disabled = !Purchase.upgradeDeveloperSkillLevel.canPurchase(); //deno-fmt-ignore
  Elements.getDeveloperFriend.disabled = !Purchase.getDeveloperFriend.canPurchase();
  Elements.upgradeFriends.disabled = !Purchase.upgradeFriends.canPurchase();
}

/**
 * The main game elements that should be immediately shown.
 */
const mainElements = [
  Elements.createProjectText,
  Elements.code,
  Elements.codeArea,
  Elements.statsHeader,
  Elements.linesOfCode,
  Elements.projects,
  Elements.friendProduction,
  Elements.upgradeHeader,
  Elements.upgradeDeveloperSkillLevel,
  Elements.getDeveloperFriend,
  Elements.upgradeFriends,
];

/**
 * Show an array of elements.
 * @param elements the array of elements
 */
function show(elements: HTMLElement[]) {
  for (const element of elements) {
    element.style.visibility = "visible";
  }
}

/**
 * Hide an array of elements.
 * @param elements the array of elements
 */
function hide(elements: HTMLElement[]) {
  for (const element of elements) {
    element.style.visibility = "hidden";
  }
}

/**
 * Show the main game elements.
 */
export function showMain() {
  show(mainElements);
}

/**
 * Hide the main game elements.
 */
export function hideMain() {
  hide(mainElements);
}

export function showLoadingScreen() {
  Elements.loadingScreen.style.visibility = "visible";
}

export function hideLoadingScreen() {
  Elements.loadingScreen.style.visibility = "hidden";
}
