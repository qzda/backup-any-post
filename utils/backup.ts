import TurndownService from "turndown";
import { devLog } from "./log";
import { name } from "../package.json";

export function htmlToMd(dom: HTMLElement) {
  const turndownService = new TurndownService();
  const md = turndownService.turndown(dom.innerHTML);
  devLog(`htmlToMd\n\n${md}`);

  return md;
}

export function writeText(text: string) {
  return navigator.clipboard.writeText(text);
}

export function downloadMd(md: string, filename = `${name}--${Date.now()}`) {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
