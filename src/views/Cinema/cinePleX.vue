<template>
	<div class="cinema-schedule" v-cloak>
		<div class="header-left" @click="goFy">
			<img
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA2CAMAAACRK2tAAAAAkFBMVEVHcEwcHBwZGhsaGhwZHBwqKioZGhv///8bGxs/Pz8ZGhseHh4eHh4cHBwZGxsaGhsZGxsfHx8ZGhwZGhsZGhsdHR0ZGhsZGhsaGhwbGxsZGhsbGxsZGxseHh4ZGxsZGhsaGhskJCQZGxsaGhwZGxsZGhwaGhwZGhwZGhsZHh4fHx8aGhsZGhsZGhsZGhsZGhteFmxMAAAAL3RSTlMAEv1YdgzJAUsE+hkhP5WksQi+0/c08uWGStxnZirs3c0HsoeWo4W91DMp6+T28faGh4gAAADjSURBVDjLxZXZkoJADEUbVxBQlG1AYRZ3Z/T8/9/5gK9JqgZL83puVVd3TjrO/bumfjVVA3PwNf4BVAofAXvliA2QBDIfDuD4LXN/BpOxzOMMUk/meQF1KPOmhb9I5lEJvxeZhzXczjL3UrjGMh9PYKZ0YLmCwVDmQQJsFAEWwEgXgIMhwNwQYNFTgNXyfQK4Lygj1yeQF/CpHeHiDE6elrCuaT+Uc2vgJ3A9mtW1e2f9GGzVP8dSrpN2rSUs7e3B6UYvi7VEWEORa4mohLbREk37HD3Sl+iRPEGPqtdCsVfSo+6AByDPg79r1AAAAABJRU5ErkJggg=="
				width="11px"
				height="18px"
			/>
			<img
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAQlBMVEVHcEwZGxsfHx8ZGhsZHh4ZGhsZHx////8aGhsZGhsbGxsaGhwcHBwYGRoZGhwaGhsaGh0aGh4bGxsZGhwZGhwZGhuZ90I0AAAAFXRSTlMAnRDlO/MoAZznQYY1+qvEVjpx0NGKQfLiAAAA8klEQVRIx+3WSQ6DMAwFUIbSUKAMbXP/q5apAoMdf0di1ywtniwF+0OS/M/F55XXDnpweHcZKeTelwi9Fd73pFJ7iE7wQXu6EqEzvB+KCGUhQgWoUxFqNADDNAhDVIEyVaFEAchTCHIUhGcKwyM1QEpNcE+NcKNm+KMRcKXPCLjSGDheztjRty4CFlNPLBHPs9pG0OVWsURkt8NMt/dopPsBMFE6OQZ6HDmYnmcVpNyQQ5TfDoBKa6VSeR8VGlrkmaYu4muVuFSkWnSIVM8cgSJhxdIBSrmF0toHC6uZVqTUgSk30YZUsj4Dl7dq/n/Jl58vF/caAGebDs0AAAAASUVORK5CYII="
				width="19px"
				height="19px"
				style="display: none"
			/>
		</div>
		<div class="header-title">{{ cinemaList.name }}</div>
		<div class="cinema-wrap">
			<div class="cinema-info">
				<div class="tags">
					<div
						class="tag"
						v-for="(value, index) in cinemaList.services"
						:key="index"
					>
						{{ value.name }}
					</div>
					<i
						class="tag-more iconfont icon-quanju_liebiaojiantou"
						style="font-size: 10px"
					></i>
				</div>
				<div class="address">
					<img
						src="data:image/png;base64,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"
						width="14px"
						height="21px"
						alt=""
					/>
					<div
						class="address-des"
						data-enter-time="1603157706"
						data-click-fun="track_f_956586"
					>
						{{ cinemaList.address }}
					</div>
					<a
						class="tel-icon"
						data-enter-time="1603157706"
						data-click-fun="track_f_398343"
						><img
							data-v-0134b84b=""
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA2CAMAAABdslGrAAACJVBMVEVHcEwhISEzMzMZHBwZMzMZGhsZGxsZGhsZGhv///8ZGxsbGxsfHx8kJCQaGh0bGxsZGhsZJiYqKioaGhwZHR0ZGhsZGhsZGxsZGhsaGh5VVVV/f38ZGhscHBwZGhsZGhsaGigZGhsZGhwZGhsZGhsaGh8ZGhsaGhsbGxsaGhsaGhsZHBwaGh0fHx8nJycZGhwZGxscHBwZGxsZGhscHBwbGxsZGxsaGhsaGhscHBwaGiAZGxsaGhsaGhwZHBwZGxsaGh4ZGhsZGhsZGhsZGxsZGhscHBwZGhsaGhwdHR0fHx8ZGhwZGxsZGhwkJCQaGiMZGhsZGhsbGxsdHR0ZGhsbGxsaGhsaGhsaGhsZGxscHBwbGxsZGxsZGhwZHx8ZGxsaGhseHh4aGh0cHBwbGxsZHh4bGxsaGhsZGhweHh4ZGxsZGxsZGhsZHh4ZGxsaGhseHh4cHBw/Pz8ZGhsfHx8ZGxsZGxsZGhsaGh0ZGxsZGhwcHBwaGhsaGhwbGxsZGhwZGhwZGxsZGhsZGhwZGxsaGhsiIiIZGhsZGhscHBwZHBwaGhwqKioZGhwZGhsaGh8ZIiIaGhseHh4ZGxsaGhwbGxsbGxsZGxsZGxsZGhsaGh8ZGhwaGh0ZGhsZGhsZGxsZGhwaGh0aGhwZHBwaGhwbGxsZGxsaGh0ZGxsbGxsfHx8eHh4ZGhsdHR0ZGhsbGxsZGhsZGhsZHR0ZGhsZGhwaGhwZGhuqFRxRAAAAtnRSTlMAFwVZCvqy/v0Bl2cQB2kl5RQGYT3M+NnKQwMC8iTq8BP7vfbtMO65QsOldk4gDceDPs75G16zkq4SJ52TiFtuTOfd5Kr3CfR/Iwi1oNoVHfPWcTS3L5u6nLtISWW/KHfrImg/SjNBxLQqlajUO8bXITUE6RiEje9Wiq029WpA45mx0qNvpBbByy1kYgyr5jkerxGMkS43eGbbMch78dWe0V+FbHxUgXJ5XCkZ4CvJOOj8RdOYkJ3guaYAAAJ3SURBVBgZvcEFcxNRAEbRr22S3dTd3XApLoVCi7u7u7u7u7u7u97fR5NNCkM2vGWY4Rz9m025DUH9jQHJmUC7Ennma7QIS5JXqT1o5c+EU/LoXDcgryg7qwZy5c04sJcEJR2Cy/KkzoYchSywsEfLiwAMk2MsNMqDtBqsMjmKYGSqzJbCV0U9goUyS4dvinoMLYkySofvisoeCoNltASS1eYe5MloGXxQm8oaWCqT1CrsCWqTDIdlNB9y1GaAhZ0hk5fQTz/1gd0yKYORYxTVqwOsktFkWKaInFIgSUaDYKAc6y2wO8nsBgyfoLDNwDx5cRdeyLEHugXlwXNYNEJhXYZDb3lQ3AzpcnSHC1fkwVMYX6Iw30EYG5SZrxZuyTHEglHy4BnUn5DjCdhzZZY2Ho7KUTIT6hfIrAhoL0flO/j0XmbHoSBNjuWlsKhORgk7oa8iPlZA/VSFrBjVOah4UoCzilheC5NeS4kzgHYJimct9LyoiOnlwLj+AUK2zlEcvh4wtJci3kwG9gErbbB2ZMvdpXIoHKEI30NCktU+E8jLkLsGP5zsqqjBpTCtWMrqA0zqLXcpQGF/RWX0W+NTSFM+0LGrXB2z4EiCYkzfCDTvlaszNhRMVAzfLMDfKSg3SVVQPlexdlUAsxPkpnM+WFcTFaPLBmBdqtzktgCFoxVjy3Yb9stVZQC4n1KsGB0gXXE05QMPhug3ddBzm+K5U0Cr+VP1q8RqGKj4xtysAKxhB4KKCnYEa7X+JOuan1a3X71V2OKZwBQZlJ0n5HNg3pc5KQE/MEhmp/vW8lNVd3mSllRtEWZVX5dnixfOmj1txpSJ+t9+AAZEC6aFGvT2AAAAAElFTkSuQmCC"
							width="17px"
							height="18px"
							alt=""
					/></a>
				</div>
			</div>
			<div class="schedule-wrap">
				<div class="film-bg">
					<div
						ref="background"
						class="img"
						style="
							background-image: url('https://pic.maizuo.com/usr/movie/0b4e01c33b555e533cf8aca71b67df1a.jpg');
						"
					></div>
				</div>
				<div class="film-list">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div
								class="swiper-slide"
								v-for="item in filmList"
								:key="item.filmId"
							>
								<div class="film-item">
									<div class="img-wrap">
										<img :src="item.poster" alt="" ref="bj" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="triangle">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEVHcEz////////mcEUwAAAAAnRSTlMAgJsrThgAAABLSURBVAgdBcEBDQAACAMg/GYDAxnB/mkEUAuBPgjMQOAagtpaBM0hGAbB0Qi11BIajjAwhIMmaqFWNHBigBEHtNQCtWmAywBMDqAfx4oGipkmrUEAAAAASUVORK5CYII="
							width="20px"
							height="10px"
							alt=""
						/>
					</div>
				</div>
				<div
					class="film-info"
					v-for="(item, index) in filmList"
					:key="index"
					v-if="filmId === item.filmId"
					@click="goDetail(item.filmId)"
				>
					<div class="film-head">
						<span class="film-name">{{ item.name }}</span>
						<span class="film-score">{{ item.grade }}</span>
						<span class="film-score-unit">分</span>
					</div>
					<div class="film-desc">
						{{ item.category }} | {{ item.runtime }}分钟 | {{ item.director }}
						<!-- 战争  112分钟 | 苑本立|冯鹏 | 苑本立 冯鹏 巩峥 陶红 杨钧丞 -->
					</div>
					<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAMAAAD57OxYAAAAZlBMVEVHcEwZGhseHh4aGh8zMzMZGhsZGhwZGhsfHx8ZGhsbGxsZGhsZGxsZGxsZGxsZGxsbGxsaGhsaGh0aGh0ZGhwbGxsZGhweHh4ZGhsaGh0ZGxsZGxsZGxsZGhsZGxsZGxsaGhwZGhtuA7MxAAAAIXRSTlMA6iE5Bda99xD+OOWenXh6VddWV9BxviLpe7x5jeSBgI/e7hU0AAAAeUlEQVQY023PyRqCMAyFUSilA2VGnBX/939JN01QP7O6Z5ObFGt6FjoPuCjuEBeBvYKvRKGG8iQyZ5iCqPFwtKIxQqsre2BQdV8F7rfgoJh2WAe+yWghjjkPQJ/zHKHLufLg8jmmhDp8vGD+LH1BnKU6wU3vXdOm+Q34ngmHHMc+eAAAAABJRU5ErkJggg=="
						width="4px"
						height="8px"
						alt=""
						class="film-more"
					/>
				</div>
				<van-tabs v-model="active" @click="handleClick($event)">
					<van-tab
						:title="item | premiereAt"
						v-for="(item, index) in movieLI"
						:key="index"
						animated
						duration="0.8"
					>
						<div
							class="schedule-item"
							v-for="(item, index) in movieList"
							:key="index"
						>
							<div class="left">
								<div class="start-at">{{ item.showAt | showAt }}</div>
								<div class="end-at">{{ item.endAt | endAt }}散场</div>
							</div>
							<div class="middle">
								<div class="language">
									{{ item.filmLanguage }}{{ item.imagery }}
								</div>
								<div class="hall">{{ item.hallName }}</div>
							</div>
							<div class="right">
								<div class="buy-ticket">购票</div>
								<div class="lowest-price">
									<span class="price-icon">￥</span>39
								</div>
							</div>
						</div>
					</van-tab>
				</van-tabs>
			</div>
		</div>
	</div>
