<template>
  <div >
    <div class="main1 flex-col">
      <div class="outer2 flex-row">
        <span class="word1">安全态势感知分析</span>
      </div>
      <div class="outer3 flex-row">
         <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>  <div class="outer6 flex-col">
        <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2H514ESG9_20220609083911"
                target="_blank"
              >
          <div class="section2 flex-col justify-between">
            <img
              class="pic1"
              referrerpolicy="no-referrer"
            src="./asset/img/picture_01.png" 
            />
            <span class="info2">总体安全态势</span>
          </div>
        </a>
        </div></swiper-slide>
      <swiper-slide>  <div class="outer6 flex-col">
         <a href="http://10.1.51.199:8000/screen/asset" target="_blank">
          <div class="group1 flex-col justify-between">
            <img
              class="img2"
              referrerpolicy="no-referrer"
               src="./asset/img/picture_02.png" 
            />
            <span class="txt2">资产态势</span>
          </div>
</a>
        </div></swiper-slide>
      <swiper-slide> <div class="outer6 flex-col">
          <a href="http://10.1.51.199:8000/screen/alert" target="_blank">
          <div class="mod1 flex-col justify-between">
            <img
              class="img3"
              referrerpolicy="no-referrer"
               src="./asset/img/picture_03.png" 
            />
            <span class="txt3">综合安全态势</span>
          </div>
</a>
        </div></swiper-slide>
       <swiper-slide> 
        <div class="outer6 flex-col">
            <a
                href="https://10.201.30.40/microapps/app-sso/index.html?token=e1a08736dede6c2f0f0ad2bfef727ce4d72b10ffd6ea32888cc0fd4e26bcaf15&redirectUrl=https://10.201.30.40/situation-awareness/integrated"
                target="_blank"
              >
          <div class="main2 flex-col justify-between">
            <img
              class="img4"
              referrerpolicy="no-referrer"
               src="./asset/img/picture_04.png" 
            />
            <span class="info3">管理网威胁态势</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
            <a
                href="https://10.201.30.40/situation/intranet?token=1689aa214982d88109aeab2abcbdc89c16a829d94c65603c9bd96d224d034696"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_05.png" 
            />
            <span class="info4">内网威胁态势</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
           <a
                href="https://10.201.30.40/situation/external?token=1689aa214982d88109aeab2abcbdc89c16a829d94c65603c9bd96d224d034696"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_06.png" 
            />
            <span class="info4">外部威胁态势</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
            <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2GXN3VE1A_20220321104906"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_07.png" 
            />
            <span class="info4">深中通道预制厂</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
           <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2H49MZAUT_20220530065346"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_08.png" 
            />
            <span class="info4">松通高速预制厂</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
           <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2H61QFW36_20220530065408"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_09.png" 
            />
            <span class="info4">乌尉高速制梁厂</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
           <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2H586JPBE_20220530065418"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_10.png" 
            />
            <span class="info4">玉湛高速制梁厂</span>
          </div>
</a>
        </div></swiper-slide>
        <swiper-slide> <div class="outer6 flex-col">
           <a
                href="http://10.1.13.118:8003/#/previewScreen?id=2H66KWEAZ_20220530065358"
                target="_blank"
              >
          <div class="layer1 flex-col justify-between">
            <img
              class="pic2"
              referrerpolicy="no-referrer"
              src="./asset/img/picture_11.png" 
            />
            <span class="info4">广州地铁钢筋厂</span>
          </div>
</a>
        </div></swiper-slide>
    </swiper>
      </div>
    </div>
    <div class="main3 flex-col">
      <div class="mod2 flex-row">
        <div class="section3 flex-col"></div>
        <span class="word2">安全监测子平台</span>
        <div class="section4 flex-col"></div>
        <span class="info5">综合管控子平台</span>
      </div>
      <div class="mod3 flex-row">
        <div class="group2 flex-col">
          <div class="block1 flex-row"><span class="word3">安全监测</span></div>
          <div class="block2 flex-row justify-between">
            <a href="http://10.1.13.118:8001/bigScreen/overallSecurityPosture" target="_blank">
            <div class="ImageText1 flex-col justify-between">
              <div class="section5 flex-col"></div>
              <div class="TextGroup1 flex-col">
                <span class="word4">总体态势</span>
              </div>
            </div>
</a>
 <a
                href="https://10.201.30.40/microapps/app-sso/index.html?token=e1a08736dede6c2f0f0ad2bfef727ce4d72b10ffd6ea32888cc0fd4e26bcaf15&redirectUrl=https://10.201.30.40/situation-awareness/integrated"
                target="_blank"
              >
            <div class="ImageText2 flex-col justify-between">
              <div class="outer12 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="txt4">管理网安全态势</span>
              </div>
            </div>
