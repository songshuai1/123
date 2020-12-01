<template>
	<div>
		{{ count }}
		{{ city }}
		{{ getCount }}
		<br />
		<button @click="handerClick5">点我+13</button>
	</div>
</template>
<script>
import { mapState } from "vuex";
// 按需导入 mapMutations
import { mapMutations } from "vuex";
// 按需导入mapActions
import { mapActions } from "vuex";
// 按需导入
import { mapGetters } from "vuex";
export default {
	mounted() {
		// 1,state直接获取对应的数据值
		console.log(this.$store.state.count);
		console.log(this.$store.state.city);
	},
	computed: {
		...mapState(["count", "city"]),
		...mapGetters(["getCount"]),
	},
	methods: {
		...mapMutations(["add"]),
		...mapActions(["addAsync"]),
		handerClick1() {
			this.$store.commit("add", 13);
		},
		handerClick2() {
			this.add(13);
		},
		handerClick3() {
			this.$store.dispatch("addAsync", 31);
		},
		handerClick4() {
			this.addAsync(31);
		},
		handerClick5() {
			console.log(this.$store.getters.getCount);
		},
	},
};
</script>
<style lang="scss" scoped>

</style>