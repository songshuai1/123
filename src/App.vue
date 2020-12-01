<template>
	<div id="app">
		<FooterNav v-if="is_show" />
		<router-view />
	</div>
</template>
<script>
// 导入需要使用的组件
import FooterNav from "@/components/FooterNav";
export default {
	data() {
		return {
			is_show: true,
		};
	},
	components: {
		FooterNav,
	},
	created() {
		this.eventBus.$on("footerNav", (value) => {
			this.is_show = value;
		});
	},
};
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html,
body {
	height: 100%;
	touch-action: none;
	ul,
	li {
		list-style: none;
	}
}
a {
	text-decoration: none;
}
</style>