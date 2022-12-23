<script>

function jzrq_format(s){
    //'20200409T120630' → '2020-04-09 12:06:30'
    return  s.substr(0,4)+ '-'+ s.substr(4,2)+ '-'+ 
            s.substr(6,2)+ ' '+ s.substr(9,2)+ ':'+ 
            s.substr(11,2)+ ':'+ s.substr(13,2);
}

let jzdmap={
    "11":"北京市",
    "12":"天津市",
    "13":"河北省",
    "14":"山西省",
    "15":"内蒙古自治区",
    "21":"辽宁省",
    "22":"吉林省",
    "23":"黑龙江省",
    "31":"上海市",
    "32":"江苏省",
    "33":"浙江省",
    "34":"安徽省",
    "35":"福建省",
    "36":"江西省",
    "37":"山东省",
    "41":"河南省",
    "42":"湖北省",
    "43":"湖南省",
    "44":"广东省",
    "45":"广西壮族自治区",
    "46":"海南省",
    "50":"重庆市",
    "51":"四川省",
    "52":"贵州省",
    "53":"云南省",
    "54":"西藏自治区",
    "61":"陕西省",
    "62":"甘肃省",
    "63":"青海省",
    "64":"宁夏回族自治区",
    "65":"新疆维吾尔自治区",
    "71":"台湾省",
    "81":"香港特别行政区",
    "82":"澳门特别行政区",
    "66":"新疆兵团",
    "55":"疫苗生产企业",
    "77":"外省",
    "88":"港澳台",
    "99":"国外",
}

let scqymap={
  "02":"北京生物制品研究所有限责任公司",
  "04":"北京科兴生物制品有限公司",
  "10":"武汉生物制品研究所有限责任公司",
  "11":"成都生物制品研究所有限责任公司",
  "12":"中国医学科学院医学生物学研究所",
  "13":"兰州生物制品研究所有限责任公司",
  "14":"长春生物制品研究所有限责任公司",
  "36":"深圳康泰生物制品股份有限公司",
  "66":"科兴（大连）疫苗技术有限公司",
  "68":"北京智飞绿竹生物制药有限公司",
  "80":"北京科兴中维生物技术有限公司",
  "81":"康希诺生物股份公司",
  "82":"安徽智飞龙科马生物制药有限公司",
}

let ymmcmap={
    "5601":"新冠疫苗（Vero细胞）",
    "5602":"新冠疫苗（腺病毒载体）",
    "5603":"新冠疫苗（CHO细胞）",
}

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
        { title: '剂次', dataIndex: 'jc' },
        { title: '接种日期', dataIndex: 'jzrq' },
        { title: '接种地', dataIndex: 'jzd' },
        { title: '疫苗名称', dataIndex: 'ymmc' },
        { title: '生产企业', dataIndex: 'scqy' },
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
      this.post_api('Weijianwei_Vaccine_Record', {
        'card_no': this.card_no,
        'name': this.name,
      }, (ret)=>{
        this.waiting_result=false;

        if(ret==""){that.message.warning("返回空字符串"); return;}
        let jd=JSON.parse(ret);

        if("code" in jd && jd.code!="200"){that.message.warning(jd.msg); return;}

        jd=JSON.parse(jd.data);
     
        if(("code" in jd && jd.code!="200") || ("data" in jd && jd.data=="")) {that.message.warning(jd.message); return;}
        if("data" in jd){jd=JSON.parse(jd.data);}
        if("jzxxlb" in jd){
          let arr=JSON.parse(jd.jzxxlb);
          arr = arr.map(x=>{
            return {
              "jc":x.jc,
              "ymmc":ymmcmap[x.ymmc],
              "jzrq":jzrq_format(x.jzrq),
              "scqy":scqymap[x.scqy],
              "jzd":jzdmap[x.jzd],
            }
          })
          that.data = arr;
        }
       
      })
    },

    
  },
  }
</script>

<template>
  <p>疫苗接种详情，山东代理国家卫健委接口</p>

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