</a>

 <a
                href="http://10.1.13.118:8001/bigScreen/productionSafety/zhuhaiScreen"
                target="_blank"
              >
            <div class="ImageText3 flex-col justify-between">
              <div class="layer2 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="txt5">试点单位安全态势</span>
              </div>
            </div>
</a>
<a
                href="http://10.1.13.118:8001/management/events"
                target="_blank"
              >
            <div class="ImageText4 flex-col justify-between">
              <div class="box6 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="word5">总体事件检索及分析</span>
              </div>
            </div>
</a>
          </div>
        </div>
        <div class="group3 flex-col">
          <div class="group4 flex-row"><span class="word6">系统管理</span></div>
          <div class="group5 flex-row justify-between">
           
             <a
            href=" http://10.1.13.118:8001/system/user"
            target="_blank"
          >
            <div class="ImageText5 flex-col justify-between">
              <div class="outer13 flex-col"></div>
              <div class="TextGroup5 flex-col">
                <span class="word7">用户管理</span>
              </div>
            </div>
</a>
  <a
            href="http://10.1.13.118:8001/system/role"
            target="_blank"
          >
            <div class="ImageText6 flex-col justify-between">
              <div class="outer14 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="infoBox1">权限角色<br />管理</span>
              </div>
            </div>
</a>
  <a
            href="http://10.1.13.118:8001/system/dict"
            target="_blank"
          >
            <div class="ImageText7 flex-col justify-between">
              <div class="wrap1 flex-col"></div>
              <div class="TextGroup7 flex-col">
                <span class="word7">字典管理</span>
              </div>
            </div>
</a>
  <a
            href="http://10.1.13.118:8001/system/log/operlog"
            target="_blank"
          >
            <div class="ImageText8 flex-col justify-between">
              <div class="mod4 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="paragraph1">审计日志<br />管理</span>
              </div>
            </div>
</a>
          </div>
        </div>
        <div class="group6 flex-col">
          <div class="mod5 flex-col justify-between">
            <span class="txt6">安全联动</span>
            <div class="mod6 flex-row justify-between">
                <a
           href="https://10.201.30.40/devlink"
            target="_blank"
          >
              <div class="ImageText9 flex-col justify-between">
                <div class="section6 flex-col"></div>
                <div class="TextGroup9 flex-col">
                  <span class="word7">防火墙联动</span>
                </div>
              </div>
</a>
  <a
          href="https://10.201.30.40/ti"
            target="_blank"
          >
              <div class="ImageText10 flex-col justify-between">
                <div class="box7 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="paragraph2">威胁情报<br />联动</span>
                </div>
              </div>
</a>
            </div>
          </div>
        </div>
        <div class="group7 flex-col">
          <div class="layer3 flex-row"><span class="info7">威胁情报</span></div>
          <div class="layer4 flex-row justify-between">
            <a :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=production-strategy'" target="_blank">
            <div class="ImageText11 flex-col justify-between">
              <div class="bd1 flex-col"></div>
              <div class="TextGroup11 flex-col">
                <span class="word7">情报录入</span>
              </div>
            </div>
</a>
 <a
            href="https://10.1.51.199/app/mica/alarm/Intelligence?token=eyJhbGciOiJIUzI1NiJ9.empq.KqV-jdB2JMcH-O2wYUIcGtGZjcu-AhG2ZxmciliUBDQ"
            target="_blank"
          >
            <div class="ImageText12 flex-col justify-between">
              <div class="outer15 flex-col"></div>
              <div class="TextGroup12 flex-col">
                <span class="word7">情报告警</span>
              </div>
            </div>
</a>
 <a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=manage-intel'"  target="_blank">
            <div class="ImageText13 flex-col justify-between">
              <div class="wrap2 flex-col"></div>
              <div class="TextGroup13 flex-col">
                <span class="word7">情报分析</span>
              </div>
            </div>
</a>
 <a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=manage-source'" target="_blank">
            <div class="ImageText14 flex-col justify-between">
              <div class="box8 flex-col"></div>
              <div class="TextGroup14 flex-col">
                <span class="word7">情报源管理</span>
              </div>
            </div>
</a>
<a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=ioc-detail'" target="_blank">
            <div class="ImageText15 flex-col justify-between">
              <div class="main4 flex-col"></div>
              <div class="TextGroup15 flex-col">
                <span class="word7">自定义情报</span>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
      <div class="mod7 flex-row">
        <div class="section7 flex-col">
          <div class="layer5 flex-row">
            <span class="word11">数据挖掘</span>
          </div>
          <div class="layer6 flex-row justify-between">
             <a
            href="https://10.201.30.43:8988/noah/access/collector-manager"
            target="_blank"
          >
            <div class="ImageText16 flex-col justify-between">
              <div class="main5 flex-col"></div>
              <div class="TextGroup16 flex-col">
                <span class="word7">数据接入</span>
              </div>
            </div>
