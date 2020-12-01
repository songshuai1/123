<template>
	<div>
		<v-touch
			v-on:swipeleft="onSwipeLeft"
			:swipe-options="{ direction: 'horizontal' }"
			v-on:swiperight="onSwipeRight"
		>
			<FilmList
				:list="list"
				:type="type"
				:key="'film' + list.length"
			></FilmList>
		</v-touch>
	</div>
</template>
<script>
// 导入api接口
import { comingSoonListData } from "@/api/api";
import FilmList from "@/components/FilmList";
export default {
	data() {
		return {
			num: 1,
			list: [],
			type: 2, //当前传递的数据为正在热映数据
		};
	},
	async mounted() {
		let ret = await comingSoonListData(this.num);
		this.list = ret.data.data.films;
	},
	components: {
		FilmList,
	},
	methods: {
		onSwipeLeft() {
			this.$router.push({ path: "/cinema" });
		},
		onSwipeRight() {
			this.$router.push({ path: "/film/nowPlaying" });
		},
	},
};
</script>