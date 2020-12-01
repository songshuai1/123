<template>
	<div class="detail" v-cloak>
		<div :class="{ filmheader: isheader, showfilmheader: isShowHeader }">
			<div class="goBack" @click="handergo">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
					alt=""
				/>
			</div>
			<div class="title">{{ film.name }}</div>
		</div>
		<div class="img">
			<img v-lazy="film.poster" />
		</div>
		<div class="film-detail">
			<div class="box">
				<div class="film-name">
					{{ film.name }}
					<!-- <span class="item">{{ film.filmType.name }}</span> -->
				</div>
				<div class="film-grade" v-if="grade">
					<span class="grade">{{ film.grade }}</span>
					<span class="grade-text"> 分</span>
				</div>
			</div>
			<div class="film-detail-all">{{ film.category }}</div>
			<div class="film-detail-all">
				{{ film.premiereAt | parsePremiereAt }}上映
			</div>
			<div class="film-detail-all">
				{{ film.nation }} | {{ film.runtime }} 分钟
			</div>
			<div
				:class="{
					filmDetailall: isfilm,
					hidde: ishidde,
					filmsynopsis: isfilmsynopsis,
				}"
			>
				{{ film.synopsis }}
			</div>
			<div class="toggle" @click="handerClick">
				<img
					:class="{ upper: isupper }"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
				/>
			</div>
		</div>
		<div class="actors">
			<div class="actors-title-bar">
				<span class="actors-title-text">演职人员</span>
			</div>
			<Swiper
				:key="'actors_' + film.actors.length"
				perview="4"
				class="actorSwiper"
				myClassName="actorSwiper"
			>
				<!-- 循环输出图片信息 -->
				<div
					v-for="(item, index) in film.actors"
					:key="index"
					class="swiper-slide"
				>
					<img :src="item.avatarAddress" class="target-img" />

					<span class="actors-name">{{ item.name }}</span>
					<span class="actors-role">{{ item.role }}</span>
				</div>
			</Swiper>
		</div>
		<div class="photos">
			<div class="photos-title-bar">
				<span class="photos-title-text">剧照</span>
				<span class="photos-to-all"
					>全部({{ film.photos.length }})
					<!-- <i class="iconfont icon-quanju_liebiaojiantou" style="font-size: 13px"></i> -->
				</span>
			</div>
			<Swiper
				:key="'photos_' + film.photos.length"
				perview="2.39"
				class="photpSwiper"
				myClassName="photpSwiper"
			>
				<div
					v-for="(item, index) in film.photos"
					:key="index"
					class="swiper-slide"
				>
					<img :src="item" alt="" class="target-img" />
				</div>
			</Swiper>
		</div>
		<!-- <a href="/film/film.filmId/cinemas" class=""></a> -->
		<div
			@click="goCinemas(film.filmId)"
			style="
				height: 49px;
				position: fixed;
				bottom: 0px;
				width: 100%;
				z-index: 999;
			"
			v-if="film.isSale"
		>
			<div class="goSchedule">选座购票</div>
		</div>
	</div>
</template>

<script>
import { movieDetailData } from "@/api/api";
// 引入mement
import moment from "moment";
// 引入Swiper组件
import Swiper from "@/components/Swiper";

import { MessageBox } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
	data() {
		return {
			grade: true,
			isfilm: true,
			film: {},
			ishidde: true,
			isupper: false,
			isfilmsynopsis: true,
			film: { actors: [], photos: [] },
			isheader: true,
			isShowHeader: false,
		};
	},
	async mounted() {
		let ret = await movieDetailData(this.$route.params.filmId);
		if (ret.data.data.film.grade) {
			this.grade = true;
		} else {
			this.grade = false;
		}
		this.film = ret.data.data.film;
		window.addEventListener(
			"scroll",
			(e) => {
				let top = document.documentElement.scrollTop;
				if (top > 20) {
					this.isShowHeader = true;
				} else {
					this.isShowHeader = false;
				}
			},
			true
		);
		// 发起通知 通知APP.Vue组件,移除底部菜单
		this.eventBus.$emit("footerNav", false);

		if (this.film.isSale === false) {
			MessageBox({
				title: "提示",
				message: "该影片目前没有排期,到首页看其他电影吧",
				showCancelButton: true,
				closeOnClickModal: true,
				cancelButtonText: "拒绝",
				cancelButtonHighlight: true,
				confirmButtonClass: "confirmButton",
			}).then((value) => {
				if (value === "confirm") {
					this.$router.go(-1);
				}
			});
		}
	},
	methods: {
		handerClick() {
			this.ishidde = !this.ishidde;
			this.isupper = !this.isupper;
		},
		handergo() {
			this.$router.go(-1);
		},
		goCinemas(id) {
			this.$router.push({ name: "cinemas", params: { id } });
		},
	},
	filters: {
		parsePremiereAt: function (value) {
			// 时间戳的单位是秒，需要乘以1000转化成毫秒进行处理
			return moment(value * 1000).format("YYYY-MM-DD");
		},
	},
	components: {
		Swiper,
	},
	created() {},
	beforeDestroy() {
		// 发起通知,通知APP.Vue组件,恢复底部菜单
		this.eventBus.$emit("footerNav", true);
	},
};
</script>

