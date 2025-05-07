import { name, description, version } from "./package.json";

const icon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3C!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --%3E%3Cpath fill='currentColor' d='m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zm-7 3q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25z'/%3E%3C/svg%3E"
const userScriptUrl =
  "https://raw.githubusercontent.com/qzda/backup-any-post/main/dist/backup-any-post.user.js";

type configValue = string | number;

export const UserScriptConfig: Record<string, configValue | configValue[]> = {
  name: name.split('-').map(i => `${i[0].toUpperCase()}${i.slice(1)}`).join(' '),
  description,
  author: "qzda",
  version,
  match: [
    'https://www.zhihu.com/*',
  ],
  namespace: "https://github.com/qzda/backup-any-post/",
  supportURL: "https://github.com/qzda/backup-any-post/issues/new",
  downloadURL: userScriptUrl,
  updateURL: userScriptUrl,
  icon,
  copyright: "MIT",
  "run-at": "document-start",
  connect: ["raw.githubusercontent.com", "github.com"],
  grant: [
    "unsafeWindow",
    "window.onurlchange",
    "GM_addStyle",
    "GM_addElement",
    "GM_registerMenuCommand",
  ],
};
