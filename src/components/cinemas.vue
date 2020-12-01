<template>
	<div>
		<div class="cinemas">
			<van-tabs v-model="activeName" @click="handleClick($event)">
				<van-tab
					v-for="(item, index) in showCinemas"
					:key="index"
					:title="item.showDate | premiereAt"
				>
					<div class="filter">
						<div class="tab">
							<div class="district">
								全城
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
									width="6px"
									height="3px"
									style="display: none"
								/>
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
									width="6px"
									height="3px"
								/>
							</div>
							<div class="specify">
								最近去过
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAANlBMVEVHcEz/Xxb/Xxb/Xxf/Xxb/bST/ZBv/YBn/Xxb/Xxf/Xxf/Xxb/YBb/Xxb/YBb/YBb/YRb/XxYVPc+mAAAAEXRSTlMA5Z7SygccPfpr6OmSfp9ycXeG0lYAAABPSURBVAjXVY05EsAgDMTM4Zgzif7/2RTABFTtqNCKDCwEk4OcIOVNqAcAr8tcEYgRiNfMFMCr3kCxM7NWB+o8swp0cX9hVJ08run23dz7ASR9A7q9wA9qAAAAAElFTkSuQmCC"
									width="6px"
									height="3px"
									style="display: none"
								/>
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAMAAAAIAYw9AAAAOVBMVEVHcEwZGhsZGxsZGhskJCQaGhwbGxsZHR0ZGhsZGhsZGhsZGhsZHBwaGhsaGhwZGxsaGh0bGxsZGhsAwt9XAAAAEnRSTlMA5Z7pB2scPfrK6NJskn6fcnH7htMrAAAAVElEQVQI11XNOQKAIBAEwQEXl0NQ+/+PNfDucIIabaGbnqyHXQHKfC9zgaABVD8Xr8CQlgw5SVLKkBdJ8gmIZhGY/BUoha9qKwDEz/fJJP3y1i5GB2jVA/F2X5USAAAAAElFTkSuQmCC"
									width="6px"
									height="3px"
								/>
							</div>
						</div>
					</div>
					<div class="cinema-banner-wrap">
						<ul class="cinema-list">
							<li
								class="cinema-banner-item"
								v-for="item in advertising"
								:key="item.bannerId"
							>
								<div class="name">
									<span class="title">{{ item.name }}</span>
									<span class="icon"> 影院券 </span>
								</div>
								<div class="type">{{ item.masterTitle }}</div>
							</li>
						</ul>
					</div>

					<div class="cinema-list-wrap">
						<ul class="cinema-list">
							<li
								class="cinema-list-item"
								v-for="(value, key) in cinemasmovie"
								:key="key"
								@click="gocinePleX(value.cinemaId, item.showDate)"
							>
								<div href="" class="cinema-item-wrap">
									<div class="cinema-info-lf cinema-info">
										<span class="cinema-name">{{ value.name }}</span>
										<img
											src="data:image/png;base64,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"
											alt="去过"
											class="isVisted"
											style="display: none"
										/>

										<span class="cinema-address">{{ value.address }}</span>
									</div>
									<div class="cinema-info-rt cinema-info">
										<div class="">
											<span class="cinema-lowPrice price-fmt"
												><i>￥</i>
												<span class="interge" style="font-size: 15px">{{
													value.lowPrice / 100
												}}</span>
												<span style="display: none">.</span>
												<span class="decimal" style="font-size: 10px"></span>
												<span style="display: none">.</span>
												<span
													class="decimal"
													style="font-size: 10px; display: none"
													>00</span
												>
											</span>
											<span class="upon"> 起</span>
										</div>
										<span class="cinema-gpsAddress"
											><img
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA1CAMAAAD1YwKXAAABblBMVEX////s7O7NztHFx8r+/v7AwsbHycy+wMS/wcXCxMje3+H5+frt7e/09PXT1df39/fV1tnz8/T8/Pz6+vv9/f3j5ObGyMv7+/vO0NPBw8ff4OLLzdDBwsbz9PT6+vro6er39/jY2dz29vf4+Pnx8vPs7e7n6OnGyMzJy87P0dTt7u/l5uji4+Xh4uTGx8vExsrNz9L09fXMztHR0tXHyMzT1NfIys3y8/TX2Nvd3uDCw8f4+fnq6+zu7/Dn6Orl5uf6+/vDxMj9/v77+/zX2Nrn5+ns7O3Iys7m5+nx8fLi4+TDxcj19vbk5efS09bKzM/AwcXv7/DQ0tTp6evb3N7c3d/3+PjZ2tzt7e7Dxcnb3N/U1tjQ0tXFx8vR09by8vPj5OXX2dv4+Pj5+fn19fbU1djY2dvS1NbJys7ExcnMzdH5+vrg4ePw8fLLzND+///7/PzP0NPr7O3a293W19rQ0dTk5ebW2Nr8/f3R09WCbK1KAAACgklEQVRIx52UV1vbQBREx7bks7LBNBeMDab3DoGEhJBACr0kpPfee//3eZCFZZDsfJmn3auR9s7s6Ep+tJV+fbnq5OPTqfEZheHT+qyhgsnDvkDaYJxjsHu6T7DORgHsa5mD7dZ098b1S1MAduYYbfkNENtp9ZU+7AK8yvlpJQPFifSxl/vbgSFfl8s2ZBcDek4YWGjzdjMOvO0KFDeQh4LXzR5k34WYNWDgibscg3ynV29MRGN2LJpo9ApjYDYkqXUKJsrFptSReammcu0FfJSkCZhcdUsNjs9lp8EtPi3CdUmzsF6mGTDNkaSVjDQbMGViAnalPrBdQU0OxFvKp7XEwXGP7gN7TT9hzn2UgnhbJTpxSLnLWbis77DjKgXT4nOkxYCrehN69AMOvDaaq6xrhoQkaRTmNAzbkqQoRKp4EYi69wV7ugiujBgkq3hJiEmSPsOWimBJkmxv4cEC21sUlYULdb7XBlkVoLdOf71Q0Jz3OFzvFfijb9BRx78OONRXuFbnPkYgotZ99nM177fLYP+WpmGlZl4y0O4G9qpq5M8agvOSVqfgXI08D0LWkqT38NoK/T/Sk+BOhZwD46HT6QzEygNgBZa6Q2j9ptKVojASTEsvwKmjXacJO/kSOM8q2w6wHwXQLgMlf6Ed4msnaItFuFU9Ju/Aw+O0riwUqrOrK3i5qeS5HS52B/hkBqoqPWBGT/Z8H5xe3z4DPA7QlpuH4cqAbjBwOtCrzrzP0+cOTFvB5pcqWi7EYagr7M5vgIl4UpcaQ7OhkbKWl94LIcjNw3BaGWBTtdCZh3ujoVIrOA/YELXq8NQD8CBZjyarAHa/6uPmFoP6F9y+q//HXzl1QJFrg6y6AAAAAElFTkSuQmCC"
												alt="距离"
												style="display: none"
											/>
											<strong>距离未知</strong></span
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import "vant/lib/index.css";
Vue.use(Tab);
Vue.use(Tabs);
import { Loading } from "vant";

