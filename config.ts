import { base64Icon } from "./assets/svg";
import { displayName, description, version } from "./package.json";

const userScriptUrl =
  "https://raw.githubusercontent.com/qzda/backup-any-post/main/dist/backup-any-post.user.js";

type configValue = string | number;

export const userScriptConfig: Record<string, configValue | configValue[]> = {
  name: displayName,
  description,
  author: "qzda",
  version,
  match: ["*://*/*"],
  namespace: "https://github.com/qzda/backup-any-post/",
  supportURL: "https://github.com/qzda/backup-any-post/issues/new",
  downloadURL: userScriptUrl,
  updateURL: userScriptUrl,
  icon: base64Icon,
  copyright: "MIT",
  "run-at": "document-start",
  connect: ["raw.githubusercontent.com", "github.com"],
  grant: [
    "unsafeWindow",
    "window.onurlchange",
    "GM_addElement",
    "GM_registerMenuCommand",
  ],
};
