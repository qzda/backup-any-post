import { devLog, log } from "../utils/log";
// import { initMenuCommand } from "./initMenuCommand";
import { zhihuScript } from "./zhihuScript";

log();
// initMenuCommand();

function initScript(url: string) {
  devLog('url', url)

  if (url.startsWith('https://www.zhihu.com')) {
    zhihuScript(url)
  }
}

window.addEventListener("load", (event) => {
  devLog("window load");

  initScript(location.href)

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);
    initScript(url.href)
  });
});
