import { devLog } from "../utils/log";

export function initMenuCommand() {
  // @ts-ignore
  GM_registerMenuCommand(
    "Menu1",
    function (event: MouseEvent | KeyboardEvent) {
      // todo
    },
    {
      autoClose: false,
    }
  );

  devLog("initMenuCommand");
}
