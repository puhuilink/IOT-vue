<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 28,
      validator: v => v >= 1
    }
  },
  render() {
    const { length } = this
    const content = this.content || ''
    if (content.length <= length) {
      return <span>{ content }</span>
    } else {
      return (
        <el-tooltip content={content} effect='light' popper-class='atooltip'>
          <span class='tooltip__ellipsis'>{ content.slice(0, length - 1) }</span>
        </el-tooltip>
      )
    }
  }
}
</script>

<style lang="scss">
.atooltip {
  max-width: 50% !important;
}

.tooltip {
  &__ellipsis {
    &::after {
      content: '...';
    }
  }
}
</style>