</a>
 <a
          href="https://10.201.30.43:8988/noah/process/flows/flows-list"
          target="_blank"
        >
            <div class="ImageText17 flex-col justify-between">
              <div class="section8 flex-col"></div>
              <div class="TextGroup17 flex-col">
                <span class="word7">数据处理</span>
              </div>
            </div>
</a>
 <a
          href="https://10.201.30.43:8988/noah/process/rule-manage"
          target="_blank"
        >
            <div class="ImageText18 flex-col justify-between">
              <div class="mod8 flex-col"></div>
              <div class="TextGroup18 flex-col">
                <span class="word7">规则管理</span>
              </div>
            </div>
</a>
          </div>
        </div>
        <div class="section9 flex-col">
          <div class="group8 flex-row">
            <span class="info11">入侵诱捕</span>
          </div>
          <div class="group9 flex-row justify-between">
             <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/honeypotEventRetrieval"
          target="_blank"
        >
            <div class="ImageText19 flex-col justify-between">
              <div class="bd2 flex-col"></div>
              <div class="TextGroup19 flex-col">
                <span class="word7">入侵诱捕</span>
              </div>
            </div>
</a>
 <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/statisticalSnalysis"
          target="_blank"
        >
            <div class="ImageText20 flex-col justify-between">
              <div class="group10 flex-col"></div>
              <div class="TextGroup20 flex-col">
                <span class="word7">黑客溯源</span>
              </div>
            </div>
</a>
  <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/honeypotEventRetrieval"
          target="_blank"
        >
            <div class="ImageText21 flex-col justify-between">
              <div class="outer16 flex-col"></div>
              <div class="TextGroup21 flex-col">
                <span class="word7">行为分析</span>
              </div>
            </div>
</a>
          </div>
        </div>
        <div class="section10 flex-col">
          <div class="main6 flex-col justify-between">
            <span class="word14">配置核查</span>
                <a href="http://10.1.13.118:8001/security/inspect" target="_blank">
            <div class="ImageText22 flex-col justify-between">
              <div class="section11 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="infoBox2">配置核查<br />管理</span>
              </div>
            </div>
            </a>

          </div>
        </div>
        <div class="section12 flex-col">
          <div class="mod9 flex-col justify-between">
            <span class="word15">安全通报</span>
            <div class="outer17 flex-row justify-between">
                 <a href="http://10.1.13.118:8001/safety/InformManagement" target="_blank">
              <div class="ImageText23 flex-col justify-between">
                <div class="block3 flex-col"></div>
                <div class="TextGroup23 flex-col">
                  <span class="word7">安全通报</span>
                </div>
              </div>
              </a>
                <a href="http://10.1.13.30/portal/user/login" target="_blank">
              <div class="ImageText24 flex-col justify-between">
                <div class="group11 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="paragraph3">安全管理<br />平台集成</span>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div class="section13 flex-col">
          <div class="block4 flex-col justify-between">
            <span class="txt11">安全态势</span>
            <div class="mod10 flex-row justify-between">
               <a href="http://10.1.51.199:8000/screen/alert" target="_blank">
              <div class="ImageText25 flex-col justify-between">
                <div class="bd3 flex-col"></div>
                <div class="TextGroup25 flex-col">
                  <span class="word7">综合态势</span>
                </div>
              </div>
</a>
                <a href="http://10.1.51.199:8000/screen/asset" target="_blank">
              <div class="ImageText26 flex-col justify-between">
                <div class="bd4 flex-col"></div>
                <div class="TextGroup26 flex-col">
                  <span class="word7">资产态势</span>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mod11 flex-row">
        <div class="wrap3 flex-col justify-between">
          <div class="bd5 flex-col">
            <div class="outer18 flex-col justify-between">
              <span class="txt12">异常分析</span>
              <div class="group12 flex-row justify-between">
                <a
          href="http://10.1.13.118:8001/management/eventEcharts"
          target="_blank"
        >
                <div class="ImageText27 flex-col justify-between">
                  <div class="box9 flex-col"></div>
                  <div class="TextGroup2 flex-col">
                    <span class="infoBox3">异常日志<br />检索</span>
                  </div>
                </div>
                </a>
                <a href="http://10.1.13.118:8001/management/events" target="_blank">
                <div class="ImageText28 flex-col justify-between">
                  <div class="outer19 flex-col"></div>
                  <div class="TextGroup28 flex-col">
                    <span class="word7">分析及统计</span>
                  </div>
                </div>
