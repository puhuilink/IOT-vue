<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import TagViewService from './layout/components/TagsView/TagViewService'

export default {
  name: 'App',
  provide() {
    return {
      closeCurrentTab: this.closeCurrentTab,
      closeCurTabAndPush: this.closeCurTabAndPush
    }
  },
  data() {
    return {
      tagViewService: new TagViewService()
    }
  },
  methods: {
    closeCurrentTab() {
      this.tagViewService.emit('closeCurrentTab')
    },
    closeCurTabAndPush(...argus) {
      this.closeCurrentTab()
      return this.$router.push(...argus)
    },
    closeCurrentTabAndBack() {
      const { from } = this.$route.query
      if (from) {
        return this.$router.push(from)
      } else {
        return this.$router.go(-1)
      }
    }
  }
}
</script>
