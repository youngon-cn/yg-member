import store from '../store/admin-store'
import { common } from '../store/config'
export function getUtype(utype) {
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

export function sex(e) {
  let xb = '保密'
  switch (e) {
    case 0:
      xb = '保密'
      break
    case 1:
      xb = '男'
      break
    case 2:
      xb = '女'
      break
    default:
      xb = '保密'
      break
  }
  return xb
}

export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

export function checkLogin() {
  const localToken = Storages.getStorage('token')
  const userInfor = Storages.getStorage('userInfo')
  const queryToken = getQueryString('token')
  return new Promise((resolve, reject) => {
    if (queryToken) {
      store.setToken(queryToken)
      resolve(store.getUserInfor().then(e => e))
    } else if (localToken) {
      resolve(store.getUserInfor().then(e => e))
    } else if (userInfor) {
      store.setUserInfor(userInfor)
      resolve(store.userInfo)
    } else {
      resolve(false)
    }
  })
}

export function gotoLogin() {
  window.location.href = `${common.auth_url}/?${common.query_param_name}=${document.URL}`
}

export class Storages {
  static setStorage(t, e) {
    if (arguments.length === 2) {
      let r = e
      typeof r === 'object'
        ? (r = `obj-${JSON.stringify(r)}`)
        : (r = `str-${r}`)
      localStorage.setItem(t, r)
    }
  }
  static getStorage(t) {
    let r = localStorage.getItem(t)
    if (!r) return null
    if (r.indexOf('obj-') === 0) return JSON.parse(r.slice(4))
    if (r.indexOf('str-') === 0) return r.slice(4)
  }
  static rmStorage(t) {
    localStorage.removeItem(t)
  }
  static clearStorage() {
    localStorage.clear()
  }
}
