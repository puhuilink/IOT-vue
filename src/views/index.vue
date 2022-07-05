<template>
  <div class="page flex-col">
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
         <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next"  slot="button-next"></div>
    </swiper>
      </div>
    </div>
    <div class="box21 flex-col">
      <div class="main25 flex-row">
        <div class="section3 flex-col"></div>
        <span class="word2">安全监测子平台</span>
        <div class="section4 flex-col"></div>
        <span class="info5">综合管控子平台</span>
      </div>
      <div class="main26 flex-row">
        <div class="group2 flex-col">
          <div class="block12 flex-row"><span class="word3">安全监测</span></div>
          <div class="block13 flex-row justify-between">
             <a href="http://10.1.13.118:8001/bigScreen/overallSecurityPosture" target="_blank">
            <div class="ImageText81 flex-col justify-between">
              <div class="mod27 flex-col"></div>
              <div class="TextGroup81 flex-col"><span class="word4">总体态势</span></div>
            </div>
            </a>
             <a
                href="https://10.201.30.40/microapps/app-sso/index.html?token=e1a08736dede6c2f0f0ad2bfef727ce4d72b10ffd6ea32888cc0fd4e26bcaf15&redirectUrl=https://10.201.30.40/situation-awareness/integrated"
                target="_blank"
              >
            <div class="ImageText82 flex-col justify-between">
              <div class="group45 flex-col"></div>
              <div class="TextGroup82 flex-col"><span class="txt4">管理网安全态势</span></div>
            </div>
            </a>
             <a
                href="http://10.1.13.118:8001/bigScreen/productionSafety/zhuhaiScreen"
                target="_blank"
              >
            <div class="ImageText83 flex-col justify-between">
              <div class="mod28 flex-col"></div>
              <div class="TextGroup83 flex-col"><span class="txt5">试点单位安全态势</span></div>
            </div>
            </a>
            <a
                href="http://10.1.13.118:8001/management/events"
                target="_blank"
              >
            <div class="ImageText84 flex-col justify-between">
              <div class="outer35 flex-col"></div>
              <div class="TextGroup84 flex-col"><span class="word5">总体事件检索及分析</span></div>
            </div>
            </a>
          </div>
        </div>
        <div class="section7 flex-col">
          <div class="group46 flex-row"><span class="word11">数据挖掘</span></div>
          <div class="group47 flex-row justify-between">
               <a
            href="https://10.201.30.43:8988/noah/access/collector-manager"
            target="_blank"
          >
            <div class="ImageText85 flex-col justify-between">
              <div class="group48 flex-col"></div>
              <div class="TextGroup85 flex-col"><span class="txt9">数据接入</span></div>
            </div>
            </a>
             <a
          href="https://10.201.30.43:8988/noah/process/flows/flows-list"
          target="_blank"
        >
            <div class="ImageText86 flex-col justify-between">
              <div class="group49 flex-col"></div>
              <div class="TextGroup86 flex-col"><span class="info9">数据处理</span></div>
            </div>
            </a>
            <a
          href="https://10.201.30.43:8988/noah/process/rule-manage"
          target="_blank"
        >
            <div class="ImageText87 flex-col justify-between">
              <div class="block14 flex-col"></div>
              <div class="TextGroup87 flex-col"><span class="info10">规则管理</span></div>
            </div>
            </a>
          </div>
        </div>
        <div class="group6 flex-col">
          <div class="group50 flex-col justify-between">
            <span class="txt6">安全联动</span>
            <div class="group51 flex-row justify-between">
                <a
           href="https://10.201.30.40/devlink"
            target="_blank"
          >
              <div class="ImageText88 flex-col justify-between">
                <div class="layer21 flex-col"></div>
                <div class="TextGroup88 flex-col"><span class="txt7">防火墙联动</span></div>
              </div>
              </a>
               <a
          href="https://10.201.30.40/ti"
            target="_blank"
          >
              <div class="ImageText89 flex-col justify-between">
                <div class="block15 flex-col"></div>
                <div class="TextGroup89 flex-col">
                  <span class="paragraph2">
                    威胁情报
                    <br />
                    联动
                  </span>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div class="group7 flex-col">
          <div class="block16 flex-row"><span class="info7">威胁情报</span></div>
          <div class="block17 flex-row justify-between">
             <a :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=production-strategy'" target="_blank">
            <div class="ImageText90 flex-col justify-between">
              <div class="section36 flex-col"></div>
              <div class="TextGroup90 flex-col"><span class="info8">情报录入</span></div>
            </div>
            </a>
             <a
            href="https://10.1.51.199/app/mica/alarm/Intelligence?token=eyJhbGciOiJIUzI1NiJ9.empq.KqV-jdB2JMcH-O2wYUIcGtGZjcu-AhG2ZxmciliUBDQ"
            target="_blank"
          >
            <div class="ImageText91 flex-col justify-between">
              <div class="layer22 flex-col"></div>
              <div class="TextGroup91 flex-col"><span class="word8">情报告警</span></div>
            </div>
            </a>
             <a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=manage-intel'"  target="_blank">
            <div class="ImageText92 flex-col justify-between">
              <div class="block18 flex-col"></div>
              <div class="TextGroup92 flex-col"><span class="word9">情报分析</span></div>
            </div>
            </a>
             <a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=manage-source'" target="_blank">
            <div class="ImageText93 flex-col justify-between">
              <div class="outer36 flex-col"></div>
              <div class="TextGroup93 flex-col"><span class="word10">情报源管理</span></div>
            </div>
            </a>
            <a  :href="'http://10.201.30.60:80/intelligence/login-with-params?username=jiance&token=' +
            this.query.appToken +
            '&redirect=ioc-detail'" target="_blank">
            <div class="ImageText94 flex-col justify-between">
              <div class="section37 flex-col"></div>
              <div class="TextGroup94 flex-col"><span class="txt8">自定义情报</span></div>
            </div>
            </a>
          </div>
        </div>
      </div>
      <div class="main27 flex-row">
        <div class="section9 flex-col">
          <div class="group52 flex-row"><span class="info11">入侵诱捕</span></div>
          <div class="group53 flex-row justify-between">
                <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/honeypotEventRetrieval"
          target="_blank"
        >
            <div class="ImageText95 flex-col justify-between">
              <div class="layer23 flex-col"></div>
              <div class="TextGroup95 flex-col"><span class="word12">入侵诱捕</span></div>
            </div>
            </a>
             <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/statisticalSnalysis"
          target="_blank"
        >
            <div class="ImageText96 flex-col justify-between">
              <div class="mod29 flex-col"></div>
              <div class="TextGroup96 flex-col"><span class="word13">黑客溯源</span></div>
            </div>
            </a>
             <a
          href="http://10.1.13.118:8001/security/invasionOfTrap/honeypotEventRetrieval"
          target="_blank"
        >
            <div class="ImageText97 flex-col justify-between">
              <div class="box22 flex-col"></div>
              <div class="TextGroup97 flex-col"><span class="txt10">行为分析</span></div>
            </div>
            </a>
          </div>
        </div>
        <div class="bd5 flex-col">
          <div class="bd20 flex-col justify-between">
            <span class="txt12">异常分析</span>
            <div class="outer37 flex-row justify-between">
                 <a
          href="http://10.1.13.118:8001/management/eventEcharts"
          target="_blank"
        >
              <div class="ImageText98 flex-col justify-between">
                <div class="outer38 flex-col"></div>
                <div class="TextGroup98 flex-col">
                  <span class="infoBox3">
                    异常日志
                    <br />
                    检索
                  </span>
                </div>
              </div>
              </a>
                 <a href="http://10.1.13.118:8001/management/events" target="_blank">
              <div class="ImageText99 flex-col justify-between">
                <div class="bd21 flex-col"></div>
                <div class="TextGroup99 flex-col"><span class="txt13">分析及统计</span></div>
              </div>
