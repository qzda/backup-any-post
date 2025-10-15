import { devLog, log } from "../utils/log";
// import { initMenuCommand } from "./initMenuCommand";
import zhihu from "./site/zhihu";

log();
// initMenuCommand();

function initScript(url: string) {
  devLog("url", url);

  if (url.startsWith("https://www.zhihu.com")) {
    zhihu(url);
  }
}

window.addEventListener("load", (event) => {
  devLog("window load");

  initScript(location.href);

  window.addEventListener("click", () => {
    devLog("window click");
    setTimeout(() => {
      initScript(location.href);
    }, 500);
  });

  window.addEventListener("urlchange", (info: any) => {
    devLog("urlchange", info);
    const url = new URL(info.url as string);
    initScript(url.href);
  });
});
