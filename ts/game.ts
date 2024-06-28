import * as CodeArea from "./code-area.ts";
import * as View from "./view.ts";

export class GameData {
  linesOfCode: number;
  projects: number;
  developerSkillLevel: number;
  developerFriends: number;
  friendUpgrades: number;

  constructor(
    linesOfCode: number,
    projects: number,
    developerSkillLevel: number,
    developerFriends: number,
    friendUpgrades: number,
  ) {
    this.linesOfCode = linesOfCode;
    this.projects = projects;
    this.developerSkillLevel = developerSkillLevel;
    this.developerFriends = developerFriends;
    this.friendUpgrades = friendUpgrades;
  }
}

export let data: GameData;
const itemName = "coding-incremental-save";

/**
 * Sets the game back to the its starting point.
 */
export function reset(): void {
  localStorage.removeItem(itemName);
  data = new GameData(0, 0, 0, 0, 0);
  save();

  CodeArea.reset();
  View.hideMain();
  View.update();

  console.log("Started up a new game!");
}

/**
 * Saves the GameData to local storage.
 */
export function save(): void {
  localStorage.setItem(itemName, JSON.stringify(data));
  console.log("Saved GameData to local storage.");
}

/**
 * Loads the GameData from local storage.
 * @returns whether there was an available save
 */
export function load(): boolean {
  const json = JSON.parse(localStorage.getItem(itemName)!);
  if (json !== null) {
    const gameSave = new GameData(
      json.linesOfCode,
      json.projects,
      json.developerSkillLevel,
      json.developerFriends,
      json.friendUpgrades,
    );

    data = gameSave;
    console.log("Successfully loaded GameData from local storage.");
    return true;
  } else {
    console.log("Found no GameData in local storage.");
    return false;
  }
}

/**
 * Tries to load the GameData from local storage, but if unavailable, resets the GameData to default state.
 */
export function loadOrReset(): void {
  if (!load()) {
    reset();
  }
}
