import TurndownService from "turndown";
import { devLog } from "./log";
import { name } from "../package.json";

export function htmlToMd(dom: HTMLElement) {
  const turndownService = new TurndownService();
  const md = turndownService.turndown(dom.innerHTML);
  devLog(`htmlToMd\n\n${md}`);

  return md;
}

export function clipboardWriteText(text: string) {
  return navigator.clipboard.writeText(text);
}

export function safeFilename(input: string) {
  const filename = input.replace(/[^\u4e00-\u9fa5a-zA-Z0-9 _\-'"？?]/g, "_");
  devLog(`md filename`, filename);
  return filename;
}

export function downloadMd(md: string, filename: string) {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safeFilename(filename);
  a.click();

  URL.revokeObjectURL(url);
}
