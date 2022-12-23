<script>

export default {
  data() {
    return {
      waiting_result:false,

      card_no:'',
      ldt:"2022-11-16 00:00:00",
      rdt:"2022-11-20 00:00:00",

      //返回的数据
      data:[],

      //表格的列
      columns:[
        { title: '姓名', dataIndex: 'Name' },
        { title: '证件号', dataIndex: 'CardNo' },
        { title: '住址', dataIndex: 'Address' },
        { title: '手机号', dataIndex: 'Phone' },
        { title: '采样账号', dataIndex: 'CreateBy' },
        { 
          title: '采样时间', 
          dataIndex: 'CreateTime' ,
          sorter: (a, b) => (a.CreateTime<b.CreateTime)?-1:1,
        },
        { title: '采样点', dataIndex: 'Realname' },
        { title: '包码', dataIndex: 'PackageId' },
        { title: '管码', dataIndex: 'SampleTube' },
      ],
    }
  },


  methods: {
    queryInfo(){

      if(!this.is_post_api_input_valid('card_no',this.card_no)){
        this.message.error("身份证号长度错误")
        return;
      }

      if(!this.is_post_api_input_valid('dt',this.ldt) || !this.is_post_api_input_valid('dt',this.rdt)){
        this.message.error("日期时间格式错误")
        return;
      } 

      let that=this;
      let jdata={card_no:that.card_no, ldt:that.ldt, rdt:that.rdt}
      this.waiting_result=true;
      this.post_api('same_tube', jdata, (ret)=>{
        this.waiting_result=false;
        // ret.msg是数组
        if(ret.msg.length==0){that.message.warning("无相关数据");return;}
        that.data=ret.msg.flatMap(x=>x);
      })
    },


  },
  }
</script>

<template>
  <p class="txt">同管核酸</p>
  <a-space>
    <a-input v-model:value="card_no"  id="input" placeholder="输入身份证号" />
    <a-input v-model:value="ldt"  id="input" placeholder="输入开始时间" />
    至
    <a-input v-model:value="rdt"  id="input" placeholder="输入结束时间" />
    <a-button id="query" @click="queryInfo" size="large" type="primary">查询</a-button>
    <a-button id="outportBtn" @click="JSONToExcelConvertor(data, '同管核酸')" size="large" type="primary">导出excel</a-button>
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
.txt{
  font-size: 1.2rem;

}

.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
#input{
  width:12em;
  font-size: 1.2rem;
}


</style>
