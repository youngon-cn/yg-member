import { define, WeElement } from 'omi'
import { checkLogin, gotoLogin, getUtype } from '../../utils/tools'
import { common } from '../../store/config'
import Logout from './logout'

define('yg-admin', class extends WeElement {
  css = require('./_index.css')
  user = {}
  isLogin = false
  install() {
    checkLogin().then(rs => {
      if (rs) {
        this.user = rs
        this.isLogin = true
        this.update()
      }
    })
  }

  toLogin = () => {
    gotoLogin()
  }

  enter = () => {
    window.location.href = '/card.html'
  }

  logout = () => {
    this.user = null
    this.isLogin = false
    this.update()
    window.location.href = document.URL.includes('?')
      ? document.URL.split('?')[0]
      : document.URL
  }

  toLoginHtml() {
    return (
      <div title="去登录">
        <svg
          class="icon"
          style="width: 3em; height: 3em;color: #465666;vertical-align: middle;fill: currentColor;overflow: hidden;margin: 0 10px;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1564"
          onClick={this.toLogin}
        >
          <path
            d="M508.341333 640.32l97.834667-97.834667a42.666667 42.666667 0 0 0 0-60.341333l-97.834667-97.824a32 32 0 0 0-45.248 0c-12.490667 12.490667-12.490667 31.424 0 43.914667l53.408 52.085333H117.333333a32 32 0 1 0 0 64h393.845334l-48.085334 49.418667c-12.490667 12.501333-12.490667 33.418667 0 45.92 12.48 12.501333 32.757333 13.152 45.248 0.661333zM245.333333 341.333333a32 32 0 0 0 32-32V192a42.666667 42.666667 0 0 1 42.666667-42.666667h512a42.666667 42.666667 0 0 1 42.666667 42.666667v640a42.666667 42.666667 0 0 1-42.666667 42.666667H320a42.666667 42.666667 0 0 1-42.666667-42.666667V714.666667a32 32 0 1 0-64 0v138.666666a85.333333 85.333333 0 0 0 85.333334 85.333334h554.666666a85.333333 85.333333 0 0 0 85.333334-85.333334V170.666667a85.333333 85.333333 0 0 0-85.333334-85.333334H298.666667a85.333333 85.333333 0 0 0-85.333334 85.333334v138.666666a32 32 0 0 0 32 32z"
            p-id="1565"
          />
        </svg>
      </div>
    )
  }

  toEnterAdmin() {
    return (
      <div title="进入管理">
        <svg
          class="icon"
          style="width: 3em; height: 3em;color: #007acc;vertical-align: middle;fill: currentColor;overflow: hidden;margin: 0 10px;"
          viewBox="0 0 1092 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2014"
          onClick={this.enter}
        >
          <path
            d="M1092.458509 111.402462l-0.179717-1.696085c-0.078626-0.741335-0.19095-1.48267-0.280809-2.24647V95.86812A95.980444 95.980444 0 0 0 996.129863 0H495.762299a95.980444 95.980444 0 0 0-95.86812 95.86812v170.574491a31.843717 31.843717 0 0 0 63.687433 0V95.86812a32.225617 32.225617 0 0 1 32.180687-32.191919h397.243344l-182.053953 92.599506c-23.138644 8.042364-40.88576 17.971762-54.184864 30.259955-17.870671 16.522789-27.687747 37.06676-29.204114 61.193851l-0.067394 0.988447v558.247871H495.762299a32.214384 32.214384 0 0 1-32.180687-32.135758V607.906097a31.843717 31.843717 0 0 0-63.687433 0v166.923976a95.980444 95.980444 0 0 0 95.86812 95.86812h131.755484v58.307137l0.134788 1.460206c3.01027 32.573819 16.174586 59.598857 37.06676 76.18904a79.592443 79.592443 0 0 0 50.253541 17.342751 91.554897 91.554897 0 0 0 12.759951-0.898588l4.998396-0.685174L1007.317285 889.029391c29.428761-10.580875 69.078962-31.079917 82.557783-85.770236l0.932286-3.740374v-16.354303a31.967272 31.967272 0 0 0 1.123235-8.345638V308.148332l0.460526-195.049785z m-108.010292 718.174092l-1.729782 0.606547-267.846655 130.11556a16.309374 16.309374 0 0 1-10.55841-3.549423c-6.739411-5.335367-11.591787-16.848527-13.108154-30.799108V250.728551c0.527921-7.435817 3.01027-21.611044 42.357197-34.887684l2.246471-0.741335L997.376654 82.041096c16.09596 3.96502 27.80007 15.365857 30.945128 30.38351v195.74619l-1.123235 483.170834c-5.672338 19.061301-17.275357 29.293973-42.75033 38.234924zM494.987267 436.904777a31.686464 31.686464 0 0 0-0.887356-7.424584 31.675231 31.675231 0 0 0-9.289155-20.982033L313.809437 237.485608a31.843717 31.843717 0 1 0-45.019265 45.030498l122.544955 122.544955h-359.435249a31.843717 31.843717 0 1 0 0 63.687433h352.280241L265.869761 587.04762a31.843717 31.843717 0 0 0 45.030497 45.030497l166.912743-166.923976a31.821252 31.821252 0 0 0 17.174266-28.249364z"
            p-id="2015"
          />
        </svg>
      </div>
    )
  }

  render() {
    return (
      <div class="hello" flex justify-content-center align-items-center>
        <div class="card" flex align-items-center justify-content-space-between>
          <div flex align-items-center>
            <img
              avatar
              src={
                this.isLogin
                  ? this.user.head
                    ? this.user.fullhead
                    : common.default_head
                  : common.default_head
              }
            />
            <div flex flex-column justify-content-center>
              <h4 name>{this.isLogin ? this.user.name : '未登录用户'}</h4>
              <div class="otherinfo" flex flex-column justify-content-center>
                <span>{this.isLogin ? this.user.department : '未知'}</span>
              </div>
            </div>
          </div>
          {this.isLogin ? this.toEnterAdmin() : this.toLoginHtml()}
        </div>
        {
          this.isLogin && <Logout logout={this.logout} />
        }
      </div>
    )
  }
})
