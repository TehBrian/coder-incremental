// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function id(id) {
    return document.getElementById(id);
}
const loadingScreen = id("loading-screen");
const createProject = id("create-project");
const createProjectText = id("create-project-text");
const codeArea = id("code-area");
const code = id("code");
const cursor = id("cursor");
const statsHeader = id("stats-header");
const linesOfCode = id("lines-of-code");
const projects = id("projects");
const friendProduction = id("friend-production");
const upgradeHeader = id("upgrades-header");
const upgradeDeveloperSkillLevel = id("upgrade-developer-skill-level");
const getDeveloperFriend = id("get-developer-friend");
const upgradeFriends = id("upgrade-friends");
class GameData {
    linesOfCode;
    projects;
    developerSkillLevel;
    developerFriends;
    friendUpgrades;
    constructor(linesOfCode, projects, developerSkillLevel, developerFriends, friendUpgrades){
        this.linesOfCode = linesOfCode;
        this.projects = projects;
        this.developerSkillLevel = developerSkillLevel;
        this.developerFriends = developerFriends;
        this.friendUpgrades = friendUpgrades;
    }
}
let data;
let source;
let index = 0;
let lastKey;
const sourceLinks = [
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/watch_queue.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/watchdog.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/static_call.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/stop_machine.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/sys.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/pid.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/range.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/padata.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/notifier.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/module_signature.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/audit_watch.c",
    "https://raw.githubusercontent.com/torvalds/linux/master/kernel/acct.c", 
];
function reset() {
    index = 0;
    code.innerHTML = "";
}
function createProject1() {
    if (canCreateProject()) {
        data.linesOfCode = 0;
        data.developerFriends = 0;
        data.developerSkillLevel = 0;
        data.friendUpgrades = 0;
        data.projects += 1;
        reset();
    }
}
class AbstractPurchase {
}
class UpgradeDeveloperSkillLevel extends AbstractPurchase {
    calculateCost() {
        return 10 + Math.floor(data.developerSkillLevel ** 1.4);
    }
    purchase() {
        if (this.canPurchase()) {
            data.linesOfCode -= this.calculateCost();
            data.developerSkillLevel++;
        }
    }
    canPurchase() {
        return data.linesOfCode >= this.calculateCost();
    }
}
class GetDeveloperFriend extends AbstractPurchase {
    calculateCost() {
        return 80 + Math.floor(data.developerFriends ** 1.6);
    }
    purchase() {
        if (this.canPurchase()) {
            data.linesOfCode -= this.calculateCost();
            data.developerFriends++;
        }
    }
    canPurchase() {
        return data.linesOfCode >= this.calculateCost();
    }
}
class UpgradeFriends extends AbstractPurchase {
    calculateCost() {
        return 160 + Math.floor(data.friendUpgrades ** 1.8);
    }
    purchase() {
        if (this.canPurchase()) {
            data.linesOfCode -= this.calculateCost();
            data.friendUpgrades++;
        }
    }
    canPurchase() {
        return data.linesOfCode >= this.calculateCost();
    }
}
function update() {
    createProject.disabled = !canCreateProject();
    createProjectText.innerHTML = `
  After ${calculateRequirement()} lines of code, you can reasonably call this project finished and begin anew.
  `;
    linesOfCode.innerHTML = `
  ${data.linesOfCode} line${data.linesOfCode == 0 ? "" : "s"} of code written.
  `;
    projects.innerHTML = `
  ${data.projects} project${data.projects == 0 ? "" : "s"} created.
  `;
    friendProduction.innerHTML = `
  Your developer friends are currently mashing their keyboard ${calculateCodePerSecond()}x per second.
  `;
    upgradeDeveloperSkillLevel.innerHTML = `
  Upgrade Developer Skill Level<br>(Currently Level ${data.developerSkillLevel})<br>Cost: ${upgradeDeveloperSkillLevel1.calculateCost()} LoC
  `;
    getDeveloperFriend.innerHTML = `
  Get Developer Friend<br>(Currently Have ${data.developerFriends})<br>Cost: ${getDeveloperFriend1.calculateCost()} LoC
  `;
    upgradeFriends.innerHTML = `
  Upgrade Friends<br>(Currently Level ${data.friendUpgrades})<br>Cost: ${upgradeFriends1.calculateCost()} LoC
  `;
    upgradeDeveloperSkillLevel.disabled = !upgradeDeveloperSkillLevel1.canPurchase();
    getDeveloperFriend.disabled = !getDeveloperFriend1.canPurchase();
    upgradeFriends.disabled = !upgradeFriends1.canPurchase();
}
const mainElements = [
    createProjectText,
    code,
    codeArea,
    statsHeader,
    linesOfCode,
    projects,
    friendProduction,
    upgradeHeader,
    upgradeDeveloperSkillLevel,
    getDeveloperFriend,
    upgradeFriends, 
];
function show(elements) {
    for (const element of elements){
        element.style.visibility = "visible";
    }
}
function hide(elements) {
    for (const element of elements){
        element.style.visibility = "hidden";
    }
}
function showMain() {
    show(mainElements);
}
function hideMain() {
    hide(mainElements);
}
const itemName = "coding-incremental-save";
function reset1() {
    localStorage.removeItem(itemName);
    data = new GameData(0, 0, 0, 0, 0);
    save();
    reset();
    hideMain();
    update();
    console.log("Started up a new game!");
}
function onKey(event) {
    if (lastKey !== event.key) {
        lastKey = event.key;
        type(data.developerSkillLevel + 1);
    }
}
function type(speed) {
    const newCode = source.substring(index, index + speed).replace(/[\u00A0-\u9999<>\&]/gim, (a)=>"&#" + a.charCodeAt(0) + ";");
    if (!newCode) {
        fetchSource();
        reset();
        return;
    }
    const newLines = countNewLines(newCode);
    if (newLines >= 1) {
        data.linesOfCode += newLines;
        update();
    }
    code.innerHTML += newCode;
    index += speed;
    codeArea.scrollTop = codeArea.scrollHeight;
}
function fetchSource() {
    fetch(randomFromArray(sourceLinks)).then((newSource)=>newSource.text()).then((newSource)=>{
        newSource = stripC(newSource);
        newSource = stripCommon(newSource);
        source = newSource;
    });
}
function stripC(code) {
    code = code.replaceAll(/^(\/\/| \*|\/\*).*\n/gim, "");
    code = code.replaceAll(/^(#include).*\n/gim, "");
    return code;
}
function stripCommon(code) {
    code = code.replaceAll(/(\r|\r\n)/gim, "");
    code = code.replaceAll(/\n{3,}/gim, "\n\n");
    code = code.replaceAll(/^\n*/gi, "");
    return code;
}
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function calculateCodePerSecond() {
    return Math.floor((data.friendUpgrades + 1) ** 2 * data.developerFriends);
}
function hideLoadingScreen() {
    loadingScreen.style.visibility = "hidden";
}
function save() {
    localStorage.setItem(itemName, JSON.stringify(data));
    console.log("Saved GameData to local storage.");
}
function run() {
    if (calculateCodePerSecond() >= 1) {
        type(calculateCodePerSecond());
    }
    update();
    save();
}
function countNewLines(str) {
    const regex = /\n/g;
    return str.match(regex)?.length || 0;
}
function toggleCursor() {
    cursor.style.color = "transparent" === cursor.style.color ? "inherit" : "transparent";
}
function load() {
    const json = JSON.parse(localStorage.getItem(itemName));
    if (json !== null) {
        const gameSave = new GameData(json.linesOfCode, json.projects, json.developerSkillLevel, json.developerFriends, json.friendUpgrades);
        data = gameSave;
        console.log("Successfully loaded GameData from local storage.");
        return true;
    } else {
        console.log("Found no GameData in local storage.");
        return false;
    }
}
function loadOrReset() {
    if (!load()) {
        reset1();
    }
}
function canCreateProject() {
    if (data.projects === 0) {
        return true;
    }
    return data.linesOfCode >= calculateRequirement();
}
function calculateRequirement() {
    return 2000 + Math.floor(data.projects ** 1.7);
}
const upgradeDeveloperSkillLevel1 = new UpgradeDeveloperSkillLevel();
const getDeveloperFriend1 = new GetDeveloperFriend();
const upgradeFriends1 = new UpgradeFriends();
function createProject2() {
    if (data.projects === 0) {
        showMain();
    }
    createProject1();
    update();
}
function upgradeDeveloperSkillLevel2() {
    upgradeDeveloperSkillLevel1.purchase();
    update();
}
function getDeveloperFriend2() {
    getDeveloperFriend1.purchase();
    update();
}
function upgradeFriends2() {
    upgradeFriends1.purchase();
    update();
}
function onLoad() {
    loadOrReset();
    setInterval(run, 1000);
    fetchSource();
    codeArea.addEventListener("keydown", onKey);
    setInterval(toggleCursor, 750);
    createProject.addEventListener("click", createProject2);
    upgradeDeveloperSkillLevel.addEventListener("click", upgradeDeveloperSkillLevel2);
    getDeveloperFriend.addEventListener("click", getDeveloperFriend2);
    upgradeFriends.addEventListener("click", upgradeFriends2);
    if (data.projects >= 1) {
        showMain();
    } else {
        hideMain();
    }
    update();
    hideLoadingScreen();
}
onLoad();
