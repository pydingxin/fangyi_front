<script>


export default {
  data() {
    return {
      waiting_result:false,
      card_no:'',

    }
  },


  methods: {

    queryInfo(){
      if(!this.is_post_api_input_valid('card_no',this.card_no)){
        this.message.error("身份证号长度错误")
        return;
      }
      console.log(this.aesEnc("dingxin"))
      let that=this;


    },


  },
}
</script>

<template>
  <p class="txt">省内最近一次采样时间，调用省接口</p>
  <a-space>
    <a-input v-model:value="card_no"  id="input" placeholder="输入身份证号" />
    <a-button id="query" @click="queryInfo" size="large" type="primary">查询</a-button>
    <a-spin v-show="waiting_result"></a-spin>
  </a-space>
  <br/>
  <br/>

</template>

<style scoped>
.txt{
  font-size: 1.2rem;

}
#input{
  width:12em;
  font-size: 1.2rem;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

</style>