Vue.use(Loading);
import {
	movieGatewayData,
	TheTicketDate,
	buyTicketCinemaData,
} from "@/api/api";
moment.locale("zh-cn");
import moment from "moment";

import { Indicator } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
	data() {
		return {
			activeName: 0,
			advertising: [],
			showCinemas: [],
			cinemasmovie: [],
		};
	},
	async mounted() {
		let advertisingret = await movieGatewayData();
		this.advertising = advertisingret.data.data;

		let CinemasRet = await TheTicketDate(this.$route.params.filmId);
		this.showCinemas = CinemasRet.data.data.showCinemas;

		if (this.showCinemas.length) {
			this.showCinemas.sort(this.sortFun("showDate"));
		}

		this.handleClick(0);
		Indicator.open({
			text: "加载中...",
			spinnerType: "snake",
		});
	},
	filters: {
		premiereAt(val) {
			return moment(val * 1000).format("dddMM月DD日");
		},
	},
	methods: {
		async handleClick(event) {
			Indicator.open({
				text: "加载中...",
				spinnerType: "snake",
			});
			let CinemaData = await buyTicketCinemaData(
				`${this.showCinemas[event].cinemaList}`
			);
			this.cinemasmovie = CinemaData.data.data.cinemas;
			Indicator.close();
		},
		gocinePleX(cinemaId, showDate) {
			let num = this.$route.params.filmId;
			this.$router.push({
				path: `/cinema/${cinemaId}/film/${num}/${showDate}`,
			});
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
	},
};
</script>
<style lang="scss" >
div {
	box-sizing: border-box;
}
.cinemas {
	margin-top: 44px;
	overflow-x: hidden;
}
.filter {
	.tab {
		height: 49px;
		width: 100%;
		padding: 15px 0;
		position: relative;
		z-index: 2999;
		background-color: #fff;
		img {
			vertical-align: middle;
			padding-left: 2px;
		}
		.district {
			font-size: 14px;
			line-height: 20px;
			text-align: center;
			color: #191a1b;
			float: left;
			width: 50%;
		}
		.specify {
			font-size: 14px;
			line-height: 20px;
			text-align: center;
			color: #191a1b;
			float: left;
			width: 50%;
		}
	}
}
.cinema-banner-wrap .cinema-list {
	list-style: none;
	padding: 0;
	margin: 0;
	li {
		padding: 15px;
		position: relative;
		background-color: #fff;
		.name {
			font-size: 15px;
			color: #18191a;
			position: relative;
			.icon {
				color: #ffb245;
				margin-left: 7px;
				font-size: 10px;
				padding: 0 6px;
				text-align: center;
				position: absolute;
				top: 50%;
				-webkit-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				transform: translateY(-50%);
			}
		}
		.type {
			margin-top: 5px;
			font-size: 13px;
			color: #797d82;
		}
	}
	.cinema-list-wrap {
		padding-bottom: 49px;
		z-index: 100;
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		li {
			border-top: 1px solid #888888;

			position: relative;
			background-color: #fff;
			padding: 17px;
			.cinema-item-wrap {
				width: 100%;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: start;
				-ms-flex-pack: start;
				justify-content: flex-start;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;

				.cinema-info-lf {
					width: calc(100% - 65px);
					text-align: left;
					padding-right: 10px;
					float: left;
					.cinema-name {
						color: #191a1b;
						font-size: 15px;
					}
					span {
						display: block;
						max-width: 80%;
						overflow: hidden;
						-o-text-overflow: ellipsis;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.cinema-address {
						color: #797d82;
						font-size: 12px;
						margin-top: 5px;
					}
				}
				.cinema-info-rt {
					width: 70px;
					text-align: center;
					float: right;
					margin-right: -5px;
					.price-fmt {
						font-size: 15px;
						color: #ff5f16;
						height: 0 !important;
						display: inline-table !important;
					}
					.price-fmt i {
						font-size: 11px;
						font-style: normal;
					}
					.upon {
						color: #ff5f16;
						font-size: 10px;
					}
					.cinema-gpsAddress {
						display: block;
						font-size: 11px;
						color: #797d82;
						margin-top: 5px;
					}
					img {
						display: block;
						width: 13px;
						height: 17.5px;
						margin: 0 auto;
						margin-top: -30px;
					}
					strong {
						font-weight: 400;
						display: block;
						margin-top: 5px;
					}
				}
			}
		}
	}
}
.cinema-list-wrap {
	padding-bottom: 49px;
	z-index: 100;
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		border-top: 1px solid #888888;

		position: relative;
		background-color: #fff;
		padding: 17px;
		.cinema-item-wrap {
			width: 100%;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: start;
			-ms-flex-pack: start;
			justify-content: flex-start;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;

			.cinema-info-lf {
				width: calc(100% - 65px);
				text-align: left;
				padding-right: 10px;
				float: left;
				.cinema-name {
					color: #191a1b;
					font-size: 15px;
				}
				span {
					display: block;
					max-width: 80%;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.cinema-address {
					color: #797d82;
					font-size: 12px;
					margin-top: 5px;
				}
			}
			.cinema-info-rt {
				width: 70px;
				text-align: center;
				float: right;
				margin-right: -5px;
				.price-fmt {
					font-size: 15px;
					color: #ff5f16;
					height: 0 !important;
					display: inline-table !important;
				}
				.price-fmt i {
					font-size: 11px;
					font-style: normal;
				}
				.upon {
					color: #ff5f16;
					font-size: 10px;
				}
				.cinema-gpsAddress {
					display: block;
					font-size: 11px;
					color: #797d82;
					margin-top: 5px;
				}
				img {
					display: block;
					width: 13px;
					height: 17.5px;
					margin: 0 auto;
					margin-top: -30px;
				}
				strong {
					font-weight: 400;
					display: block;
					margin-top: 5px;
				}
			}
		}
	}
}
.el-tabs__nav-scroll {
	overflow-y: hidden !important;
	overflow-x: auto !important;
}
</style>