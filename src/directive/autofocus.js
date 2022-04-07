import Vue from 'vue'
import { focus } from '@/utils/DOM'

Vue.directive('autofocus', {
  inserted(el) {
    focus(el)
  }
})
