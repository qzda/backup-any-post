import { svgIcon } from "../../assets/svg";
import { name, displayName } from "../../package.json";
import { devLog } from "../../utils/log";
import { downloadMd, htmlToMd, writeText } from "../../utils/backup";

export default function zhihu(url: string) {
  const _url = new URL(url);

  function backup(e: PointerEvent) {
    const rochTextDom = (e.target as HTMLElement)
      .closest<HTMLDivElement>("div.Card.TopstoryItem")
      ?.querySelector<HTMLSpanElement>("span.RichText");

    if (rochTextDom) {
      const md = htmlToMd(rochTextDom);

      /// 获取 文章mata
      const title = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem-title meta[itemprop="name"]')
        ?.getAttribute("content");
      const questionUrl = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem-title meta[itemprop="url"]')
        ?.getAttribute("content");
      // <meta itemprop="url" content="https://www.zhihu.com/question/questionID/answer/answerID">
      const url = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem > meta[itemprop="url"]')
        ?.getAttribute("content");
      // 2025-10-11T13:21:31.000Z
      const dateCreated = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem > meta[itemprop="dateCreated"]')
        ?.getAttribute("content");
      // 2025-10-11T13:21:31.000Z
      const dateModified = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem > meta[itemprop="dateModified"]')
        ?.getAttribute("content");
      const upvoteCount = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem > meta[itemprop="upvoteCount"]')
        ?.getAttribute("content");
      const commentCount = rochTextDom
        .closest<HTMLDivElement>("div.Card.TopstoryItem")
        ?.querySelector('.ContentItem > meta[itemprop="commentCount"]')
        ?.getAttribute("content");

      const metaMd = [
        "---",
        title && `title: ${title}`,
        questionUrl && `questionUrl: ${questionUrl}`,
        dateCreated && `dateCreated: ${dateCreated}`,
        dateModified && `dateModified: ${dateModified}`,
        upvoteCount && `upvoteCount: ${upvoteCount}`,
        commentCount && `commentCount: ${commentCount}`,
        url && `url: ${url}`,
        "---\n\n",
      ];

      const _md = metaMd.filter((i) => Boolean(i)).join("\n") + md;

      devLog(`md\n\n${_md}`);

      downloadMd(_md, `backup-zhihu-${title || Date.now()}.md`);

      writeText(_md).then(() => {
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
        const content = post.querySelector<HTMLDivElement>(
          ".ContentItem-actions"
        );
        // '.RichContent:not(.is-collapsed)'
        if (content && !content.innerHTML.includes(`${name}--btn`)) {
          const btn = document.createElement("button");
          btn.className = `${name}--btn`;
          btn.style.display = "flex";
          btn.style.alignItems = "center";

          btn.innerHTML = `${svgIcon} ${displayName}`;

          btn.onclick = backup;
          content.appendChild(btn);
        }
      });
      break;

    default:
      break;
  }
}
