import { define, WeElement } from 'omi'

define('hello-element', class extends WeElement {
  render(props, data) {
    return <div class="hello" />
  }
})
