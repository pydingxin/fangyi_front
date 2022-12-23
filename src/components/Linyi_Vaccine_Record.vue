<script>

export default {
  data() {
    return {
      waiting_result:false,

      card_no:'',
      name:'',

      data:[],
      //表格的列
      columns:[
        { title: '次数', dataIndex: 'vaccineCount' },
        { title: '时间', dataIndex: 'inoculateDate' },
        { title: '地点', dataIndex: 'lastStationName' },
      ],

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
      this.post_api('Linyi_Vaccine_Record', {
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
              if('vaccineList' in jd && jd.vaccineList.length > 0){
                that.data= jd.vaccineList.sort((a,b)=>a.vaccineCount<b.vaccineCount?-1:0);
                got_result=true;
              }
            }else{
              that.message.warning(jd.msg);
              that.data=[];
            }
      }}
        if(!got_result){
          that.message.warning("无相关数据");
          that.data=[];
        }
      })
    },

    
  },
  }
</script>

<template>

  <p>信息不太全，建议使用国家卫健委接口</p>

  <a-space>
    <a-input v-model:value="name" class="input" placeholder="输入姓名" />
    <a-input v-model:value="card_no" class="input" placeholder="输入身份证号" />
    <a-button id="query" @click="query" size="large" type="primary">查询</a-button>
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

.input{
  width:12em;
  font-size: 1.2rem;
}

</style>
