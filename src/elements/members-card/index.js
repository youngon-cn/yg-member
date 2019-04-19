import { define, WeElement } from 'omi'
import style from './_index.css'

define('members-card', class extends WeElement {
  css() {
    return style
  }

  static defaultProps = {
    members: []
  }

  _config = {
    asset_base_url: 'https://api.wangxuefeng.com.cn/static/assets',
    admission_url: stuid =>
      `https://member.youngon.work/admission/${stuid}/en_US`,
    default_head:
      'https://api.wangxuefeng.com.cn/static/assets/default/defaulthead.jpg'
  }

  gotoMore(stuid) {
    window.open(this._config.admission_url(stuid))
  }

  membersOtherInfo(member) {
    return (
      <div
        class="otherinfo"
        flex
        flex-column
        justify-content-center
        onClick={() => this.gotoMore(member.stuid)}
      >
        <span>
          {member.department}{' '}
          {member.positionName ? member.positionName : '站员'}
        </span>
        <span>{this.getUtype(member.utype)}</span>
      </div>
    )
  }

  getUtype(utype) {
    /* eslint-disable indent */
    let res = '天商学子'
    switch (Number(utype)) {
      case 0:
        res = '天商学子'
        break
      case 1:
        res = '实习站员'
        break
      case 2:
        res = '正式站员'
        break
      case 3:
        res = '往届站员'
        break
      case 4:
        res = '管理员'
        break
      case 5:
        res = '超级管理员'
        break
    }
    return res
  }

  render(props, data) {
    return (
      <div class="wrap" flex flex-column-reverse justify-content-center>
        {props.members.map(e => (
          <div>
            <p class="grade" flex justify-conent-space-between>
              <span>{`${e.grade}级`}</span>
              <span>{e.count ? `${e.count}` : e.members.length}人</span>
            </p>
            <div flex flex-wrap>
              {e.members.map(m => (
                <div class="card" flex align-items-center>
                  <img
                    avatar
                    src={
                      m.head
                        ? `${this._config.asset_base_url}${m.head}`
                        : this._config.default_head
                    }
                  />
                  <div flex flex-column justify-content-center>
                    <h4 name>{m.name ? m.name : m}</h4>
                    {m.utype ? this.membersOtherInfo(m) : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
})
