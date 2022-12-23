<script>
import HelloWorld from './components/HelloWorld.vue'

import ResidentInfo from './components/ResidentInfo.vue'

import SampleInfo from './components/SampleInfo.vue'
import SameTube from './components/SameTube.vue'
import PlaceVisitorRecord from './components/PlaceVisitorRecord.vue'
import VisitorRecord from './components/VisitorRecord.vue'


import Linyi_Last_Sample_Time_In_Shandong from './components/Linyi_Last_Sample_Time_In_Shandong.vue'
import Linyi_Vaccine_Record from './components/Linyi_Vaccine_Record.vue'


import Weijianwei_Last_Sample from './components/Weijianwei_Last_Sample.vue'
import Weijianwei_Vaccine_Record from './components/Weijianwei_Vaccine_Record.vue'


import { 
  LaptopOutlined, 
  CloudDownloadOutlined,
  BranchesOutlined,
  ApiOutlined,
} from '@ant-design/icons-vue';


export default {
  data() {
    return {
      selectedApi: "HelloWorld",
    }
  },

  components: {
    HelloWorld,

    ResidentInfo,

    SampleInfo,
    SameTube,
    PlaceVisitorRecord,
    VisitorRecord,

    Linyi_Last_Sample_Time_In_Shandong,
    Linyi_Vaccine_Record,

    Weijianwei_Last_Sample,
    Weijianwei_Vaccine_Record,

    CloudDownloadOutlined,
    LaptopOutlined,
    ApiOutlined,
    BranchesOutlined,
  },

  methods: {
    hello(){alert('hello')},
  },

  mounted() {
    console.log(`The initial count is.`)
  }
}
</script>

<template>
<div class="topContainer">
  <a-layout-header>
    <span class="flick_text">平邑防疫查询</span>
  </a-layout-header>
  <a-layout>
    <a-layout style="padding-top:10px">
      <a-layout-sider theme="light">
        <a-menu mode="inline">

          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <laptop-outlined />
                本地数据
              </span>
            </template>
            <a-menu-item key="11"  @click="selectedApi='ResidentInfo'">居民信息</a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <cloud-download-outlined />
                市推数据
              </span>
            </template>
            <a-menu-item key="21" @click="selectedApi='SampleInfo'">采样记录</a-menu-item>
            <a-menu-item key="22" @click="selectedApi='SameTube'">同管核酸</a-menu-item>
            <a-menu-item key="23" @click="selectedApi='PlaceVisitorRecord'">场所扫码</a-menu-item>
            <a-menu-item key="24" @click="selectedApi='VisitorRecord'">人员扫码</a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <api-outlined />
                山东省接口
              </span>
            </template>
            <a-menu-item key="31"  @click="selectedApi='Linyi_Vaccine_Record'">疫苗接种记录</a-menu-item>
            <a-menu-item key="32"  @click="selectedApi='Linyi_Last_Sample_Time_In_Shandong'">省内上次核酸</a-menu-item>
          </a-sub-menu>

          
          <a-sub-menu key="sub4">
            <template #title>
              <span>
                <branches-outlined />
                国家卫健委接口
              </span>
            </template>
            <a-menu-item key="41"  @click="selectedApi='Weijianwei_Vaccine_Record'">疫苗接种记录</a-menu-item>
            <a-menu-item key="42"  @click="selectedApi='Weijianwei_Last_Sample'">国内上次核酸</a-menu-item>
            <a-menu-item key="43"  @click="message.info('正在协调接口')">区域疫情风险等级[开发中]</a-menu-item>
          </a-sub-menu>

          
        </a-menu>
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '4px', margin: 0, minHeight: '80px' }">
          <KeepAlive>
            <component :is="selectedApi"/>
          </KeepAlive>
        </a-layout-content>
      </a-layout>
    </a-layout>

  </a-layout>


</div>

</template>

<style scoped>
.topContainer{
  width: 100%;
  margin: 0;
  padding: 0%
}
.ant-layout-has-sider{
  min-height:850px;
}

.ant-layout{
  background-color: white;
}

.ant-layout-footer{
  padding-top: 10px;
  padding-bottom: 10px;

}
.ant-layout-header {
  color: 	black ;
  background-color: #99CC99  ;
  text-align:center;
  letter-spacing: 0.5rem;
  font-size: 2rem;
  font-family:"Times New Roman", Times, serif;
  font-weight: bolder;
  min-height: 2rem;
}

div.ant-layout-sider-children span{
  font-size: 1.04rem;
}

/* header字体动效 */
.flick_text{-webkit-animation:flicker-1 5s linear infinite both;animation:flicker-1 5s linear infinite both}
@-webkit-keyframes flicker-1{0%,100%{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}}@keyframes flicker-1{0%,100%{opacity:1}41.99%{opacity:1}42%{opacity:0}43%{opacity:0}43.01%{opacity:1}47.99%{opacity:1}48%{opacity:0}49%{opacity:0}49.01%{opacity:1}}
</style>
