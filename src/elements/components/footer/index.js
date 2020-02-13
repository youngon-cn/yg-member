import { define, WeElement } from 'omi'

define('footer', class extends WeElement {
  css = require('./_index.css')

  backupNumber = '陇ICP备16002668号'

  installed() {}

  render(props, data) {
    return (
      <div class="footer">
        <span>Copyright © 2020 Youngon </span>
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
