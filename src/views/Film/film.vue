<template>
	<div>
		<filmListTopNav :class="fixed ? 'fixed' : ''"></filmListTopNav>
		<router-view></router-view>
	</div>
</template>
<script>
import filmListTopNav from "@/components/FilmListTopNav";
export default {
	// 注册组件
	components: {
		filmListTopNav,
	},
	data() {
		return {
			fixed: false,
		};
	},
	mounted() {
		window.addEventListener(
			"scroll",
			(e) => {
				let top = document.documentElement.scrollTop;
				if (top > 150) {
					this.fixed = true;
				} else {
					this.fixed = false;
				}
			},
			true
		);
	},
};
</script>
<style lang="scss" scoped>
.fixed {
	position: fixed;
	top: 0;
	background: #ffffff;
}
</style>