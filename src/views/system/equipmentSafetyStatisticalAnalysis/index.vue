<template>
   <div>
      <el-row :gutter="30">
        <el-col :span="5">
          <div class="AssetsBox">
            <div class="Assets">已授权设备</div>
            <div class="AssetsNumber">{{ AssetsNumber }}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="AssetsBox">
            <div class="Assets">未授权设备</div>
            <div class="AssetsNumber">{{ Invand }}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="AssetsBox">
            <div class="Assets">在线的设备</div>
            <div class="AssetsNumber">{{ Probe }}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="AssetsBox">
            <div class="Assets">异常的设备</div>
            <div class="AssetsNumber">{{ attackNumber }}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="AssetsBox">
            <div class="Assets">设备类型</div>
            <div class="AssetsNumber">{{ deviceType }}</div>
          </div>
        </el-col>
      </el-row>
      <div class="boxContent">
        <div class="left">

        </div>
        <div class="right">
          <eventType :query="query"
               :tipname="'告警类型分布'"
               :type="'report'"
               :name="'equipment'" />
          <eventTrend :query="query" :event-type="2" :name="'equipment'" :search="'event_ztwe'" :tipname="'事件趋势分析'" />
        </div>
      </div>
    </div>
</template>
<script>
import eventType from '@/components/Echarts/eventType'
import eventTrend from "@/components/Echarts/eventTrend";
export default {
    components: { eventType,eventTrend },
  data(){
    return{
       AssetsNumber: "100",
       Invand:"5",
       Probe:"96",
       attackNumber:"4",
       deviceType:"汇聚网关"

    }
  }
}
</script>

<style scoped lang="scss">
 .AssetsBox {
    .Assets {
      background-color: #5599ff;
      padding: 10px 80px 10px 10px;
      border-bottom: 1px solid #fff;
      color: #fff;
      font-weight: bold;
    }
    .AssetsNumber {
      width: 100%;
      height: 100px;
      background-color: #5599ff;
      color: #ffff77;
      font-weight: 800;
      text-align: center;
      line-height: 100px;
    }
  }
  .boxContent{
    height: 900px;
    .left{
      float:left;
      width:50%;
      height: 900px;
      // background-color: #ffff77;

    }
    .right{
      float:right;
        width:50%;
      height: 900px;
      // background-color:aqua;
    }
  }
</style>
