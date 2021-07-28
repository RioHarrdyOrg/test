<template>
	<transition name="fade">
		<div class="popup" v-show="showPopup">
			<div class="popup-bg" @click="hidePopup"></div>
			<div class="popup-main">
				<button class="popup-close" @click="hidePopup">
					<span></span><span></span>
				</button>
				<CreateProduct @createProduct="createProduct" />
			</div>
		</div>
	</transition>
</template>

<script>
	import CreateProduct from "./CreateProduct.vue";
	export default {
		name: "Popups",
		props: {
			showPopup: Boolean,
		},
		components: { CreateProduct },
		methods: {
			hidePopup() {
				this.$emit("hidePopup", false);
			},
			createProduct(product) {
				this.$emit("createProduct", product);
				this.hidePopup();
			},
		},
	};
</script>

<style lang="stylus">
	.popup
		position fixed
		left 0
		top 0
		right 0
		bottom 0
		width 100%
		display flex
		align-items center
		justify-content center
		&-bg
			position absolute
			cursor pointer
			left 0
			top 0
			width 100%
			height 100%
			background-color rgba(black, .7)
		&-main
			width 100%
			max-width 350px
			position relative
			background-color white
			padding 40px
			border-radius 20px
		&-close
			position absolute
			background-color transparent
			outline none
			border none
			cursor pointer
			top 10px
			right 10px
			width 15px
			height 15px
			opacity .5
			transition opacity .25s
			&:hover
				opacity 1
			span
				position absolute
				left 50%
				top 50%
				width 100%
				height 2px
				background-color black
				border-radius 10px
				&:nth-child(1)
					transform translate(-50%, -50%) rotate(-45deg)
				&:nth-child(2)
					transform translate(-50%, -50%) rotate(45deg)
</style>
