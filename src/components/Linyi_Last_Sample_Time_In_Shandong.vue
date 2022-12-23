<script>

export default {
  data() {
    return {
      waiting_result:false,
      last_dt:'',
      card_no:'',
      name:'',
    }
  },


  methods: {
    query(){
      if(!this.is_post_api_input_valid('card_no',this.card_no)){
        this.message.error("身份证号长度错误")
        return;
      }
      if(this.name.length==0){
        this.message.error("输入名字")
        return;
      }

      this.waiting_result=true;
      let that=this;
      this.post_api('Linyi_Last_Sample_Time_In_Shandong', {
        'card_no': this.card_no,
        'name': this.name,
      }, (ret)=>{
        this.waiting_result=false;
        let got_result=false;

        let jd=JSON.parse(ret);
        if('data' in jd){
          jd=JSON.parse(jd.data);
          if('data' in jd){
            jd=JSON.parse(jd.data);
            if(jd.success==true){
              jd=jd.data;
              if(jd.isTest==1){
                that.last_dt= "最后一次核酸时间："+jd.testTime;
              }else{ 
                that.message.error("无数据");
                that.last_dt='';
              }
            }else{
              that.message.error(jd.msg);
              that.last_dt='';
            }
      }}
       
      })
    },

    
  },
  }
</script>

<template>
  <p>市代理接口，有若干小时延迟</p>

  <a-space>
    <a-input v-model:value="name" class="input"   placeholder="输入姓名" />
    <a-input v-model:value="card_no" class="input"  placeholder="输入身份证号" />
    <a-button id="query" @click="query" size="large" type="primary">查询</a-button>
    <a-spin v-show="waiting_result"></a-spin>
  </a-space>

  <br />

  <p> {{last_dt}} </p>

</template>

<style scoped>
p{
  font-size: 1.2rem;

}
#cardno{
  width:12em;
  font-size: 1.2rem;
}

.input{
  width:12em;
  font-size: 1.2rem;
}


</style>