</template>
<script>
import moment from "moment";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
import {
	purchaseCinemaDate,
	purchaseCinemaDateTO,
	movieMoneyData,
} from "@/api/api";

import Vue from "vue";
import { Tab, Tabs } from "vant";
import "vant/lib/index.css";
Vue.use(Tab);
Vue.use(Tabs);
moment.locale("zh-cn");

export default {
	data() {
		return {
			cinemaList: {},
			filmList: [],
			filmId: "",
			active: 0,
			num: 0,
			movieLI: [],
			movieList: [],
			wangxin: 0,
		};
	},
	// 进入的时候去掉底部导航
	async mounted() {
		this.eventBus.$emit("footerNav", false);

		// 请求影院信息
		// console.log(this.$route.params);
		let ret = await purchaseCinemaDate(`${this.$route.params.cinemaId}`);
		this.cinemaList = ret.data.data.cinema;

		// 请求影片信息
		let retTO = await purchaseCinemaDateTO(`${this.$route.params.cinemaId}`);
		this.filmList = retTO.data.data.films;

		this.filmId = this.filmList[0].filmId;
		this.movieLI = this.filmList[0].showDate;
		this.filmList.forEach((element, index) => {
			if (this.$route.params.filmId == element.filmId) {
				this.num = index;
				return;
			}
		});

		let _this = this;
		let mySwiper = {};
		this.$nextTick(() => {
			mySwiper = new Swiper(".swiper-container", {
				// autoplay: true,
				effect: "coverflow",
				slidesPerView: 3.8,
				spaceBetween: 16,
				centeredSlides: true,
				slideToClickedSlide: true,
				centeredSlides: true,

				coverflowEffect: {
					rotate: 0,
					stretch: 0,
					depth: 500,
					modifier: 1,
					slideShadows: true,
				},
				on: {
					slideChange: async function () {
						_this.movieLI = _this.filmList[this.activeIndex].showDate;

						_this.filmId = _this.filmList[this.activeIndex].filmId;
						let bj = _this.$refs.bj[this.activeIndex].src;
						let res = `url(${bj})`;
						_this.$refs.background.style.backgroundImage = res;
						if (_this.$route.params.timestamp && _this.wangxin == 0) {
							_this.wangxin++;
						} else {
							_this.$router.push({
								path: `/cinema/${_this.$route.params.cinemaId}/film/${_this.filmId}`,
							});
							_this.active = 0;
							let num = _this.movieLI[0];
							let init = await movieMoneyData(
								`${_this.filmId}`,
								`${_this.$route.params.cinemaId}`,
								`${_this.movieLI[0]}`
							);
							_this.movieList = init.data.data.schedules;
						}
					},
				},
			});
			mySwiper.slideTo(this.num, 1500, false);
		});
		if (
			this.$route.params.timestamp == undefined &&
			this.$route.params.filmId == undefined
		) {
			let res = await movieMoneyData(
				`${this.filmId}`,
				`${this.$route.params.cinemaId}`,
				`${this.movieLI[0]}`
			).then((value) => {
				this.movieList = value.data.data.schedules;
			});
		} else {
			let res = await movieMoneyData(
				`${this.$route.params.filmId}`,
				`${this.$route.params.cinemaId}`,
				`${this.$route.params.timestamp}`
			).then((value) => {
				this.movieList = value.data.data.schedules;
			});
		}
		this.movieLI.forEach((element, index) => {
			if (element == this.$route.params.timestamp) {
				this.active = index;
				return;
			}
		});
	},
	methods: {
		touchSwiper(id) {
			this.filmId = id;
		},
		goFy() {
			this.$router.push({ path: "/film" });
		},
		sortFun: function (attr, rev) {
			//第二个参数没有传递 默认升序排列
			if (rev == undefined) {
				rev = 1;
			} else {
				rev = rev ? 1 : -1;
			}

			return function (a, b) {
				a = a[attr];
				b = b[attr];
				if (a < b) {
					return rev * -1;
				}
				if (a > b) {
					return rev * 1;
				}
				return 0;
			};
		},
		async handleClick(event) {
			if (
				this.$route.params.timestamp == undefined &&
				this.$route.params.filmId == undefined
			) {
				let res = await movieMoneyData(
					`${this.filmId}`,
					`${this.$route.params.cinemaId}`,
					`${this.movieLI[0]}`
				).then((value) => {
					this.movieList = value.data.data.schedules;
				});
			} else {
				let num = this.movieLI[event];
				let res = await movieMoneyData(
					`${this.$route.params.filmId}`,
					`${this.$route.params.cinemaId}`,
					`${num}`
				).then((value) => {
					this.movieList = value.data.data.schedules;
				});
			}
		},
		goDetail(id) {
			console.log(id);
			this.$router.push({ path: `/film/${id}` });
		},
	},

	// 出去的时候开启底部导航
	beforeDestroy() {
		this.eventBus.$emit("footerNav", true);
	},
	filters: {
		premiereAt(val) {
			return moment(val * 1000).format("dddMM月DD日");
		},
		showAt(val) {
			return moment(val * 1000).format("HH:mm");
		},
		endAt(val) {
			return moment(val * 1000).format("HH:mm");
		},
	},
	async created() {},
};
</script>
<style lang="scss" >
[v-clock] {
	display: none;
}
div {
	box-sizing: border-box;
}
.van-tab {
	padding: 0;
}
.cinema-schedule {
	overflow-x: hidden;
	padding-top: 44px;
	background: #fff;
	min-height: 100vh;
	.header-left {
		position: fixed;
		top: 0;
		height: 44px;
		line-height: 44px;
		padding-left: 15px;
		z-index: 303;
	}
	.header-title {
		position: relative;
		text-align: center;
		font-size: 17px;
		color: #191a1b;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		padding: 0 15px;
		background: #fff;
		top: 0;
		height: 44px;
		line-height: 44px;
		z-index: 302;
	}
	.cinema-info {
		.tags {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			font-size: 15px;
			color: #ffb232;
			overflow: hidden;
			position: relative;
			padding: 5px 0 15px;
			.tag {
				position: relative;
				padding: 0 6px;
				margin: 0 2.5px;
				font-size: 10px;
			}
		}
		.address {
			height: 50px;
			position: relative;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			padding-left: 17px;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			.address-des {
				font-size: 14px;
				height: 20px;
				padding: 0 12px;
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				position: relative;
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.tel-icon {
				height: 18px;
				padding: 0 25px;
			}
		}
	}
	.schedule-wrap {
		position: relative;
		.film-bg {
			position: absolute;
			top: 0;
			height: 160px;
			width: 100%;
			padding: 15px 0;
			overflow: hidden;
			.img {
				height: 100%;
				width: 100%;
				filter: blur(30px);
				-webkit-filter: blur(30px);
			}
		}
		.triangle {
			position: absolute;
			width: 100%;
			top: 94%;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			bottom: 0;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
		}
		.film-list {
			height: 160px;
			padding: 15px 0;
			position: relative;
			.film-item {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				justify-content: center;
				height: 100%;
				width: 100%;
				padding-top: 26px;
				-webkit-transition: all 0.5s ease;
				-o-transition: all 0.5s ease;
				transition: all 0.5s ease;
				.img-wrap {
					width: 72px;
					-webkit-transition: all 0.5s ease;
					-o-transition: all 0.5s ease;
					transition: all 0.5s ease;
					img {
						width: 100% !important;
						height: 100% !important;
					}
				}
			}
		}
	}
	.film-info {
		width: 100%;
		background: #fff;
		height: 80px;
		padding: 15px 0;
		position: relative;
		.film-head {
			margin-bottom: 10px;
			text-align: center;
			line-height: 18px;
			.film-name {
				font-size: 15px;
				color: #191a1b;
				padding-right: 5px;
			}
			.film-score {
				font-size: 16px;
				font-style: italic;
				color: #ffb232;
			}
			.film-score-unit {
				font-size: 10px;
				color: #ffb232;
			}
		}
		.film-desc {
			text-align: center;
			height: 18px;
			color: #797d82;
			font-size: 13px;
			padding: 0 12%;
			overflow: hidden;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.film-more {
			position: absolute;
			right: 15px;
			top: 0;
			margin-top: 36px;
		}
	}
	@media (min-width: 375px) {
		.triangle {
			top: 6px;
		}
		.img-wrap {
			height: 104px;
		}
	}
	.swiper-slide-active .film-item {
		padding-top: 0 !important;
		-webkit-transition: all 0.5s ease !important;
		-o-transition: all 0.5s ease !important;
		transition: all 0.5s ease !important;
		.img-wrap {
			width: 90px !important;
			-webkit-transition: all 0.5s ease;
			-o-transition: all 0.5s ease;
			transition: all 0.5s ease;
		}
		.img-wrap {
			height: 130px !important;
		}
	}
	.schedule-item {
		height: 74px;
		padding: 15px;
		position: relative;
		background: #fff;
		.left {
			float: left;
			width: 100px;
			.start-at {
				font-size: 15px;
				color: #191a1b;
			}
			.end-at {
				font-size: 13px;
				color: #797d82;
				margin-top: 2px;
			}
		}
		.middle {
			float: left;
			width: calc(100% - 240px);
			.language {
				font-size: 15px;
				color: #191a1b;
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.hall {
				font-size: 13px;
				color: #797d82;
				margin-top: 2px;
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.right {
			float: right;
			padding: 10px 0;
			line-height: 25px;
			color: #ff5f16;
			.buy-ticket {
				float: right;
				height: 25px;
				width: 50px;
				border-radius: 2px;
				position: relative;
				text-align: center;
			}
			.lowest-price {
				float: right;
				padding-right: 20px;
				font-size: 15px;

				.price-icon {
					font-size: 10px;
				}
			}
		}
	}
}
</style>
