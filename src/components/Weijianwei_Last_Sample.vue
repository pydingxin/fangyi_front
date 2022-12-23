<script>

export default {
  data() {
    return {
      waiting_result:false,
      last_dt:'',
      card_no:'',
      name:'',

      data:[],
      //表格的列
      columns:[
        { title: '姓名', dataIndex: 'xm' },
        { title: '证件号', dataIndex: 'zjhm' },
        { title: '采样点', dataIndex: 'hsjcjgmc' },
        { title: '采样时间', dataIndex: 'hsjcsj' },
        { title: '结果', dataIndex: 'hsjcjg' },
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
      this.post_api('Weijianwei_Last_Sample', {
        'card_no': this.card_no,
        'name': this.name,
      }, (ret)=>{
        this.waiting_result=false;

        if(ret==""){that.message.warning("返回空字符串"); return;}
        let jd=JSON.parse(ret);

        if("code" in jd && jd.code!="200"){that.message.warning(jd.msg); return;}

        jd=JSON.parse(jd.data);
        if("errMsg" in jd && jd.errMsg!="") {that.message.warning(jd.errMsg); return;}
        if(("code" in jd && jd.code!="200") || ("data" in jd && jd.data=="")) {that.message.warning(jd.message); return;}
        if("data" in jd){that.data = [jd.data];}
       
      })
    },

    
  },
  }
</script>

<template>
  <p>国内最近一次核酸情况，山东代理接口，数据也有延迟</p>

  <a-space>
    <a-input v-model:value="name" class="input"   placeholder="输入姓名" />
    <a-input v-model:value="card_no" class="input"  placeholder="输入身份证号" />
    <a-button id="query" @click="query" size="large" type="primary">查询</a-button>
    <a-spin v-show="waiting_result"></a-spin>
  </a-space>

  <br />

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
