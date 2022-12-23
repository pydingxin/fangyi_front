import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App);

// -----------------------------------------------------
//引入antdv相关
import 'ant-design-vue/dist/antd.css';

import { 
    Button, 
    message ,
    Input,
    Table,
    Layout,
    Tag,
    Menu,
    Space,
    Image,
    Grid,
    Divider,
    Spin,
} from 'ant-design-vue';


app.config.globalProperties.message = message;

app.use(Button)
.use(Input)
.use(Table)
.use(Grid)
.use(Layout)
.use(Menu)
.use(Space)
.use(Tag)
.use(Image)
.use(Spin)
.use(Divider)
.mount('#app');


// -----------------------------------------------------
//引入自定义工具函数
import tool from './assets/tool.js'
app.config.globalProperties.post_api=tool.post_api;
app.config.globalProperties.JSONToExcelConvertor = tool.JSONToExcelConvertor;
app.config.globalProperties.is_post_api_input_valid = tool.is_post_api_input_valid;


// -----------------------------------------------------
// 加密
import CryptoJS  from 'crypto-js';
app.config.globalProperties.CryptoJS = CryptoJS;


// -----------------------------------------------------
import axios from 'axios';
app.config.globalProperties.axios = axios;