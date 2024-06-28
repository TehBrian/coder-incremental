function id(id: string): HTMLElement {
  return document.getElementById(id)!;
}

export const loadingScreen = id("loading-screen");

export const createProject = <HTMLButtonElement> id("create-project");
export const createProjectText = id("create-project-text");

export const codeArea = id("code-area");
export const code = id("code");
export const cursor = id("cursor");

export const statsHeader = id("stats-header");
export const linesOfCode = id("lines-of-code");
export const projects = id("projects");
export const friendProduction = id("friend-production");

export const upgradeHeader = id("upgrades-header"); // deno-fmt-ignore
export const upgradeDeveloperSkillLevel = <HTMLButtonElement> id("upgrade-developer-skill-level"); // deno-fmt-ignore
export const getDeveloperFriend = <HTMLButtonElement> id("get-developer-friend");
export const upgradeFriends = <HTMLButtonElement> id("upgrade-friends");
