<template>
	<div v-cloak>
		<div class="header">
			<div class="left">
				<i
					class="iconfont icon-tubiaoguifan2"
					style="font-size: 19px"
					@click="handerClick"
					>X</i
				>
			</div>
			<div class="title">当前城市 - {{ location | cleaner }}</div>
		</div>
		<div class="search-city-input">
			<div class="input-wrap">
				<i
					class="search-icon iconfont icon-sousuo-sousuofangdajing"
					style="font-size: 20px"
				></i>
				<input
					type="text"
					placeholder="输入城市名或拼音"
					class="search-input"
				/>
				<div class="clean-icon">
					<i
						class="iconfont icon-chongzhi-qingchu"
						style="font-size: 20px; display: none"
					></i>
				</div>
			</div>
		</div>
		<div class="mint-indexlist city-index">
			<div class="recommend-city">
				<div class="gprs-city">
					<div class="city-index-title">GPS定位你所在城市</div>
					<ul class="city-index-detail cleanfix">
						<li class="city-item-detail city-item-detail-gprs">
							<div class="city-item-text" v-if="gps.length == 0">定位失败</div>
							<div class="city-item-text" v-else @click="handerCity" ref="city">
								{{ location | cleaner }}
							</div>
						</li>
					</ul>
				</div>
				<div class="hot-city">
					<div class="city-index-title">热门城市</div>
					<ul class="city-index-detail cleanfix">
						<li
							class="city-item-detail"
							v-for="(item, index) in hotCity"
							:key="index"
						>
							<div
								class="city-item-text"
								@click="chooseCity(item.name, item.cityId)"
							>
								{{ item.name }}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<van-index-bar :index-list="indexList" :sticky-offset-top="90">
			<template v-for="item in dataList">
				<van-index-anchor
					style="background: rgb(247, 248, 250)"
					:index="item.index"
					:key="item.index"
				></van-index-anchor>
				<van-cell
					@click="chooseCity(sub.name, sub.cityId)"
					v-for="(sub, key) in item.data"
					:title="sub.name"
					:key="key"
				/>
			</template>
		</van-index-bar>
	</div>
</template>
<script>
import { cityListDate } from "@/api/api";
import Vue from "vue";
import "vant/lib/index.css";
import { IndexBar, IndexAnchor, Cell } from "vant";
import { mapState } from "vuex";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
	data() {
		return {
			dataList: [],
			indexList: [],
			hotCity: [],
			gps: [],
		};
	},
	computed: {
		...mapState(["location"]),
	},
	// 进入的时候去掉底部导航
	created() {
		this.eventBus.$emit("footerNav", false);
	},
	// 出去的时候开启底部导航
	beforeDestroy() {
		this.eventBus.$emit("footerNav", true);
	},
	async mounted() {
		let ret = await cityListDate(); // dataList, indexList
		this.dataList = ret[0];
		this.indexList = ret[1];
		this.hotCity = ret[2];

		if (localStorage.getItem("location") !== null) {
			if (localStorage.getItem("location").length > 0) {
				this.$store.commit("location", localStorage.getItem("location"));
				let res = localStorage.getItem("location");
				this.gps = res;
			}
		}
	},
	methods: {
		handerClick() {
			this.$router.go(-1);
		},
		chooseCity(cityName, cityId) {
			this.$store.commit("setCity", cityName);
			this.$store.commit("setCityID", cityId);

			this.$router.go(-1);
		},
		handerCity(city, cityid) {
			// let res = this.$refs.city.innerText;
			// localStorage.setItem("city", JSON.stringify(res));
			// this.$router.go(-1);
		},
	},
	filters: {
		cleaner(val) {
			return val.split('"').join("");
		},
	},
};
</script>
<style lang="scss" scoped>
[v-cloak] {
	display: none;
}
div {
	box-sizing: border-box;
}
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 44px;
	overflow: hidden;
	margin: 0;
	padding: 0;
	z-index: 300;
	background: #fff;
	div {
		float: left;
		height: 44px;
	}
	.left {
		width: 14%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.title {
		width: 72%;
		text-align: center;
		font-size: 17px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		color: #191a1b;
	}
}
.search-city-input {
	z-index: 2000;
	height: 49px;
	width: 100vw;
	padding: 9.5px 15px;
	background-color: #f4f4f4;
	position: fixed;
	top: 44px;
	.input-wrap {
		background-color: #fff;
		position: relative;
		display: inline-block;
		border-radius: 3px;
		width: 100%;
		height: 30px;
		.search-icon {
			position: absolute;
			left: 7px;
			top: 0;
			line-height: 30px;
			font-size: 21px;
			color: #797d82;
		}
		.search-input {
			position: absolute;
			left: 33.5px;
			top: 0;
			height: 30px;
			width: calc(100% - 65px);
			border: 0;
		}
		.clean-icon {
			position: absolute;
			right: 7px;
			top: 0;
			line-height: 30px;
			font-size: 21px;
			color: #bdc0c5;
		}
	}
}
.city-index {
	margin-top: 94px;
}
.mint-indexlist {
	width: 100%;
	position: relative;
	overflow: hidden;
}
.recommend-city {
	background-color: #fff;
	padding-left: 15px;
	padding-top: 15px;
	.city-index-title {
		font-size: 13px;
		color: #797d82;
		margin-bottom: 10px;
	}
	.city-index-detail {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-ms-flex-line-pack: center;
		align-content: center;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		.city-item-detail {
			width: calc((100vw - 33px) / 3);
			text-align: center;
			padding-bottom: 15px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			float: left;
			.city-item-text {
				height: 30px;
				background-color: #f4f4f4;
				line-height: 30px;
				border-radius: 3px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				margin: 0 7.5px;
				font-size: 14px;
				color: #191a1b;
			}
		}
	}
}
.city-index-title {
	font-size: 13px;
	color: #797d82;
	margin-bottom: 10px;
	.city-index-detail {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-ms-flex-line-pack: center;
		align-content: center;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		.city-item-detail {
			width: calc((100vw - 33px) / 3);
			text-align: center;
			padding-bottom: 15px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			float: left;
		}
	}
}
</style>