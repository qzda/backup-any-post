import { DownloadIcon } from '../assets/svg'
import { name } from '../package.json'

export function zhihuScript(url: string) {
  const _url = new URL(url)

  switch (_url.pathname) {
    case '/':
    case '/follow':
      const posts = document.querySelectorAll('.Card.TopstoryItem')
      posts.forEach(post => {
        const content = post.querySelector('.ContentItem-actions')
        if (content && content?.innerHTML && !content.innerHTML.includes(DownloadIcon)) {
          const className = content.querySelector('button.ContentItem-action')?.className

          const btn = `
            <button aria-live="polite" type="button" class="${className}" style="display: flex; align-items: center;">
              <span style="display: inline-flex; align-items: center; margin-right: 4px">
                ${DownloadIcon}
              </span>${name.split('-').map(i => `${i[0].toUpperCase()}${i.slice(1)}`).join(' ')}
            </button>`

          content.innerHTML = content.innerHTML += btn
        }
      })
      break;

    default:
      break;
  }
}