<style lang="scss" >
[v-cloak] {
	display: none;
}
.detail {
	overflow-x: hidden;
	background: rgb(244, 244, 244);
	.filmheader {
		position: fixed;
		background-color: hsla(0, 0%, 100%, 0);
		color: transparent;
		-webkit-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		transition: all 0.3s ease;
		width: 100vw;
		height: 44px;
		z-index: 1;
		.goBack {
			height: 30px;
			position: absolute;
			top: 5px;
			left: 5px;
		}
		.goBack img {
			width: 30px;
		}
		.title {
			font-size: 17px;
			line-height: 44px;
			width: 100vw;
			text-align: center;
		}
	}
	.showfilmheader {
		-webkit-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		transition: all 0.3s ease;
		background-color: #fff;
		color: #191a1b;
	}
	.photos {
		margin-top: 10px;
		margin-bottom: 60px;
		background-color: #fff;
		padding-left: 15px;
		.photos-title-bar {
			// height: 62px;
			padding: 15px 15px 15px 0;
			.photos-title-bar span {
				display: inline-block;
				height: 22.5px;
				line-height: 22px;
			}
			.photos-title-text {
				font-size: 16px;
				text-align: left;
				color: #191a1b;
			}
			.photos-to-all {
				font-size: 13px;
				color: #797d82;
				float: right;
			}
		}
		.swiper-slide {
			height: 100px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.actors {
		margin-top: 10px;
		background-color: #fff;
		.actors-title-bar {
			width: 100%;
			padding: 15px;
			.actors-title-text {
				font-size: 16px;
				text-align: left;
				color: #191a1b;
			}
		}

		.swiper-slide {
			width: 80px;
			img {
				width: 80px;
				height: 110px;
			}
		}

		.actors-name {
			padding-top: 10px;
			font-size: 12px;
			color: #191a1b;
			width: 85px;
			height: 18px;
			display: block;
			overflow: hidden;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
		}
		.actors-role {
			font-size: 10px;
			color: #797d82;
			display: block;
			text-align: center;
			width: 85px;
			height: 18px;
		}
		.swiper-slide:nth-child(1) {
			padding-left: 15px;
		}
	}

	.img {
		width: 100%;
		height: 236px;

		img {
			width: 100%;
			height: 100%;
		}
	}
	.film-detail {
		padding: 0 15px;
		background-color: #fff;
		.filmsynopsis {
			transition: max-height 1s ease;
		}
		.hidde {
			max-height: 34px !important;
		}
		.box {
			display: flex;
			justify-content: space-between;

			.film-name {
				color: #191a1b;
				font-size: 18px;
				height: 24px;
				line-height: 24px;
				margin-right: 7px;
				margin-top: 10px;
				line-height: 24px;

				.item {
					font-size: 9px;
					color: #fff;
					background-color: #d2d6dc;
					height: 14px;
					line-height: 14px;
					padding: 0 2px;
					border-radius: 2px;
					display: inline-block;
				}
			}
			.film-grade {
				width: calc(100% - 250px);
				text-align: right;
				color: #ffb232;
				margin-top: 10px;

				.grade {
					font-size: 18px;
					font-style: italic;
				}
				.grade-text {
					font-size: 10px;
				}
			}
		}
		.toggle {
			text-align: center;
			display: block;
			height: auto;
			width: 20px;
			margin: auto;
			line-height: normal;
			img {
				width: 8px;
				margin: auto;
			}
			.upper {
				-webkit-transform: rotate(180deg);
				-ms-transform: rotate(180deg);
				transform: rotate(180deg);
			}
		}
		.film-detail-all {
			font-size: 13px;
			color: #797d82;
			margin-top: 4px;
		}
		.filmDetailall {
			font-size: 13px;
			color: #797d82;
			margin-top: 4px;
			max-height: 200px;
			overflow: hidden;
		}
		.film-detail-all:nth-of-type(5) {
			margin-top: 13px;
		}
	}
	.goSchedule {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 49px;
		width: 100%;
		text-align: center;
		background-color: #ff5f16;
		color: #fff;
		font-size: 16px;
		line-height: 49px;
	}
}
.confirmButton {
	color: #ff5f16 !important;
}
</style>