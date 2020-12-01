<template>
	<div
		class="list scroll"
		:style="{ height: height + 'px' }"
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="0"
	>
		<v-touch
			v-on:swipeleft="onSwipeLeft"
			:swipe-options="{ direction: 'horizontal' }"
		>
			<loading v-if="loading1"></loading>
			<!-- 展示数据 -->
			<div>
				<div
					class="item"
					v-for="item in data"
					:key="item.filmId"
					@click="gODetail(item.filmId)"
				>
					<div class="left">
						<img v-lazy="item.poster" />
					</div>
					<div class="middle">
						<div>
							{{ item.name }}
							<span class="item">{{ item.filmType.name }}</span>
						</div>
						<div v-if="type == 1">
							<span>观众评分 </span>
							<span class="grade">{{ item.grade }}</span>
						</div>
						<div>主演：{{ item.actors | parseActors }}</div>
						<div v-if="type == 1">
							{{ item.nation }} | {{ item.runtime }}分钟
						</div>
						<div v-else>上映时间 : {{ item.premiereAt | premiereAt }}</div>
					</div>
					<div class="right">
						<span v-if="type == 1" @click.stop="goCinemas(item.filmId)"
							>购票</span
						>
						<span
							v-else
							v-show="item.isPresale"
							@click.stop="goCinemas(item.filmId)"
							>预购</span
						>
					</div>
				</div>
				<div v-if="judge" class="foot">
					<van-loading size="24px">加载中...</van-loading>
				</div>
				<div v-else-if="judg" class="foot">我是有底线的</div>
			</div>
		</v-touch>
	</div>
</template>

<script>
import loading from "@/components/loading";
import moment from "moment";
// 导入请求的方法
import { nowPlayingListData, comingSoonListData } from "@/api/api";
moment.locale("zh-cn");
import Vue from "vue";
import { Loading } from "vant";
import "vant/lib/index.css";
Vue.use(Loading);

export default {
	props: ["list", "type"],
	components: {
		loading,
	},
	data() {
		return {
			loading1: true,
			height: 0,
			pageNum: 1,
			flag: true, // 控制是否可以加载更多
			data: [], // 拼接数据
			satrY: 0,
			loading: false,
			num: 0,
			judge: false,
			judg: false,
		};
	},
	created() {
		// 当进入页面后需要将父传子的数据list转交给data
		this.data = this.list;
		// 判断数据是否获取到,获取到之后去除loading组件
		if (this.data.length > 0) {
			this.loading1 = false;
		} else {
			this.loading1 = true;
		}
	},
	filters: {
		parseActors(value) {
			let actors = "";
			if (value !== undefined) {
				value.forEach((element) => {
					actors += element.name + " ";
				});
			}
			return actors;
		},
		premiereAt(value) {
			return moment(value * 1000).format("dddd YYYY-MM-DD");
		},
	},
	methods: {
		gODetail: function (filmId) {
			this.$router.push({ name: "detail", params: { filmId } });
		},
		// 获取数据的方法
		getData: async function () {
			this.pageNum++;
			// 获取数据
			if (this.type === 1) {
				// 请求正在热映
				var ret = await nowPlayingListData(this.pageNum);
			} else {
				// 请求即将上映
				var ret = await comingSoonListData(this.pageNum);
			}
			// 如果当前请求道的数据数量少于10，则说明后面没有数据可以请求
			// 将数据处理好,新增到列表中去
			this.data = this.data.concat(ret.data.data.films);
			this.num = ret.data.data.total;
			this.loading = false;
		},
		loadMore() {
			this.loading = true;
			this.judge = true;
			if (this.data.length === this.num) {
				this.judge = false;
				this.judg = true;
				return;
			}
			this.getData();
		},
		onSwipeLeft() {
			this.$router.push({ path: "/film/comingsoon" });
		},
		goCinemas(filmId) {
			this.$router.push({ name: "cinemas", params: { filmId } });
		},
	},
	mounted() {
		this.height = document.documentElement.clientHeight - 150;
	},
};
</script>
<style lang="scss" scoped>
.list {
	padding-bottom: 50px;
	.item {
		margin-top: 15px;
		padding-bottom: 15px;
		display: flex;
		color: #797d82;
		font-size: 13px;
		border-bottom: 1px solid #ededed;

		.left {
			width: 77px;
			height: 100px;
			margin-left: 20px;
			img {
				width: 66px;
				height: 100%;
			}
		}

		.middle {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 55%;
			.grade {
				color: #ffb232;
				font-size: 14px;
			}
			div:nth-of-type(1) {
				color: #191a1b;
				font-size: 16px;
				display: flex;
				.item {
					font-size: 9px;
					color: #fff;
					background-color: #d2d6dc;
					height: 14px;
					line-height: 14px;
					padding: 0 2px;
					border-radius: 2px;
					margin: 4px 0 0 7px;
				}
			}

			div:nth-of-type(2) {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			div:nth-of-type(3) {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.right {
			width: 15%;
			display: flex;
			align-items: center;
			margin-right: 20px;

			span {
				border: 1px solid #ff5f16;
				background: white;
				color: #ff5f16;
				border-radius: 2px;
				height: 25px;
				line-height: 25px;
				font-size: 13px;
				width: 50px;
				text-align: center;
			}
		}
	}
}
.scroll {
	overflow-x: hidden;
}
.foot {
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	overflow: hidden;
	img {
		width: 100%;
	}
}
</style>
