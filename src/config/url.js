// 定义正在热映电影列表需要的地址
export const nowPlayingListUrl = 'gateway?pageSize=10&type=1&k=7551560&pageNum=';
// 定义即将上映电影列表需要的地址
export const comingSoonListUrl = 'gateway?pageSize=10&type=2&k=3290207&pageNum=';
// 电影详情的页面
export const movieDetailUrl = 'gateway?k=6881259&filmId='
// 影院地址
export const movieCinema = 'gateway?ticketFlag=1&k=567262&cityId='
// 影院兑换券请求地址
export const movieGateway = 'gateway?k=2066296&cityId='
// 城市列表数据
export const cityListUrl = 'gateway?k=9966844'
// 个人中心相关的接口
export const loginUrl = 'http://101.200.32.208:3000/api/v1/login'
export const centerUrl = "http://101.200.32.208:3000/api/v1/user_info";

// 购票请求影院地址
export const TheTicketAddress = 'gateway/?k=407634&filmId='
// 'https://m.maizuo.com/gateway/?k=407634&filmId=5109&cityId=310100'

// 购票请求具体影院地址
export const buyTicketCinema = 'gateway?k=8489824'


// 请求购票影院信息
export const purchaseCinema = 'gateway/?k=3573599&cinemaId='

// 选票

export const movie = 'gateway/?k=4777405&filmId='
// 5198&cinemaId=3142&date=1603382400