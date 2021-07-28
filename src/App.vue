<template>
	<header class="header">
		<div class="wrapper">
			<div class="header-wrap">
				<a href="#" class="logo">
					<img
						src="https://pbs.twimg.com/profile_images/699941767714451456/X3U_ksnH_400x400.png"
						alt="logo"
					/>
					<span>Autodoc test</span>
				</a>
			</div>
		</div>
	</header>
	<main class="main">
		<div class="wrapper">
			<div class="product__search">
				<input type="text" placeholder="Что ищем?" v-model="search" />
			</div>
			<div class="product__top">
				<SortProducts :cls="clsSort" @sortHandler="sortHandler" />
				<div class="product__add">
					<button class="btn btn_product" @click="showPopup = true">
						Добавить товар
					</button>
				</div>
			</div>
			<ListProducts :products="searchHandler" @removeProduct="removeHandler" />
		</div>
		<Popups
			:showPopup="showPopup"
			@hidePopup="hidePopup"
			@createProduct="createHandler"
		/>
	</main>
</template>

<script>
	import ListProducts from "./components/ListProducts.vue";
	import SortProducts from "./components/SortProducts.vue";
	import Popups from "./components/Popups.vue";
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: "App",
		data() {
			return {
				showPopup: false,
				clsSort: true,
				search: "",
			};
		},
		components: {
			ListProducts,
			SortProducts,
			Popups,
		},
		methods: {
			...mapMutations(["createProduct", "sortProducts", "removeProduct"]),
			createHandler(product) {
				this.createProduct(product);
			},
			sortHandler() {
				let order = this.clsSort ? 1 : -1;
				this.sortProducts(order);
				this.clsSort = !this.clsSort;
			},
			removeHandler(id) {
				this.removeProduct(id);
			},
			hidePopup(value) {
				this.showPopup = value;
			},
		},
		computed: {
			...mapGetters(["allProducts"]),
			searchHandler() {
				return this.allProducts.filter(
					(product) =>
						product.name.toLowerCase().includes(this.search.toLowerCase()) ||
						product.cat.toLowerCase().includes(this.search.toLowerCase()) ||
						new Date(product.date)
							.toLocaleDateString()
							.toLowerCase()
							.includes(this.search.toLowerCase())
				);
			},
		},
		created() {
			this.$store.dispatch("initializeStore");
		},
	};
</script>

<style lang="stylus">
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video
		margin 0
		padding 0
		border 0
		font-size 100%
		font inherit
		vertical-align baseline

	*
		box-sizing border-box

	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section
		display block

	body
		line-height 1

	ol, ul
		list-style none

	blockquote, q
		quotes none

	blockquote:before, blockquote:after,
	q:before, q:after
		content ''
		content none

	table
		border-collapse collapse
		border-spacing 0

	#app
		font-family Avenir, Helvetica, Arial, sans-serif
		-webkit-font-smoothing antialiased
		-moz-osx-font-smoothing grayscale


	.fade-enter-active,
	.fade-leave-active
		transition opacity 0.5s ease

	.fade-enter-from,
	.fade-leave-to
		opacity 0

	html, body
		height 100%

	body
		background-color white
		color #2c3e50

	.btn
		height 40px
		display inline-flex
		align-items center
		justify-content center
		text-align center
		text-transform uppercase
		background-color #121212
		color #f26922
		border none
		min-width 180px
		font-size 12px
		font-weight 700
		cursor pointer
		transition all .25s
		&:hover
			background-color lighten(#121212, 10%)

	.wrapper
		max-width 1200px
		padding 0 40px
		margin 0 auto

	img
		display block
		max-width 100%

	.header
		padding 20px 0
		&-wrap
			width 100%
			display flex
			align-items center

	.logo
		display flex
		align-items center
		max-width 60px
		text-decoration none
		color #f26922
		span
			margin-left 20px
			flex-shrink 0
			font-weight 700

	.product
		&__search
			margin-bottom 15px
		&__top
			display flex
			justify-content space-between
			align-items center
			margin-bottom 30px
		&__search
			input
				width 100%
				height 40px
				padding 0 20px
				outline-color #f26922
				outline none
				transition all .25s
				border none
				border-radius 10px
				box-shadow inset 0 0 0 1px black
				&:focus
					box-shadow inset 0 0 0 2px #f26922
</style>
