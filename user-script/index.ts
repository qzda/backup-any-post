import { devLog, log } from "../utils/log";
// import { initMenuCommand } from "./initMenuCommand";
import zhihu from "./site/zhihu";

log();
// initMenuCommand();

function initScript(url: string) {
  if (url.startsWith("https://www.zhihu.com")) {
    zhihu(url);
  }
}

window.addEventListener("load", (event) => {
  devLog("window load");

  initScript(location.href);

  window.addEventListener("click", () => {
    setTimeout(() => {
      initScript(location.href);
    }, 300);
  });

  let scrollFlag = true;
  window.addEventListener("scroll", () => {
    if (scrollFlag) {
      scrollFlag = false;
      setTimeout(() => {
        initScript(location.href);
        scrollFlag = true;
      }, 500);
    }
  });
});
