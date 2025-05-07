// ==UserScript==
// @name Backup Any Post
// @description 
// @author qzda
// @version 0.0.1
// @match https://www.zhihu.com/*
// @namespace https://github.com/qzda/backup-any-post/
// @supportURL https://github.com/qzda/backup-any-post/issues/new
// @downloadURL https://raw.githubusercontent.com/qzda/backup-any-post/main/dist/backup-any-post.user.js
// @updateURL https://raw.githubusercontent.com/qzda/backup-any-post/main/dist/backup-any-post.user.js
// @icon data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3C!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --%3E%3Cpath fill='currentColor' d='m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zm-7 3q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25z'/%3E%3C/svg%3E
// @copyright MIT
// @run-at document-start
// @connect raw.githubusercontent.com
// @connect github.com
// @grant unsafeWindow
// @grant window.onurlchange
// @grant GM_addStyle
// @grant GM_addElement
// @grant GM_registerMenuCommand
// ==/UserScript==

// ../node_modules/@qzda/prolog/dist/index.js
var Colors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97
};
var Backgrounds = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
};
var OtherStyles = {
  bold: 1,
  italic: 3,
  underline: 4
};
var Obj = Object.assign(Object.assign(Object.assign({}, Object.keys(Colors).reduce((_obj, color) => {
  _obj[color] = (str) => `\x1B[${Colors[color]}m${str}\x1B[0m`;
  return _obj;
}, {})), Object.keys(Backgrounds).reduce((_obj, bg) => {
  _obj[bg] = (str) => `\x1B[${Backgrounds[bg]}m${str}\x1B[0m`;
  return _obj;
}, {})), Object.keys(OtherStyles).reduce((_obj, style) => {
  _obj[style] = (str) => `\x1B[${OtherStyles[style]}m${str}\x1B[0m`;
  return _obj;
}, {}));
var dist_default = Obj;

// ../package.json
var name = "backup-any-post";
var version = "0.0.1";

// ../utils/dev.ts
var isDev = true;

// ../utils/log.ts
function log(...arg) {
  console.log(dist_default.bgBlack(dist_default.brightYellow(`${name} v${version}`)), ...arg);
}
function devLog(...arg) {
  if (isDev) {
    log(...arg);
  }
}

// initMenuCommand.ts
function initMenuCommand() {
  GM_registerMenuCommand("Menu1", function(event) {}, {
    autoClose: false
  });
  devLog("initMenuCommand");
}

// ../assets/svg.ts
var DownloadIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zm-7 3q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25z"/></svg>';

// zhihuScript.ts
function zhihuScript(url) {
  const _url = new URL(url);
  switch (_url.pathname) {
    case "/":
    case "/follow":
      const posts = document.querySelectorAll(".Card.TopstoryItem");
      posts.forEach((post) => {
        const content = post.querySelector(".ContentItem-actions");
        if (content && content?.innerHTML && !content.innerHTML.includes(DownloadIcon)) {
          const className = content.querySelector("button.ContentItem-action")?.className;
          const btn = `
            <button aria-live="polite" type="button" class="${className}" style="display: flex; align-items: center;">
              <span style="display: inline-flex; align-items: center; margin-right: 4px">
                ${DownloadIcon}
              </span>${name.split("-").map((i) => `${i[0].toUpperCase()}${i.slice(1)}`).join(" ")}
            </button>`;
          content.innerHTML = content.innerHTML += btn;
        }
      });
      break;
    default:
      break;
  }
}

// index.ts
log();
initMenuCommand();
function initScript(url) {
  devLog("url", url);
  if (url.startsWith("https://www.zhihu.com")) {
    zhihuScript(url);
  }
}
window.addEventListener("load", (event) => {
  devLog("window load");
  initScript(location.href);
  window.addEventListener("urlchange", (info) => {
    devLog("urlchange", info);
    const url = new URL(info.url);
    initScript(url.href);
  });
});
