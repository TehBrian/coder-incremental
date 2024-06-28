import * as Elements from "./elements.ts";
import * as Game from "./game.ts";
import * as View from "./view.ts";

/**
 * The code that will be typed out into the code area.
 */
let source: string;
/**
 * The current index in the source. Everything before this index has already
 * been typed out into the code area.
 */
let index = 0;
/**
 * The last key that the player pressed. This is recorded so that players must
 * mash at least two keys. (Mashing one key is no fun.)
 */
let lastKey: string;

/**
 * Web links to source code that could be typed into the code area.
 */
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

export function onKey(event: KeyboardEvent): void {
  if (lastKey !== event.key) {
    lastKey = event.key;
    type(Game.data.developerSkillLevel + 1);
  }
}

/**
 * Types the text from the source into the code area.
 * @param speed how many characters will be typed
 */
export function type(speed: number): void {
  const newCode = source
    .substring(index, index + speed)
    // taken from hackertyper.net. credit for this magical little replace goes to its creator. <3
    .replace(/[\u00A0-\u9999<>\&]/gim, (a) => "&#" + a.charCodeAt(0) + ";");

  // get new source if the string is empty.
  if (!newCode) {
    fetchSource();
    reset();
    return;
  }

  // check if there are new lines in the typed code.
  const newLines = countNewLines(newCode);
  if (newLines >= 1) {
    // if there are, add the number of new lines to the game data.
    Game.data.linesOfCode += newLines;
    View.update();
  }

  // add new code to code area.
  Elements.code.innerHTML += newCode;
  index += speed;

  // scroll the code area down to latest code.
  Elements.codeArea.scrollTop = Elements.codeArea.scrollHeight;
}

export function fetchSource(): void {
  fetch(randomFromArray(sourceLinks))
    .then((newSource) => newSource.text())
    .then((newSource) => {
      newSource = stripC(newSource);
      // run common after C to normalize newline amounts.
      newSource = stripCommon(newSource);
      source = newSource;
    });
}

/**
 * Strips common C things in code.
 * @param code the code to strip
 */
function stripC(code: string): string {
  // remove full-line comments.
  code = code.replaceAll(/^(\/\/| \*|\/\*).*\n/gim, "");
  // remove include lines.
  code = code.replaceAll(/^(#include).*\n/gim, "");
  return code;
}

/**
 * Strips common code things.
 * @param code the code to strip
 */
function stripCommon(code: string): string {
  // remove awful \r and \r\n.
  code = code.replaceAll(/(\r|\r\n)/gim, "");
  // remove empty newlines at start.
  code = code.replaceAll(/\n{3,}/gim, "\n\n");
  // replace triple or more newlines with just two newlines.
  code = code.replaceAll(/^\n*/gi, "");
  return code;
}

/**
 * @param array the array
 * @returns a random element from the array
 */
function randomFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Reset the code area.
 */
export function reset(): void {
  index = 0;
  Elements.code.innerHTML = "";
}

/**
 * @param str the string
 * @returns the number of new lines in the string
 */
function countNewLines(str: string): number {
  const regex = /\n/g;
  // if the match is undefined then 0.
  return str.match(regex)?.length || 0;
}

/**
 * Toggle the code area's cursor visibility.
 */
export function toggleCursor(): void {
  Elements.cursor.style.color = "transparent" === Elements.cursor.style.color
    ? "inherit"
    : "transparent";
}
