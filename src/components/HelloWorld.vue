<script>
import dabaiImg from "../assets/dabai.png"; 



export default {
  data() {
    return {
      dabaiImg:dabaiImg,
      gonggao_msg:"",
    }
  },
  mounted(){
    let that=this;

    //公告栏信息在/public/gonggao.json里
    fetch("/gonggao.json",{
      method:"GET",
      headers:{_:new Date().toUTCString(),},
    }).then(response => response.json())
    .then(jd=>{
      that.gonggao_msg=jd.data;
    })

  },

}
</script>

<template>
    <img id="dabaiimg" :src="dabaiImg" />
  <div id="gonggao">
    <h3>公告栏</h3>
    <h4> 
      <a-tag color="#f50">1</a-tag>
      只能在政务外网访问 
    </h4>
    <h4>
      <a-tag color="#2db7f5">2</a-tag>
      仅用于平邑疫情防控 禁止数据外泄
    </h4>
    <h4>
      <a-tag color="#87d068">3</a-tag>
      数据来自推送或接口 有几小时延迟
    </h4>
    <h4>
      <a-tag color="#108ee9">4</a-tag>
      联系人：平邑县大数据中心丁鑫 18653923866
    </h4>
    <h4>{{gonggao_msg}}</h4>
  </div>

</template>

<style scoped>
h3 {
  font-weight: 500;
  font-size: 1.8rem;
}

h4 {
  font-weight: 500;
  font-size: 1.5rem;
}
#gonggao{
  margin: 1rem;
  position: relative;
  left:23rem;
  top:-25rem;
  width: 40rem;

  padding:1rem;
  padding-left: 2rem;

  

  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: #fffffe;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255,255,255,0.4) solid;
  border-bottom: 2px rgba(40,40,40,0.35) solid;
  border-right: 2px rgba(40,40,40,0.35) solid;
}

#dabaiimg{
  max-width:30rem;
  max-height:30rem;
}
</style>
