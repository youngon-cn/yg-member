import { OC, OH } from 'omi-tools';
import '@omiu/tabs'
import '@omiu/switch'
import { checkLogin, gotoLogin } from '../../utils/tools'
import { common, members_card, app } from '../../store/config'
import Logout from './logout'
import loadingImg from '../../assets/loading.svg'

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

const commonOptions = { staticCss: require('./_index.css') }

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

const YGCardPage = OC.makeFC('yg-card-page', (props, store, ctx) => {

  OH.useEffect(() => {
    checkLogin().then(rs => {
      rs ? (ctx.user = rs, ctx.update()) : gotoLogin()
    })
  }, [], ctx)

  const onTabChange = (e) => {
    ctx.setState({ loading: true, currentGrade: e.detail.index })
    setTimeout(() => {
      ctx.setState({ loading: false })
    }, 2600)
  }

  return ctx.user && ctx.members && ctx.members.maf13 ? [4, 5].includes(ctx.user.utype)
    ? (
      <div class="card-wrap">
        <div class="tab-nav">
          <o-tabs
            list={JSON.stringify(ctx.members.maf13.map((grade, index) => ({ label: `${grade.grade}级`, index })))}
            active-index={ctx.currentGrade}
            onChange={onTabChange}
          >
          </o-tabs>
          <Logout logout={() => logout(ctx)} />
        </div>
        <div class="ctrl">
          <span style="display:flex;align-items: center;margin: 0 20px;">
            <o-switch
              css="*{cursor: pointer}"
              onChange={(e) => ctx.setState({ v: e.detail ? 2 : 1 })}
              style="margin-right:10px;"
            ></o-switch>
            <span style="font-size: 14px;color: #919191;">切换版本</span>
          </span>
          <span style="display:flex;align-items: center;margin: 0 20px;">
            <o-switch
              css="*{cursor: pointer}"
              onChange={(e) => ctx.setState({ light: e.detail })}
              style="margin-right:10px;"
              disabled={ctx.v !== 2}
            ></o-switch>
            <span style="font-size: 14px;color: #919191;">切换LOGO</span>
          </span>
          <span style="display:flex;align-items: center;margin: 0 20px;">
            <o-switch
              css="*{cursor: pointer}"
              onChange={(e) => ctx.setState({ fr: e.detail })}
              style="margin-right:10px;"
            ></o-switch>
            <span style="font-size: 14px;color: #919191;">刷新工卡</span>
          </span>
        </div>
        <div class="card-container" key={ctx.currentGrade}>
          {ctx.loading && <LittleLoading />}
          <div class="card-content" style={{ visibility: ctx.loading ? 'hidden' : 'visible' }}>
            {
              ctx.members.maf13[ctx.currentGrade].members.map(user => (
                <YGCardItem
                  stuid={user.stuid}
                  v={ctx.v}
                  fr={ctx.fr}
                  light={ctx.light}
                  key={user.stuid}
                />
              ))
            }
          </div>
        </div>
      </div>
    )
    : <FullScreenTips>
      <Logout logout={() => logout(ctx)} />
      <h1>你已闯入无人之境，尽快离开😔～</h1>
    </FullScreenTips>
    : <Loading />
}, {
  ...commonOptions,
  install() {
    this._config = app
    this.loading = false
    this.currentGrade = 0
    this.v = 1
    this.light = false
    this.fr = false

    this.setState = (state) => {
      Object.keys(state).forEach(key => this[key] = state[key])
      this.update()
    }

    this.members = { maf13: JSON.parse(sessionStorage.getItem('members-maf13') || '[]') }

    this.getGrade = async (grade) => {
      const rs = await fetch(this._config.api_af13_url(grade))
      return await rs.json()
    }

    this.getMAF13 = () => {
      let reqArray = []
      for (let i = this._config.grade.start; i <= this._config.grade.end; i++) {
        reqArray.push(i)
      }
      const req = reqArray.reduce((t, cv) => {
        return [...t, this.getGrade(cv)]
      }, [])
      return Promise.all(req).then(rs => {
        rs.forEach((e, i) => {
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

    if (
      !this.members.maf13
      || !Array.isArray(this.members.maf13)
      || this.members.maf13.length === 0
    ) {
      this.getMAF13()
    }
  }
})

export default YGCardPage
