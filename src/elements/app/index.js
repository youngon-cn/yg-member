import { define, WeElement } from 'omi'
import '../members-card'
import '../components/backtop'
import '../components/navbar'
import '../components/footer'
import { app } from '../../store/config'

define('my-app', class extends WeElement {
  css = require('./_index.css')

  _config = app

  members = {
    m9813: JSON.parse(sessionStorage.getItem('members-m9813') || '[]'),
    maf13: JSON.parse(sessionStorage.getItem('members-maf13') || '[]')
  }

  install() {
    const noM9813 = !this.members.m9813
      || !Array.isArray(this.members.m9813)
      || this.members.m9813.length === 0

    const noMaf13 = !this.members.maf13
      || !Array.isArray(this.members.maf13)
      || this.members.maf13.length === 0

    if (noM9813 || noMaf13) {
      Promise.all([this.getM9813(), this.getMAF13()])
    }
  }

  async getGrade(grade) {
    const rs = await fetch(this._config.api_af13_url(grade))
    return await rs.json()
  }

  getM9813() {
    return fetch(this._config.api_9813_url)
      .then(rs => rs.json())
      .then(rs => {
        this.members.m9813 = rs.members
        sessionStorage.setItem('members-m9813', JSON.stringify(rs.members))
        this.update()
      })
  }

  getMAF13() {
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

  render() {
    const members = [...this.members.m9813, ...this.members.maf13].reverse()
    return (
      <div class="app">
        <h1 class="title">天津商业大学阳光网站</h1>
        <h2 class="subtitle">历届站员名单</h2>
        <members-card members={members} />
        <yg-footer />
        <yg-navbar />
        <yg-backtop />
      </div>
    )
  }
})
