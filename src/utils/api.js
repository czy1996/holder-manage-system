const baseUrl = 'http://localhost:5050';
const log = console.log.bind(console)

const ajax = function (method, path, data, callback) {
    let r = new XMLHttpRequest();
    r.open(method, path, true);
    log(r.method);
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            callback(r.response)
        }
    };
    // data = JSON.stringify(data)
    r.withCredentials = true;
    r.send(data)
};

let Api = {}

Api.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.prototype.$admin = new Admin(baseUrl)
}

class Admin {
    constructor() {
        this.baseUrl = baseUrl
    }

    get (path, callback) {
        let url = this.baseUrl + path
        ajax('GET', url, '', function (r) {
            let data = JSON.parse(r)
            callback(data)
        })
    }

    post (path, data, callback) {
        let url = this.baseUrl + path
        data = JSON.stringify(data)
        ajax('POST', url, data, function(r){
            let data = JSON.parse(r)
            callback(data)
        })
    }

    login (name, password, callback) {
        this.post('/login', {
            name: name,
            password: password,
        }, callback)
    }

    check_login(callback) {
        this.get('/login/check', callback)
    }
}

export default Api
