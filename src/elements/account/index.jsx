import { define, WeElement, extend, get, set, h } from 'omi'
import { Base64 } from 'js-base64'
import css from './_index.css'
import { app } from '../../store/config'
import '../components/backtop'

extend('model', (el, path, scope) => {
  el.value = get(scope, path)
  el.addEventListener('input', () => {
    set(scope, path, el.value)
    scope.update()
  })
})

define('yg-account', class extends WeElement {
  css = css
  stuid = ''
  password = ''
  isLoginSuccess = false
  loading = false
  aps = []
  toast = ({ msg, duration = 3000, location = 'bottom' }) => {
    const vlocation =
      location === 'bottom'
        ? 'bottom: 10%;'
        : location === 'top' // eslint-disable-next-line indent
        ? 'top: 10%;' // eslint-disable-next-line indent
        : 'top: 50%;'
    const toastElement = document.createElement('div')
    toastElement.innerHTML = msg
    toastElement.style.cssText = `
     ${vlocation};
      max-width:60%;
      min-width:150px;
      padding:0 14px;
      height: 40px;
      color: rgb(255, 255, 255);
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      position: fixed;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999999;
      background: rgba(0, 0, 0, 0.75);
      font-size: 16px;
    `
    document.body.appendChild(toastElement)
    setTimeout(() => {
      const delay = 0.5
      toastElement.style.webkitTransition = `-webkit-transform ${delay}s ease-in, opacity ${delay}s ease-in`
      toastElement.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(toastElement)
      }, delay * 1000)
    }, duration)
  }

  async queryAccount() {
    if (!this.stuid.trim()) {
      this.toast({ msg: '学号不能为空' })
      return
    }
    if (!this.password.trim()) {
      this.toast({ msg: '密码不能为空' })
      return
    }
    this.loading = true
    const data = { stuid: this.stuid, password: this.password }
    const rs = await fetch(app.account, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors'
    })
    const res = await rs.json()
    if (res.status) {
      this.aps = res.resdata.map(e => ({ ...e, show: false }))
      this.loading = false
      this.isLoginSuccess = true
      this.update()
    } else {
      this.loading = false
      this.toast({ msg: res.title })
      this.isLoginSuccess = false
      this.update()
    }
  }

  showPassword(e) {
    e.show = true
    this.update()
  }

  clickToshowPassword(e) {
    const password = Base64.decode(
      Base64.decode(e.password ? e.password : undefined)
    )
    const hidePassHtml = (
      <a
        href="javascript:void 0;"
        class="lookpass"
        onClick={() => this.showPassword(e)}
      >
        查看密码
      </a>
    )
    const showPassHtml = (
      <div class="password-text">
        <svg
          t="1583346023215"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3101"
          width="14"
          height="14"
        >
          <path
            d="M884.224 448.512c-17.92-17.92-41.472-28.16-66.56-28.16H273.408V296.96c0-64 24.576-123.904 69.632-168.96s104.96-69.632 168.96-69.632c62.976 0 122.88 24.576 168.96 69.632 45.056 45.056 69.632 104.96 69.632 168.96 0 16.384 12.8 28.672 28.672 28.672 16.384 0 29.696-12.8 29.696-28.672 0-78.848-30.72-153.6-87.04-209.92S591.36 0 512 0C433.152 0 358.4 31.232 302.08 87.04 245.76 143.36 215.04 218.112 215.04 296.96v123.392h-8.704c-25.088 0-48.64 9.728-66.56 28.16-17.92 17.92-28.16 41.472-28.16 66.56v415.232c0 25.088 9.728 48.64 28.16 66.56 17.408 17.408 41.472 27.136 66.56 27.136h611.328c24.576 0 48.128-9.728 66.56-27.136 17.92-17.92 28.16-41.984 28.16-66.56v-415.232c0-24.576-10.24-48.64-28.16-66.56z m-713.728 66.56c0-9.216 4.096-19.456 10.24-25.6 6.656-6.656 15.872-10.24 25.6-10.24h611.328c9.216 0 17.92 3.584 25.6 10.24 6.656 6.656 10.24 16.384 10.24 25.6v415.232c0 9.216-3.584 17.92-10.24 24.576-7.68 7.168-16.896 10.752-25.6 10.752H206.336c-9.728 0-18.944-4.096-25.6-10.24-6.656-6.656-10.24-15.36-10.24-24.576v-415.744z"
            p-id="3102"
            fill="#1296db"
          />
        </svg>
        <span>{password}</span>
      </div>
    )
    return e.show ? showPassHtml : hidePassHtml
  }
  showAPs() {
    return (
      <div class="aplist">
        {this.aps.map((e, i) => (
          <div class="aplist-item-card">
            <h5 atype>{e.atype}</h5>
            <div account>
              <svg
                t="1583345956463"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2289"
                width="14"
                height="14"
              >
                <path
                  d="M999.18211 952.384504v-54.449386c0-55.489512-25.906394-108.890709-69.14822-142.602079-100.698709-78.323906-203.268031-132.974866-239.204788-151.197228v-62.189858a301.99937 301.99937 0 0 0 17.964347-53.401197c26.744945-9.627213 41.36315-48.998803 51.183874-83.758362 13.166866-46.281575 11.699402-78.743181-3.757354-96.755906 16.287244-88.991244 8.982173-154.535307-21.520126-194.955086-16.085669-21.149228-34.888567-30.155591-47.418457-34.130646-8.990236-12.562142-27.16422-33.71137-57.876158-50.675906C597.653165 9.433701 561.93411 0 522.651213 0c-7.095433 0-14.198929 0.419276-20.471937 0.838551-17.545071 0.838551-34.888567 4.192756-52.014363 9.836851-0.209638 0-0.419276 0.217701-0.628913 0.2177-18.802898 6.490709-37.18652 15.908283-54.941228 28.059213a289.816189 289.816189 0 0 0-54.949292 45.644598c-31.542425 32.461606-52.433638 69.107906-61.415811 108.269859-8.570961 32.453543-9.191811 65.124787-2.096378 97.159055-3.757354 2.725291-7.095433 5.869858-10.022299 9.635275-14.41663 19.05285-15.045543 48.998803-2.297953 94.441827 8.772535 31.413417 20.471937 63.455748 40.314961 77.90463 5.853732 30.155591 15.674457 57.58589 28.83326 81.871622v50.474331c-35.928693 18.214299-138.506079 72.655622-239.204788 151.181102C50.514646 789.26211 24.608252 842.453669 24.608252 898.152819v54.449386c0 39.363528 31.961701 71.19622 71.034961 71.19622h832.503937c39.07326 0 71.034961-32.042331 71.03496-71.405858z m-923.599622 0v-54.449386c0-39.782803 18.383622-77.896567 49.305197-101.980724 108.632693-84.387276 219.152126-140.094488 240.244913-150.350614 11.699402-5.652157 19.012535-17.383811 19.012536-30.574867v-68.051653a25.801575 25.801575 0 0 0-3.547717-12.98948c-13.787717-23.455244-23.398803-51.514457-28.204346-83.556788a25.825764 25.825764 0 0 0-19.012536-20.93959c-2.717228-3.144567-10.449638-14.448882-20.262299-49.418079-8.143622-28.897764-7.522772-42.298457-6.692283-47.120126 8.151685 0.419276 16.295307-3.346142 21.528189-9.836851 5.426394-6.909984 6.885795-16.125984 3.966992-24.293795-10.868913-30.365228-12.118677-61.560945-3.765417-93.393638 7.103496-30.574866 23.398803-59.053354 48.676283-85.024252 13.578079-14.65852 29.252535-27.430299 45.959055-38.1057 0.209638-0.209638 0.628913-0.419276 0.838551-0.628914a175.482961 175.482961 0 0 1 43.040252-22.197417c0.201575 0 0.411213-0.209638 0.411213-0.209638 12.328315-4.192756 25.075906-6.490709 38.444346-7.119622 36.557606-3.144567 69.357858 3.765417 98.392693 20.729953 31.760126 17.593449 44.709291 40.621354 44.709292 40.621354 3.966992 8.167811 11.070488 12.981417 20.262299 13.618394 0.628913 0 14.206992 2.096378 25.906393 18.633575 12.328315 17.593449 29.873386 62.826835 7.942048 168.363338a25.632252 25.632252 0 0 0 14.206992 28.478488c1.048189 3.77348 2.717228 16.54526-6.273008 48.377953-7.933984 28.059213-14.408567 40.830992-18.173984 46.48315a24.455055 24.455055 0 0 0-14.408567 1.677102 25.76126 25.76126 0 0 0-15.255181 19.052851c-4.386268 25.132346-11.489764 47.749039-20.681575 67.011527-1.669039 3.563843-2.507591 7.337323-2.507591 11.10274v78.735118c0 13.191055 7.313134 24.713071 19.012536 30.574867 21.10085 10.256126 131.61222 66.172976 240.035275 150.350614 30.921575 24.084157 49.305197 62.197921 49.305197 101.980724v54.449386a19.99622 19.99622 0 0 1-19.843023 19.891402H95.627087c-11.070488 0.209638-20.052661-8.788661-20.052662-19.891402z"
                  fill="#1296db"
                  p-id="2290"
                />
              </svg>
              <span>{e.account}</span>
            </div>
            {this.clickToshowPassword(e)}
          </div>
        ))}
      </div>
    )
  }

  loginHtml() {
    return (
      <div class="login">
        <h2 class="login-title">YG-ACCROUNT</h2>
        <label for="stuid">
          学号:
          <input
            type="text"
            placeholder="请输入学号"
            id="stuid"
            o-model="stuid"
          />
        </label>
        <label for="password">
          密码:
          <input
            type="password"
            placeholder="请输入密码"
            id="password"
            o-model="password"
          />
        </label>
        <button
          class="btn"
          onClick={() => this.queryAccount()}
          disabled={this.loading}
        >
          {this.loading ? '正在验证账号密码中...' : '验证账号密码'}
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>{this.isLoginSuccess ? this.showAPs() : this.loginHtml()}</div>
        <yg-backtop />
      </div>
    )
  }
})
