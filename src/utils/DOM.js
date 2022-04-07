import Vue from 'vue'

// hack for autofocus on dynamic elements
const FOCUSABLE_ELEMENT_TAGS = [
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'CHECKBOX',
  'RATIO'
]

export function focus(el) {
  let target
  if (FOCUSABLE_ELEMENT_TAGS.includes(el.tagName)) {
    target = el
  } else {
    for (const tag of FOCUSABLE_ELEMENT_TAGS) {
      const [matchedEl] = el.getElementsByTagName(tag.toLowerCase())
      if (matchedEl) {
        target = matchedEl
        break
      }
    }
  }
  Vue.nextTick(() => {
    target && target.focus()
  })
}
