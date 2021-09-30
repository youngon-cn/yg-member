import { common } from './config'
import { getUtype, sex, Storages } from '../utils/tools'
export default {
  token: '',
  userInfo: {},
  setToken(token: string) {
    this.token = token
    Storages.setStorage('token', token)
  },
  setUserInfor(user: any) {
    this.userInfo = user
    Storages.setStorage('userInfo', user)
  },
  logout() {
    this.token = null
    this.userInfo = null
    Storages.rmStorage('token')
    Storages.rmStorage('userInfo')
  },
  async getUserInfor() {
    const rs = await fetch(`${common.auth_url}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        token: decodeURIComponent(this.token)
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const res = await rs.json()
    if (res.status) {
      let user = res.resdata
      user.fullhead = `${common.asset_base_url}${user.head}`
      // eslint-disable-next-line prettier/prettier
      user.department = Number(user.utype) === 1 ? '实习站员' : (user.department ? user.department : '天商学子')
      user.utypeName = getUtype(Number(user.utype))
      user.sexName = sex(Number(user.sex))
      this.setUserInfor(user)
      return this.userInfo
    }
    return null
  }
}
