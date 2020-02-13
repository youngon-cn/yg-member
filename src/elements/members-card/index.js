import { define, WeElement } from 'omi'
import { common, members_card } from '../../store/config'
import { getUtype } from '../../utils/tools'
import style from './_index.css'

define('members-card', class extends WeElement {
  css() {
    return style
  }

  static defaultProps = {
    members: []
  }

  _config = { ...common, ...members_card }

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
        <span>{getUtype(member.utype)}</span>
      </div>
    )
  }

  render(props, data) {
    return (
      <div class="wrap" flex flex-column justify-content-center>
        {props.members.map(e => (
          <div>
            <p
              class="grade"
              id={`grade-${e.grade}`}
              flex
              justify-content-space-between
            >
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
