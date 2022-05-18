<script>
export default {
  name: 'FileTip',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  render() {
    const content = this.content || ''
    return (
      <el-tooltip content={content} effect='light' placement='right' popper-class='filetip'>
        <i class='el-icon-info' style=' color: #ffaf37;font-size:20px' />
      </el-tooltip>
    )
  }
}
</script>

<style lang="scss">
.filetip.el-tooltip__popper[x-placement^='right'] .popper__arrow {
  border-right-color: #ffaf37 !important;
}

.filetip {
  border: 1px solid #ffaf37 !important;
  color: #ffaf37 !important;
  max-width: 50% !important;
}

</style>
