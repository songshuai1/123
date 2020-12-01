// 封装axios 需要去添加请求的拦截器 (添加请求头)
// 导入axios
import axios from 'axios'
import store from '@/Store/vueX'
let cityId = store.state.cityId
// 设置基础域名
axios.defaults.baseURL = "https://m.maizuo.com/"

// 请求拦截器的处理,添加一个请求头 
axios.interceptors.request.use(
    function (config) {
        let host = ''
        let info = config.headers.info
        if (info == 'film') {
            host = ' mall.film-ticket.film.list';
        }
        if (info == 'cinema') {
            host = "mall.film-ticket.cinema.list"
        }
        if (info == 'info') {
            host = " mall.film-ticket.film.info"
        }
        if (info == 'banners') {
            host = "mall.cfg.cinema.banners"
        }
        if (info == 'city') {
            host = 'mall.film-ticket.city.list'
        }
        if (info == 'show-cinema') {
            host = 'mall.film-ticket.cinema.film-show-cinema'
        }
        if (info == 'batch-cinema') {
            host = 'mall.film-ticket.cinema.batch-cinema'
        }
        if (info == 'cinema.info') {
            host = 'mall.film-ticket.cinema.info'
        }
        if (info == 'cinema-show-film') {
            host = 'mall.film-ticket.film.cinema-show-film'
        }
        if (info == 'schedule.list') {
            host = 'mall.film-ticket.schedule.list'
        }
        if (config.headers.authorization) {
            config.headers = {
                authorization: config.headers.authorization,
            };
        } else {
            config.headers = {
                "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"16006566672048699400193","bc":"${cityId}"}`,
                "X-Host": host,
            };
        }
        return config
    }, function (err) {
        // 错误处理
    })
// 导出封装好的axios 供后续使用
export default axios 