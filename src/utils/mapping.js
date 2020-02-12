/**
 * mappingjs v2.0.0 by dntzhang
 * Objects mapping for javascript. Omi MVVM's best partner.
 * @method mapping
 * @param {from} options
 * @param {to} options
 * @param {rule} options
 * @return {Object} To Object
 */

let ARRAYTYPE = '[object Array]'
let OBJECTTYPE = '[object Object]'

function mapping(from, to, rule) {
  let tempRule = Object.assign({}, rule)
  let res = to || {}
  Object.keys(from).forEach(key => {
    let obj = from[key]
    if (isArray(obj)) {
      res[key] = res[key] || []
      arrayMapping(obj, res[key], tempRule, key)
    } else if (isObject(obj)) {
      res[key] = res[key] || {}
      objMapping(obj, res[key], tempRule, key)
    } else {
      res[key] = obj
    }
  })

  rule &&
    Object.keys(tempRule).forEach(key => {
      let arr = key
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.')

      if (arr.length === 1) {
        res[key] = tempRule[key].call ? tempRule[key].call(from) : tempRule[key]
        delete tempRule[key]
      }
    })

  return res
}

function arrayMapping(from, to, rule, path) {
  if (from.length < to.length) {
    to.length = from.length
  }
  from.forEach((item, index) => {
    if (isArray(item)) {
      to[index] = to[index] || []
      arrayMapping(item, to[index], rule, path + '[' + index + ']')
    } else if (isObject(item)) {
      to[index] = objMapping(item, to[index], rule, path + '[' + index + ']')
    } else {
      to[index] = item
    }
  })

  rule &&
    Object.keys(rule).forEach(key => {
      let arr = key
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.')
      let pathArr = path
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.')

      let dl = arr.length - pathArr.length
      if (dl === 1 && equalArr(arr, pathArr)) {
        to[arr[arr.length - 1]] = rule[key].call
          ? rule[key].call(from)
          : rule[key]
        delete rule[key]
      }
    })
}

function objMapping(from, to, rule, path) {
  let res = to || {}
  Object.keys(from).forEach(key => {
    let obj = from[key]
    if (isArray(obj)) {
      res[key] = res[key] || []
      arrayMapping(obj, res[key], rule, path + '.' + key)
    } else if (isObject(obj)) {
      res[key] = res[key] || {}
      objMapping(obj, res[key], rule, path + '.' + key)
    } else {
      res[key] = obj
    }
  })

  rule &&
    Object.keys(rule).forEach(key => {
      let arr = key
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.')
      let pathArr = path
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.')

      if (arr.length - pathArr.length === 1 && equalArr(arr, pathArr)) {
        res[arr[arr.length - 1]] = rule[key].call
          ? rule[key].call(from)
          : rule[key]
        if (arr.indexOf('*') === -1) {
          delete rule[key]
        }
      }
    })

  return res
}

function equalArr(arrA, arrB) {
  let i = 0,
    len = arrB.length
  for (; i < len; i++) {
    if (arrA[i] !== arrB[i] && !(arrA[i] === '*' && !isNaN(Number(arrB[i])))) {
      return false
    }
  }
  return true
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === ARRAYTYPE
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === OBJECTTYPE
}

//Compatible with older versions
mapping.auto = mapping

if (typeof exports == 'object') {
  module.exports = mapping
} else if (typeof define == 'function' && define.amd) {
  define([], () => {
    return mapping
  })
} else {
  window.mapping = mapping
}
