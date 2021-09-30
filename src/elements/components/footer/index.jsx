import { define, WeElement, h } from 'omi'
import css from './_index.css'

define('yg-footer', class extends WeElement {
  css = css

  backupNumber = '陇ICP备16002668号'

  year = new Date().getFullYear()

  installed() {}

  render(props, data) {
    return (
      <div class="footer">
        <span>Copyright © {this.year} Youngon </span>
        <a
          href="http://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.backupNumber}
        </a>
      </div>
    )
  }
})
