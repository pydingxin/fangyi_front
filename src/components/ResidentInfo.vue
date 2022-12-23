<script>

export default {
  data() {
    return {
      waiting_result:false,

      card_no:'',
      
      data:[],
      //表格的列
      columns:[
        { title: '证件号', dataIndex: 'CardNo' },
        { title: '姓名', dataIndex: 'Name' },
        { title: '手机号', dataIndex: 'Phone' },
        { title: '所属镇', dataIndex: 'Zhen' },
        { title: '所属村', dataIndex: 'Cun' },
        { title: '曾用地址', dataIndex: 'Address' },
      ],
    }
  },


  methods: {
    queryResidentInfo(){
      if(!this.is_post_api_input_valid('card_no',this.card_no)){
        this.message.error("身份证号长度错误")
        return;
      }
      /*
        返回  msg: {
                "CardNo": "",
                "Name": "",
                "Phone": "",
                "Zhen": "",
                "Cun": "",
                "Address": ""
              }
        */

      this.waiting_result=true;
      let that=this;
      this.post_api('resident_info', {'card_no': this.card_no}, (ret)=>{
        this.waiting_result=false;
        if(ret.msg.Name=='') that.message.warning("无相关数据");
        that.data=[ret.msg];
      })
    },

    
  },
  }
</script>

<template>
  <p>本模块居民信息来自原平邑县核酸系统</p>

  <a-space>
    <a-input v-model:value="card_no"  id="cardno" placeholder="输入身份证号" />
    <a-button id="query" @click="queryResidentInfo" size="large" type="primary">查询</a-button>
    <a-button id="outportBtn" @click="JSONToExcelConvertor(data, '居民信息')" size="large" type="primary">导出excel</a-button>
    <a-spin v-show="waiting_result"></a-spin>
  </a-space>

  <br/>
  <br/>

  <a-table
    class="ant-table-striped"
    size="large"
    :columns="columns"
    :data-source="data"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
  />
</template>

<style scoped>
p{
  font-size: 1.2rem;

}
#cardno{
  width:12em;
  font-size: 1.2rem;
}


</style>
