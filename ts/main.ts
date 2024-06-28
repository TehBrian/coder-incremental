import * as Elements from "./elements.ts";
import * as View from "./view.ts";
import * as Game from "./game.ts";
import * as CodeArea from "./code-area.ts";
import * as Button from "./button.ts";
import * as GameLoop from "./game-loop.ts";

function onLoad() {
  Game.loadOrReset();

  setInterval(GameLoop.run, 1000);

  CodeArea.fetchSource();
  Elements.codeArea.addEventListener("keydown", CodeArea.onKey);
  setInterval(CodeArea.toggleCursor, 750);

  Elements.createProject.addEventListener("click", Button.createProject); // deno-fmt-ignore
  Elements.upgradeDeveloperSkillLevel.addEventListener("click", Button.upgradeDeveloperSkillLevel); // deno-fmt-ignore
  Elements.getDeveloperFriend.addEventListener("click", Button.getDeveloperFriend);
  Elements.upgradeFriends.addEventListener("click", Button.upgradeFriends);

  if (Game.data.projects >= 1) {
    View.showMain();
  } else {
    View.hideMain();
  }

  View.update();
  View.hideLoadingScreen();
}

onLoad();
