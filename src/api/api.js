// 发送具体的请求
// 导入需要使用的模块
import http from "@/api/http"
import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetailUrl,
    movieCinema,
    movieGateway,
    cityListUrl,
    loginUrl,
    centerUrl,
    TheTicketAddress,
    buyTicketCinema,
    purchaseCinema,
    movie
} from "@/config/url"
import store from '@/Store/vueX'

// 请求正在热映的列表数据
export const nowPlayingListData = num => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'film'
    http.defaults.headers.authorization = '';

    return http.get(nowPlayingListUrl + num + '&cityId=' + cityId)
}
// 请求的即将上映列表数据
export const comingSoonListData = num => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'film'
    http.defaults.headers.authorization = '';

    return http.get(comingSoonListUrl + num + '&cityId=' + cityId)
}
// 请求电影详情的数据
export const movieDetailData = num => {
    http.defaults.headers.info = 'info'
    http.defaults.headers.authorization = '';
    return http.get(movieDetailUrl + num)
}
// 电影院的数据
export const movieCinemaData = () => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'cinema'
    http.defaults.headers.authorization = '';

    return http.get(movieCinema + cityId)
}
export const movieGatewayData = () => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'banners'
    http.defaults.headers.authorization = '';

    return http.get(movieGateway + cityId)
}
export const cityListDate = async () => {
    http.defaults.headers.info = 'city'
    http.defaults.headers.authorization = '';
    let ret = await http.get(cityListUrl)
    // 定义基本数据
    let cities = ret.data.data.cities
    // 字母的数据
    let codeList = [] //( 完整的26个字母 )
    // 城市信息
    let dataList = []
    // 首字母
    let indexList = [] // ( 经过处理的字母,有的字母没有城市 )
    // 热门城市
    let hotCity = []

    // for循环生成26个字母
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i))
    }
    // 将最终的数据进行处理
    // 开始处理
    codeList.forEach((element) => {
        // 1,与城市信息的拼音字段首字母进行对比,如果符合则留下字母
        let tempArr = cities.filter((item) => element.toLowerCase() == item.pinyin.substr(0, 1))
        if (tempArr.length > 0) {
            indexList.push(element)
            dataList.push({
                index: element,
                data: tempArr
            })
        }
    })
    // 热门城市
    hotCity = cities.filter(item => item.isHot === 1)
    // 返回数据
    return Promise.resolve([dataList, indexList, hotCity])
}
// 用户登录
export const UserLogin = (data) => {
    return http.post(loginUrl, data)
}
// 获取用户个人信息
export const userInfo = (_token) => {
    http.defaults.headers.authorization = _token;
    http.interceptors.response.use(function (response) {
        // console.log(response.data);
        // if (response.data.data.length > 0) {
        //     response.data.user_info.gender = response.data.user_info.gender ? '女' : '男'
        // } 

        return response
    }, function (error) {

    })
    return http.post(centerUrl)
}
//  发起对购票影院地址请求
export const TheTicketDate = (data) => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'show-cinema'
    http.defaults.headers.authorization = '';
    return http.get(TheTicketAddress + data + '&cityId=' + cityId)

}

export const buyTicketCinemaData = (string) => {
    let cityId = store.state.cityId
    http.defaults.headers.info = 'batch-cinema'
    http.defaults.headers.authorization = '';
    return http.post(buyTicketCinema, {
        cityId: cityId,
        cinemaIds: string
    })
}
// 请求购票影院信息
export const purchaseCinemaDate = (num) => {
    // let cityId = store.state.cityId
    http.defaults.headers.info = 'cinema.info'
    http.defaults.headers.authorization = '';
    return http.get(purchaseCinema + num)
}
export const purchaseCinemaDateTO = (num) => {
    // let cityId = store.state.cityId
    http.defaults.headers.info = 'cinema-show-film'
    http.defaults.headers.authorization = '';
    return http.get(purchaseCinema + num)
}

export const movieMoneyData = (filmId, cinemaId, data) => {
    http.defaults.headers.info = 'schedule.list'
    http.defaults.headers.authorization = '';
    return http.get(movie + filmId + '&cinemaId=' + cinemaId + '&date=' + data)
}