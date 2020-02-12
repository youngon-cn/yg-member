import { define, WeElement } from 'omi'
import '../members-card'
import '../components/backtop'
import '../components/navbar'
import { app } from '../../store/config'

define('my-app', class extends WeElement {
  css = require('./_index.css')

  _config = app

  members = {
    m9813: [],
    maf13: []
  }

  install() {
    this.getM9813()
    this.getMAF13()
  }

  async getGrade(grade) {
    const rs = await fetch(this._config.api_af13_url(grade))
    return await rs.json()
  }

  getM9813() {
    fetch(this._config.api_9813_url)
      .then(rs => rs.json())
      .then(rs => {
        this.members.m9813 = rs.members
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
    Promise.all(req).then(rs => {
      rs.forEach((e, i) => {
        if (e.status) {
          this.members.maf13[i] = {
            grade: reqArray[i],
            count: e.count,
            members: [...e.resdata]
          }
        }
      })
      this.update()
    })
  }

  render() {
    return (
      <div class="app">
        <h1 class="title">天津商业大学阳光网站</h1>
        <h2 class="subtitle">历届站员名单</h2>
        <members-card
          members={[...this.members.m9813, ...this.members.maf13]}
        />
        <navbar />
        <backtop />
      </div>
    )
  }
})