</a>
            </div>
          </div>
        </div>
        <div class="section38 flex-col">
          <div class="bd22 flex-col justify-between">
            <span class="word24">数据安全</span>
             <a href="http://10.1.13.118:8001/security/dataSafe/echarts" target="_blank">
            <div class="ImageText100 flex-col justify-between">
              <div class="mod30 flex-col"></div>
              <div class="TextGroup100 flex-col">
                <span class="infoBox5">
                  数据
                  <br />
                  安全分析
                </span>
              </div>
            </div>
            </a>
          </div>
        </div>
        <div class="section10 flex-col">
          <div class="main28 flex-col justify-between">
            <span class="word14">配置核查</span>
              <a href="http://10.1.13.118:8001/security/inspect" target="_blank">
            <div class="ImageText101 flex-col justify-between">
              <div class="box23 flex-col"></div>
              <div class="TextGroup101 flex-col">
                <span class="infoBox2">
                  配置核查
                  <br />
                  管理
                </span>
              </div>
            </div>
</a>
          </div>
        </div>
        <div class="section12 flex-col">
          <div class="layer24 flex-col justify-between">
            <span class="word15">安全通报</span>
            <div class="group54 flex-row justify-between">
                <a href="http://10.1.13.118:8001/safety/InformManagement" target="_blank">
              <div class="ImageText102 flex-col justify-between">
                <div class="section39 flex-col"></div>
                <div class="TextGroup102 flex-col"><span class="word16">安全通报</span></div>
              </div>
              </a>
                <a href="http://10.1.13.30/portal/user/login" target="_blank">
              <div class="ImageText103 flex-col justify-between">
                <div class="layer25 flex-col"></div>
                <div class="TextGroup103 flex-col">
                  <span class="paragraph3">
                    安全管理
                    <br />
                    平台集成
                  </span>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div class="section13 flex-col">
          <div class="outer39 flex-col justify-between">
            <span class="txt11">安全态势</span>
            <div class="layer26 flex-row justify-between">
                <a href="http://10.1.51.199:8000/screen/alert" target="_blank">
              <div class="ImageText104 flex-col justify-between">
                <div class="layer27 flex-col"></div>
                <div class="TextGroup104 flex-col"><span class="info12">综合态势</span></div>
              </div>
              </a>
    <a href="http://10.1.51.199:8000/screen/asset" target="_blank">
              <div class="ImageText105 flex-col justify-between">
                <div class="section40 flex-col"></div>
                <div class="TextGroup105 flex-col"><span class="word17">资产态势</span></div>
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="main29 flex-row justify-between">
        <div class="wrap4 flex-col">
          <div class="main30 flex-col justify-between">
            <span class="info13">资产管理</span>
            <div class="box24 flex-row justify-between">
               <a href="http://10.1.13.118:8001/assetsManagement/assetSecurityStatisticalAnalysis" target="_blank">
              <div class="ImageText106 flex-col justify-between">
                <div class="block19 flex-col"></div>
                <div class="TextGroup106 flex-col">
                  <span class="paragraph4">
                    资产统计
                    <br />
                    分析
                  </span>
                </div>
              </div>
              </a>
              <a href="http://10.1.13.118:8001/assetsManagement/assetsManagementList" target="_blank">
              <div class="ImageText107 flex-col justify-between">
                <div class="group55 flex-col"></div>
                <div class="TextGroup107 flex-col"><span class="word19">资产列表</span></div>
              </div>
