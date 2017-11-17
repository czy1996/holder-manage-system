import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import {log} from './utils/utils'
import Cookies from 'js-cookie'
import Api from './utils/api'

Vue.use(ElementUI);
Vue.use(Api);

Vue.prototype.$axios = axios;
Vue.prototype.log = log;
new Vue({
    router,
    render: h => h(App),
    methods: {
        checkLogin() {
            // if(!Cookies.get('Session-id')){
            //     this.log('未登录')
            //     this.$router.push('/login')
            // } else {
            //     this.log('cookies found', Cookies.get('Session-id'))
            // }
            this.$admin.check_login(data => {
                if (data.status === 'fail') {
                    this.$router.push('/login')
                }
            })
        }
    },

    created() {
        this.checkLogin();
        this.log(this.admin)
    },

    watch: {
        "$route": 'checkLogin',
    }
}).$mount('#app');
