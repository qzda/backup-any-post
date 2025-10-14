import TurndownService from "turndown";
import { devLog } from "./log";

export function htmlToMd(dom: HTMLElement) {
  const turndownService = new TurndownService();
  const md = turndownService.turndown(dom.innerHTML);
  devLog(`htmlToMd\n\n${md}`);

  return md;
}

export function writeText(text: string) {
  return navigator.clipboard.writeText(text);
}
