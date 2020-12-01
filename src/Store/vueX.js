// 导入Vue
import Vue from "vue"
// 导入VueX 
import Vuex from "vuex"

// 在vue中使用Vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        city: '全国',
        location: '',
        _token: '',
        cityId: 0,

    },
    mutations: {
        add(state, step) {
            state.count += step
        },
        setCity: function (state, cityName) {
            state.city = cityName
            localStorage.setItem('city', cityName)
        },
        location: function (state, cityName) {
            state.location = cityName
            localStorage.setItem("location", cityName);
        },
        updatedToken: function (state, _token) {
            state._token = _token
            localStorage.setItem('_token', _token)
        },
        setCityID: function (state, cityId) {
            state.cityId = cityId
            localStorage.setItem('cityId', cityId)
        },
        // ...
    },
    actions: {
        addAsync(context, step) {
            setTimeout(() => {
                context.commit('add', step)
            }, 3000)
        },
    },
    getters: {
        getCount(state) {
            return '当前总数是' + state.count
        }
    }
})