import { define, WeElement, h } from 'omi'
import css from './_index.css'

define('yg-navbar', class extends WeElement {
  css = css

  showNavBar = false
  needMove = false
  navBarOpenId = ['openNavMenu', 'navbar']

  installed() {
    window.addEventListener('scroll', () => {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      this.needMove = top >= 100
      this.update()
    })
  }

  openNavBar = () => {
    this.showNavBar = true
    this.update()
  }

  closeNavBar = () => {
    this.showNavBar = false
    this.update()
  }

  gotoHere = grade => {
    const shadowRoot = document
      .querySelector('my-app')
      .shadowRoot.querySelector('members-card').shadowRoot
    const { offsetTop = 0 } = shadowRoot.querySelector(`#grade-${grade}`) || {}
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  render(props, data) {
    const { start = 1998, end = new Date().getFullYear() } = props || {}
    const grade = []
    for (let i = start; i <= end; i++) {
      grade.unshift(i)
    }
    return (
      <div class="wrap">
        <svg
          t="1581490526564"
          class={this.needMove ? 'icon menu move-fix' : 'icon menu'}
          id="openNavMenu"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1865"
          width="20"
          height="20"
          onClick={this.openNavBar}
        >
          <path
            d="M106.496 555.008c-33.792 0-63.488 29.696-63.488 64.512 0 33.792 29.696 64.512 63.488 64.512s64.512-33.792 64.512-68.608C171.008 580.608 145.408 555.008 106.496 555.008zM106.496 346.112c-33.792 0-63.488 29.696-63.488 64.512 0 33.792 29.696 64.512 63.488 64.512s64.512-29.696 64.512-64.512C171.008 375.808 145.408 346.112 106.496 346.112zM273.408 222.208l665.6 0c12.288 0 21.504-8.192 21.504-21.504 0-13.312-8.192-21.504-21.504-21.504l-665.6 0c-8.192 0-17.408 8.192-17.408 21.504C256 208.896 264.192 222.208 273.408 222.208zM106.496 763.904c-33.792 0-63.488 29.696-63.488 64.512s29.696 64.512 63.488 64.512 64.512-33.792 64.512-68.608S145.408 763.904 106.496 763.904zM943.104 801.792 273.408 801.792c-13.312 0-21.504 8.192-21.504 21.504 0 12.288 8.192 21.504 21.504 21.504l665.6 0c12.288 0 21.504-8.192 21.504-21.504C964.608 815.104 951.296 801.792 943.104 801.792zM943.104 388.096 273.408 388.096c-8.192 0-17.408 8.192-17.408 21.504 0 8.192 8.192 17.408 17.408 17.408l665.6 0c12.288 0 21.504-8.192 21.504-21.504C964.608 397.312 951.296 388.096 943.104 388.096zM943.104 596.992 273.408 596.992c-8.192 0-17.408 8.192-17.408 17.408 0 13.312 8.192 21.504 21.504 21.504l665.6 0c13.312 0 21.504-8.192 21.504-21.504C964.608 606.208 951.296 596.992 943.104 596.992zM106.496 136.192c-33.792 0-63.488 29.696-63.488 63.488s29.696 64.512 63.488 64.512 64.512-29.696 64.512-64.512S145.408 136.192 106.496 136.192z"
            p-id="1866"
            fill="#000000"
          />
        </svg>
        <div
          class={this.showNavBar ? 'navbar navbar-show' : 'navbar'}
          id="navbar"
        >
          {grade.map(e => (
            <span onClick={() => this.gotoHere(e)}>{e}级</span>
          ))}
        </div>
        {this.showNavBar ? (
          <div class="mask" onClick={this.closeNavBar}></div>
        ) : (
          ''
        )}
      </div>
    )
  }
})
