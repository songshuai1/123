<template>
	<div>
		<FilmList :list="list" :type="type" :key="'film' + list.length"></FilmList>
	</div>
</template>
<script>
// 导入api.js
import { nowPlayingListData } from "@/api/api";
import axios from "axios";
import FilmList from "@/components/FilmList";

export default {
	data() {
		return {
			num: 1,
			list: [],
			type: 1, //当前传递的数据为正在热映数据
		};
	},
	components: {
		FilmList,
	},
	async mounted() {
		let ret = await nowPlayingListData(this.num);
		this.list = ret.data.data.films;
	},
	methods: {
		getLocation() {
			let _this = this;
			AMap.plugin("AMap.Geolocation", function () {
				var geolocation = new AMap.Geolocation({
					// 是否使用高精度定位，默认：true
					enableHighAccuracy: true,
					// 设置定位超时时间，默认：无穷大
					timeout: 5000,
				});
				geolocation.getCurrentPosition();
				AMap.event.addListener(geolocation, "complete", onComplete);
				AMap.event.addListener(geolocation, "error", onError);
				// data是具体的定位信息
				function onComplete(data) {
					console.log("具体的定位信息", data);
					let res = data.addressComponent.province;
					let city = res.split("市").join("");
					_this.$store.commit("setCity", city);
					_this.$store.commit("location", city);
				}
				function onError(data) {
					// 失败 启用 ip定位
					AMap.plugin("AMap.CitySearch", function () {
						var citySearch = new AMap.CitySearch();
						citySearch.getLocalCity(function (status, result) {
							if (status === "complete" && result.info === "OK") {
								// 查询成功，result即为当前所在城市信息
								// console.log("通过ip获取当前城市：", result);
								// _this.$router.push({ path: "/city" });
								// let res = result.city;
								// let city = res.split("市").join("");
								// _this.$store.commit("setCity", city);
								// _this.$store.commit("location", city);
							}
						});
						return;
					});
				}
			});
			AMap.plugin("AMap.CitySearch", function () {
				var citySearch = new AMap.CitySearch();
				citySearch.getLocalCity(function (status, result) {
					console.log();
					if (status === "complete" && result.info === "OK") {
						console.log(result);
						// 查询成功，result即为当前所在城市信息
					}
				});
			});
		},
		onSwipeLeft() {
			console.log("左滑");
		},
	},
	created() {
		if (localStorage.getItem("city") == null) {
			this.getLocation();
		}
	},
};
</script>