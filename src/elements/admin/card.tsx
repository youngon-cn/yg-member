import { h, WeElement, define } from 'omi'
import { OC } from 'omi-tools';
import '@omiu/tabs'
import '@omiu/switch'
import '../components/backtop'
import { checkLogin, gotoLogin } from '../../utils/tools'
import { common, members_card, app } from '../../store/config'
import Logout from './logout'
import loadingImg from '../../assets/loading.svg'
import css from './_index.css'

const YGCardItem = OC.makeFC('yg-card-item', (props) => {
  const suffix = [
    props.fr ? `fr=${!!props.fr}` : '',
    props.v ? `v=${props.v}` : '',
    props.light ? `light=${!!props.light}` : '',
  ].filter(e => e).join('&')

  return <iframe
    src={`${members_card.card_url(props.stuid)}${suffix ? `?${suffix}` : ''}`}
    frameBorder="none"
    style={`width: 320px;border: none;height: 550px;`}
  ></iframe>
})

const logout = (ctx) => {
  ctx.user = null
  ctx.update()
  window.location.href = common.auth_url
}

const commonOptions = { staticCss: css }

const FullScreenTips = OC.makeFC(
  'full-screen-tips',
  () => <div class="tips"><slot></slot></div>,
  commonOptions
)

const LittleLoading = OC.makeFC(
  'little-loading',
  () => <div class="abscenter"> <img src={loadingImg} style="width:100px;height:100px;" /></div>,
  commonOptions
)

const Loading = OC.makeFC(
  'loading',
  () => <FullScreenTips> <img src={loadingImg} style="width:100px;height:100px;" /></FullScreenTips>,
  commonOptions
)


class YGCardPage extends WeElement {
  static css = css
  user = null
  _config = app
  loading = false
  currentGrade = 0
  v = 1
  light = false
  fr = false
  members = { maf13: JSON.parse(sessionStorage.getItem('members-maf13') || '[]') }

  setState = (state: any) => {
    Object.keys(state).forEach(key => this[key] = state[key])
    this.update()
  }

  getGrade = async (grade: number) => {
    const rs = await fetch(this._config.api_af13_url(grade))
    return await rs.json()
  }

  getMAF13 = () => {
    let reqArray = []
    for (let i = this._config.grade.start; i <= this._config.grade.end; i++) {
      reqArray.push(i)
    }
    const req = reqArray.reduce((t, cv) => {
      return [...t, this.getGrade(cv)]
    }, [])
    return Promise.all(req).then(rs => {
      rs.forEach((e: { status: boolean, count: number, resdata: any[] }, i) => {
        if (e.status) {
          this.members.maf13[i] = {
            grade: reqArray[i],
            count: e.count,
            members: [...e.resdata]
          }
        }
      })
      sessionStorage.setItem('members-maf13', JSON.stringify(this.members.maf13))
      this.update()
    })
  }

  install() {
    if (
      !this.members.maf13
      || !Array.isArray(this.members.maf13)
      || this.members.maf13.length === 0
    ) {
      this.getMAF13()
    }
  }

  installed() {
    checkLogin().then(rs => {
      rs ? (this.user = rs, this.update()) : gotoLogin()
    })
  }

  onTabChange = (e) => {
    this.setState({ loading: true, currentGrade: e.detail.index })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2600)
  }

  render() {
    return this.user && this.members && this.members.maf13 ? [4, 5].includes(this.user.utype)
      ? (
        <div class="card-wrap">
          <div class="tab-nav">
            <o-tabs
              list={this.members.maf13.map((grade: any, index: number) => ({ label: `${grade.grade}级`, index }))}
              active-index={this.currentGrade}
              onChange={this.onTabChange}
            >
            </o-tabs>
            <Logout logout={() => logout(this)} />
          </div>
          <div class="ctrl">
            <span style="display:flex;align-items: center;margin: 0 20px;">
              <o-switch
                css="*{cursor: pointer}"
                onChange={(e) => this.setState({ v: e.detail ? 2 : 1 })}
                style="margin-right:10px;"
              ></o-switch>
              <span style="font-size: 14px;color: #919191;">切换版本</span>
            </span>
            <span style="display:flex;align-items: center;margin: 0 20px;">
              <o-switch
                css="*{cursor: pointer}"
                onChange={(e) => this.setState({ light: e.detail })}
                style="margin-right:10px;"
                disabled={this.v !== 2}
              ></o-switch>
              <span style="font-size: 14px;color: #919191;">切换LOGO</span>
            </span>
            <span style="display:flex;align-items: center;margin: 0 20px;">
              <o-switch
                css="*{cursor: pointer}"
                onChange={(e) => this.setState({ fr: e.detail })}
                style="margin-right:10px;"
              ></o-switch>
              <span style="font-size: 14px;color: #919191;">刷新工卡</span>
            </span>
          </div>
          <div class="card-container" key={this.currentGrade}>
            {this.loading && <LittleLoading />}
            <div class="card-content" style={{ visibility: this.loading ? 'hidden' : 'visible' }}>
              {
                this.members.maf13[this.currentGrade].members.map(user => (
                  <YGCardItem
                    stuid={user.stuid}
                    v={this.v}
                    fr={this.fr}
                    light={this.light}
                    key={user.stuid}
                  />
                ))
              }
            </div>
          </div>
          <yg-backtop />
        </div>
      )
      : <FullScreenTips>
        <Logout logout={() => logout(this)} />
        <h1>你已闯入无人之境，尽快离开😔～</h1>
      </FullScreenTips>
      : <Loading />
  }
}

define('yg-card-page', YGCardPage)

export default YGCardPage
