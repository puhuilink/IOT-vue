<template>
  <div class="app-container">
    <el-card shadow="never" class="box-card">
      <div>
        <table-list :selectParams="this.selectParams"  />
      </div>
    </el-card>
  </div>
</template>
<script>
// import { getAction } from '@/api/manage'
// import implement_url from '@/icons/image/implement.png'
import tableList from './tableList.vue'


export default {
  components: {
  tableList
},
   props: {
  selectParams: {
      type: Object,
     default:{}
    }
   },
  data() {
    return {
      
    }
  },
  async created() {
   
  },
  methods: {
    getCodeInfo() {
      return getAction('/sys/codeInfo/getSysCodeInfos', { current: 1, size: 100, codeTypeId: 'IS_ENIOY_TREATMENT,GROUP_TYPE' }).then((res) => {
        const { data } = res
        this.selectIsEnjoyTreatment = data.IS_ENIOY_TREATMENT.filter((r) => { return r.codeInfoId !== '' })
        this.selectgroupType = data.GROUP_TYPE.filter((r) => { return r.codeInfoId !== '' })
      })
    },
    getProvince() {
      return getAction('/sys/org/getCrbTreeData?orgTypes=3,6').then((res) => {
        const { data } = res
        this.selectProvince = data
        const objTemp = {}
        data.map((el) => {
          objTemp[el.id] = el.label
        })
        this.province = objTemp
      })
    },
    btnQuery() {
      this.listQuery.current = 1
      this.listQuery.size = 10
      this.$refs.rewardMaintain.list()
      this.$refs.rewardGroupList.list()
      this.$refs.resultMaintenance.list()
      // this.list()
    },
    btnReset() {
      this.resetSearchColumn()
      this.btnQuery()
    },
    resetSearchColumn() {
      this.listQuery.projectReleaseName = ''
      this.listQuery.prizeName = ''
      this.listQuery.province = ''
      this.listQuery.awardDate = ''
      this.listQuery.cardId = ''
      this.listQuery.personalWinnerName = ''
      this.listQuery.isEnjoyTreatment = ''
      this.listQuery.groupWinnerName = ''
      this.listQuery.address = ''
      this.listQuery.groupType = ''
      this.listQuery.achievementName = ''
      this.listQuery.teamLeaderName = ''
      this.listQuery.company = ''
      this.object = '10202'
    }
  }
}
</script>
<style  scoped>


/* .app-container {
  padding: 0;

  .el-card__body {
    height: 736px !important;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  } */
/* } */

</style>

