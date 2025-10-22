import { svgIcon } from "../../assets/svg";
import { name, displayName } from "../../package.json";
import { devLog, devLogError } from "../../utils/log";
import { downloadMd, htmlToMd, clipboardWriteText } from "../../utils/backup";

export default function zhihu(url: string) {
  devLog("zhihu");
  const _url = new URL(url);

  function backup(e: PointerEvent) {
    const rochTextDom = (e.target as HTMLElement)
      .closest<HTMLDivElement>("div.Card.TopstoryItem")
      ?.querySelector<HTMLSpanElement>("span.RichText");

    if (rochTextDom) {
      const md = htmlToMd(rochTextDom);

      const postDom = rochTextDom.closest<HTMLDivElement>(
        "div.Card.TopstoryItem"
      );
      const meta: [string, string | undefined | null][] = [];
      /// 获取 文章mata
      if (postDom) {
        meta.push([
          "title",
          postDom.querySelector(
            ".ContentItem-title [data-za-detail-view-element_name]"
          )?.textContent,
        ]);

        postDom
          .querySelectorAll<HTMLMetaElement>(".ContentItem > meta[itemprop]")
          .forEach((m) => {
            const name = m.getAttribute("itemprop");

            if (name) {
              meta.push([name, m.getAttribute("content")]);
            }
          });
      }

      const metaMd = [
        "---",
        ...meta.map(([key, value]) => `${key}: ${value}`),
        "---\n\n",
      ];

      const _md = metaMd.filter((i) => Boolean(i)).join("\n") + md;
      devLog(`md\n\n${_md}`);
      downloadMd(_md, String(meta[0][1] || Date.now()));
      clipboardWriteText(_md).then(() => {
        alert(`${displayName} \n\n✅复制节点成功`);
      });
    } else {
      devLog("e.target", e.target);
      alert(`${displayName} \n\n❌获取节点失败`);
    }
  }

  switch (_url.pathname) {
    case "/":
    case "/follow":
      const posts = document.querySelectorAll(
        ".RichContent:not(.is-collapsed)"
      );
      posts.forEach((post) => {
        const btnContainer = post.querySelector<HTMLDivElement>(
          ".ContentItem-actions"
        );
        // '.RichContent:not(.is-collapsed)'
        if (btnContainer) {
          if (!btnContainer.innerHTML.includes(`${name}--btn`)) {
            const btn = document.createElement("button");
            btn.className = `${name}--btn`;
            btn.style.display = "flex";
            btn.style.alignItems = "center";

            btn.innerHTML = `${svgIcon} ${displayName}`;

            btn.onclick = backup;
            btnContainer.appendChild(btn);
          }
        } else {
          devLogError("添加按钮失败");
        }
      });
      break;

    default:
      break;
  }
}
