const baseUrl = 'http://localhost:5050';
const log = console.log.bind(console)

const ajax = function (method, path, data, callback) {
    let r = new XMLHttpRequest();
    r.open(method, path, true);
    // log(r.method);
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
    Vue.prototype.$admin = new Admin()
    Vue.prototype.$book = new Book()

}

class Base {
    constructor(path) {
        this.baseUrl = baseUrl + '/' + path
    }

    get (path, callback) {
        let url = this.baseUrl + path
        ajax('GET', url, '', function (r) {
            let data = JSON.parse(r)
            callback(data)
        })
    }

    post(path, data, callback) {
        let url = this.baseUrl + path
        data = JSON.stringify(data)
        ajax('POST', url, data, function (r) {
            let data = JSON.parse(r)
            callback(data)
        })
    }
}

class Admin extends Base {
    constructor() {
        super('login')
    }

    login(name, password, callback) {
        this.post('', {
            name: name,
            password: password,
        }, callback)
    }

    check_login(callback) {
        this.get('/check', callback)
    }
}

class Book extends Base {
    constructor() {
        super('book')
    }

    getById(id, callback) {
        let path = `/${id}`
        this.get(path, callback)
    }

    all(callback) {
        let path = '/all'
        this.get(path, callback)
    }

    del(id, callback) {
        let path = '/delete/' + id
        this.get(path, callback)
    }

    add(data, callback) {
        let path = '/add'
        this.post(path, data, callback)
    }

    update(id, data, callback) {
        let path = '/update/' + id
        this.post(path, data, callback)
    }

    getByTitle(title, callback) {
        let path = `/get?title=${title}`
        this.get(path, callback)
    }
}

export default Api