</a>
              </div>
            </div>
          </div>
          <div class="bd6 flex-row justify-between">
            <div class="layer7 flex-col"></div>
            <span class="word18">安全认证子平台</span>
          </div>
        </div>
        <div class="wrap4 flex-col">
          <div class="bd7 flex-col justify-between">
            <span class="info13">资产管理</span>
            <div class="main7 flex-row justify-between">
               <a href="http://10.1.13.118:8001/assetsManagement/assetSecurityStatisticalAnalysis" target="_blank">
              
              <div class="ImageText29 flex-col justify-between">
                <div class="block5 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="paragraph4">资产统计<br />分析</span>
                </div>
              </div>
              </a>
               <a href="http://10.1.13.118:8001/assetsManagement/assetsManagementList" target="_blank">
              <div class="ImageText30 flex-col justify-between">
                <div class="section14 flex-col"></div>
                <div class="TextGroup20 flex-col">
                  <span class="word7">资产列表</span>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div class="wrap5 flex-col justify-between">
          <div class="block6 flex-row justify-between">
            <div class="block7 flex-col"></div>
            <span class="info14">基础防护子平台</span>
          </div>
          <div class="block8 flex-col">
            <div class="main8 flex-row"><span class="word20">云安全</span></div>
            <div class="main9 flex-row justify-between">
              <a
            href="http://10.1.13.118:8001/security/applicationSecurityManagement/appTesting"
            target="_blank"
          >
              <div class="ImageText31 flex-col justify-between">
                <div class="outer20 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="infoBox4">移动APP<br />安全</span>
                </div>
              </div>
              </a>
                 <a
            href=" http://10.1.13.118:8001/security/applicationSecurityManagement/applicationManagement"
            target="_blank"
          >
             
              <div class="ImageText32 flex-col justify-between">
                <div class="main10 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="info15">应用安全</span>
                </div>
              </div>
              </a>
              <div class="ImageText33 flex-col justify-between">
                <div class="group13 flex-col"></div>
                <div class="TextGroup23 flex-col">
                  <span class="word7">云主机安全</span>
                </div>
              </div>
              <div class="ImageText34 flex-col justify-between">
                <div class="layer8 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="word7">虚拟化安全</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mod12 flex-row justify-between">
        <div class="group14 flex-col">
          <div class="group15 flex-col justify-between">
            <span class="word23">安全认证</span>
            <div class="mod13 flex-row justify-between">
              <div class="ImageText35 flex-col justify-between">
                <div class="outer21 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="paragraph5">PKI/CA<br />基础设施</span>
                </div>
              </div>
              <div class="ImageText36 flex-col justify-between">
                <div class="section15 flex-col"></div>
                <div class="TextGroup2 flex-col">
                  <span class="info16">智能加密终端身份管控平台</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group16 flex-col">
          <div class="layer9 flex-row">
            <span class="info17">数据安全</span>
          </div>
          <div class="layer10 flex-row justify-between">
              <a
            href="http://10.1.13.118:8001/security/dataSafe/table"
            target="_blank"
          >
            <div class="ImageText37 flex-col justify-between">
              <div class="outer22 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="paragraph6">邮件数据<br />防泄漏</span>
              </div>
            </div>
            </a>
              <a
            href="http://10.1.13.118:8001/security/dataSafe/table"
            target="_blank"
          >
            <div class="ImageText38 flex-col justify-between">
              <div class="layer11 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="paragraph7">文件数据<br />防泄漏</span>
              </div>
            </div>
            </a>
             <a
            href="http://10.1.13.118:8001/security/dataSafe/pageTamperProofEvent"
            target="_blank"
          >
            <div class="ImageText39 flex-col justify-between">
              <div class="outer23 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="word7">网页防篡改</span>
              </div>
            </div>
            </a>
              <a
          href="http://10.1.13.118:8001/security/dataSafe/table"
          target="_blank"
        >
            <div class="ImageText40 flex-col justify-between">
              <div class="section16 flex-col"></div>
              <div class="TextGroup2 flex-col">
                <span class="paragraph8">流量数据<br />防泄漏</span>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import {  getToken } from '@/api/system/echarts'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
       query:{
       token:'', //微步token
       appToken:'' //APP加固token
      },
      swiperOption: {
         slidesPerView: 5,
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
   async created(){
      await Promise.all([
       this.getAppToken(),
    // this.getToken()
    ])
  },
  methods: {
     async getAppToken(){ 
    const res = await getToken()
    this.query.appToken = res
    },   
    // async getToken(){
    // const res = await getAPPtoken()
    // this.query.token = res
    // },
  }
}
</script>
<style src="./asset/css/common.css" />

<style src="./asset/css/index.css" />
