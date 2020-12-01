<template>
	<div>
		<div class="swiper-wrapper">
			<!-- 插槽 -->
			<slot></slot>
		</div>
	</div>
</template>
<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
	// JavaScript代码
	props: ["perview", "myClassName"],
	mounted() {
		// this.$nextTick当当前异步操作全部做完之后再去做其里面的东西
		this.$nextTick(() => {
			new Swiper("." + this.myClassName, {
				slidesPerView: this.perview,
				spaceBetween: this.myClassName == "photpSwiper" ? 10 : 0,
			});
		});
	},
};
</script>