</a>
            </div>
          </div>
        </div>
        <div class="layer28 flex-col">
          <div class="block20 flex-row"><span class="word25">系统管理</span></div>
          <div class="block21 flex-row justify-between">
               <a
            href=" http://10.1.13.118:8001/system/user"
            target="_blank"
          >
            <div class="ImageText108 flex-col justify-between">
              <div class="mod31 flex-col"></div>
              <div class="TextGroup108 flex-col"><span class="word26">用户管理</span></div>
            </div>
          </a>
                <a
            href="http://10.1.13.118:8001/system/role"
            target="_blank"
          >
            <div class="ImageText109 flex-col justify-between">
              <div class="main31 flex-col"></div>
              <div class="TextGroup109 flex-col">
                <span class="paragraph9">
                  权限角色
                  <br />
                  管理
                </span>
              </div>
            </div>
          </a>
           <a
            href="http://10.1.13.118:8001/system/dict"
            target="_blank"
          >
            <div class="ImageText110 flex-col justify-between">
              <div class="bd23 flex-col"></div>
              <div class="TextGroup110 flex-col"><span class="word27">字典管理</span></div>
            </div>
          </a>
          <a
            href="http://10.1.13.118:8001/system/log/operlog"
            target="_blank"
          >
            <div class="ImageText111 flex-col justify-between">
              <div class="bd24 flex-col"></div>
              <div class="TextGroup111 flex-col">
                <span class="infoBox6">
                  审计日志
                  <br />
                  管理
                </span>
              </div>
            </div>
          </a>
          </div>
        </div>
      </div>
      <div class="main32 flex-row">
        <div class="block7 flex-col"></div>
        <span class="info14">基础防护子平台</span>
        <div class="layer7 flex-col"></div>
        <span class="word18">安全认证子平台</span>
      </div>
      <div class="main33 flex-row">
        <div class="block8 flex-col">
          <div class="bd25 flex-row"><span class="word20">云安全</span></div>
          <div class="bd26 flex-row justify-between">
              <a
            href="http://10.1.13.118:8001/security/applicationSecurityManagement/appTesting"
            target="_blank"
          >
            <div class="ImageText112 flex-col justify-between">
              <div class="bd27 flex-col"></div>
              <div class="TextGroup112 flex-col">
                <span class="infoBox4">
                  移动APP
                  <br />
                  安全
                </span>
              </div>
            </div>
          </a>
           <a
            href=" http://10.1.13.118:8001/security/applicationSecurityManagement/applicationManagement"
            target="_blank"
          >
            <div class="ImageText113 flex-col justify-between">
              <div class="layer29 flex-col"></div>
              <div class="TextGroup113 flex-col"><span class="info15">应用安全</span></div>
            </div>
          </a>
               <a
            href="https://10.201.207.3/assetSafeStateBigScreen/page?screenId=4"
            target="_blank"
          >
            <div class="ImageText114 flex-col justify-between">
              <div class="section41 flex-col"></div>
              <div class="TextGroup114 flex-col"><span class="word21">云主机安全</span></div>
            </div>
          </a>
             <a
            href="http://10.201.207.7/v3/#/app/assetcount/hardware?recordSearch=false"
            target="_blank"
          >   
            <div class="ImageText115 flex-col justify-between">
              <div class="box25 flex-col"></div>
              <div class="TextGroup115 flex-col"><span class="word22">虚拟化安全</span></div>
            </div>
          </a>
          </div>
        </div>
        <div class="wrap11 flex-col">
          <div class="section42 flex-col justify-between">
            <span class="txt14">工业主机安全</span>
              <a
            href="http://10.1.13.118:8001/security/hostSecurityManagement/hostSecuritySearch"
            target="_blank"
          >  
            
            <div class="ImageText116 flex-col justify-between">
              <div class="mod32 flex-col"></div>
              <div class="TextGroup116 flex-col">
                <span class="paragraph10">
                  工业主机
                  <br />
                  安全
                </span>
              </div>
            </div>
          </a>
          </div>
        </div>
        <div class="group14 flex-col">
          <div class="group56 flex-col justify-between">
            <span class="word23">安全认证</span>
            <div class="box26 flex-row justify-between">
              <div class="ImageText117 flex-col justify-between">
                <div class="outer40 flex-col"></div>
                <div class="TextGroup117 flex-col">
                  <span class="paragraph5">
                    PKI/CA
                    <br />
                    基础设施
                  </span>
                </div>
              </div>
              <div class="ImageText118 flex-col justify-between">
                <div class="group57 flex-col"></div>
                <div class="TextGroup118 flex-col"><span class="info16">智能加密终端身份管控平台</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main34 flex-row justify-between">
        <div class="group16 flex-col">
          <div class="bd28 flex-row"><span class="info17">数据安全</span></div>
          <div class="bd29 flex-row justify-between">
              <a
            href="http://10.1.13.118:8001/security/dataSafe/table"
            target="_blank"
          >
            <div class="ImageText119 flex-col justify-between">
              <div class="outer41 flex-col"></div>
              <div class="TextGroup119 flex-col">
                <span class="paragraph6">
                  邮件数据
                  <br />
                  防泄漏
                </span>
              </div>
            </div>
          </a>
            <a
            href="http://10.1.13.118:8001/security/dataSafe/table"
            target="_blank"
          >
            <div class="ImageText120 flex-col justify-between">
              <div class="mod33 flex-col"></div>
              <div class="TextGroup120 flex-col">
                <span class="paragraph7">
                  文件数据
                  <br />
                  防泄漏
                </span>
              </div>
            </div>
          </a>
            <a
            href="http://10.1.13.118:8001/security/dataSafe/pageTamperProofEvent"
            target="_blank"
          >
            <div class="ImageText121 flex-col justify-between">
              <div class="layer30 flex-col"></div>
              <div class="TextGroup121 flex-col"><span class="info18">网页防篡改</span></div>
            </div>
          </a>
           <a
          href="http://10.1.13.118:8001/security/dataSafe/table"
          target="_blank"
        >
            <div class="ImageText122 flex-col justify-between">
              <div class="mod34 flex-col"></div>
              <div class="TextGroup122 flex-col">
                <span class="paragraph8">
                  流量数据
                  <br />
                  防泄漏
                </span>
              </div>
            </div>
          </a>
          </div>
        </div>
        <div class="section43 flex-col">
          <div class="layer31 flex-col justify-between">
            <span class="info19">工业设备安全</span>
            <div class="ImageText123 flex-col justify-between">
              <div class="group58 flex-col"></div>
              <div class="TextGroup123 flex-col">
                <span class="paragraph11">
                  工业设备
                  <br />
                  安全
                </span>
              </div>
            </div>
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
         slidesPerView: 6,
        loop: true,
        spaceBetween: -30,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
           navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
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
<style scoped>
.swiper-button-prev{
	    width: 15px;
	    height: 30px;
	    background: url("./asset/img/leftbutton.png") no-repeat;
	}
	.swiper-button-next{
	    width: 15px;
	    height: 30px;
	    background: url("./asset/img/rightbutton.png") no-repeat;
	}
</style>