<template>
  <div class="app-container">

    <div style="padding-left:60px;padding-bottom:10px">
      <el-row :gutter="270">
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBox">
            <div class="Assets">全部资产</div>
            <div class="AssetsNumber">{{ this.allAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxOnline">
            <div class="Assets">在线的资产</div>
            <div class="AssetsNumber">{{ this.onlineAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxType">
            <div class="Assets">资产类型</div>
            <div class="AssetsNumber">{{ this.AssetsType }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxOffline">
            <div class="Assets">离线的资产</div>
            <div class="AssetsNumber">{{ this.offlineAssets }}</div>
          </div>
        </el-col>
        <el-col :span="4"
                class="elcolCard">
          <div class="AssetsBoxUnNormal">
            <div class="Assets">异常的资产</div>
            <div class="AssetsNumber">{{ this.abnormalAssets }}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <eventType :query="query"
               :tipname="'资产类型分布'"
               :type="'assetType'"
               :name="'assetsTwo'" />
                  <eventType :query="query"
               :tipname="'运行状态分布'"
               :type="'assetType'"
               :name="'assetsFour'" />
 <category :type="1" :tipname="'试点工业企业资产统计TOP5'"  :name="'assetsOne'" />
  <category :type="1" :tipname="'试点工业企业风险资产数TOP5'"  :name="'assetsThree'" />
  </div>
</template>

<script>
import Tip from '@/components/EchartsTip/index'
import eventType from '@/components/Echarts/eventType'
import category from '@/components/Echarts/echartsCategory'
import echarts from 'echarts'

export default {
  name: 'Device',
  components: { Tip, eventType,category },
  data () {
    return {
      charts: '',
      query: {},
      allAssets: '14992',
      onlineAssets: '12304',
      AssetsType: '10',
      ITNumber: '10',
      OTNumber: '8',
      offlineAssets: '1626',
      abnormalAssets: '1052',
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .elcolCard {
    .AssetsBox {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #df97d1 0%, #af449c 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        // .left {
        //   float: left;
        // }
        // .right {
        //   float: right;
        // }
      }
    }
    .AssetsBoxOnline {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #b56af9 0%, #6333b8 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxOffline {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #00bbeb 0%, #0085d2 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxUnNormal {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #3cd3aa 0%, #229b9f 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
    }
    .AssetsBoxType {
      width: 240px;
      height: 80px;
      background: linear-gradient(180deg, #4fa8e7 0%, #3570d4 100%);
      .Assets {
        text-align: center;
        // padding: 10px 80px 10px 10px;
        // border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
      }
      .AssetsNumber {
        width: 100%;
        height: 100px;
        // background-color: #5599ff;
        // color: #ffff77;
        // font-weight: 800;
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 20px;
      }
      .ITNumberBox {
        color: #fff;
        line-height: 20px;
        margin-bottom: 10px;
        .IT {
          color: #ffffff;
          font-size: 18px;
          margin-left: 36px;
        }
        .ITNumber {
          color: #ffffff;
          font-size: 28px;
          margin-bottom: 10px;
          margin-right: 30px;
        }
        .OTNumber {
          color: #ffffff;
          font-size: 28px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
