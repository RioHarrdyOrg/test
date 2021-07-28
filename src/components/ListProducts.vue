<template>
	<ul class="product__list">
		<li class="product__item" v-for="product in products" :key="product.id">
			<div class="product__photo">
				<img :src="product.photo" alt="Vue logo" />
			</div>
			<div class="product__inner">
				<div class="product__name">{{ product.name }}</div>
				<div class="product__cat">{{ product.cat }}</div>
				<div class="product__date">
					{{ new Date(product.date).toLocaleDateString() }}
				</div>
			</div>
			<a
				href="#"
				class="product__remove"
				@click.stop="$emit('removeProduct', product.id)"
				><span></span><span></span
			></a>
		</li>
	</ul>
</template>

<script>
	export default {
		name: "ListProducts",
		props: {
			products: Array,
		},
		filters: {
			toData(value) {
				if (!value) return "";
				value = value.toLocaleDateString();
				return value;
			},
		},
	};
</script>

<style scoped lang="stylus">
	.product
		&__list
			display flex
			flex-wrap wrap
			margin 0 -20px
		&__item
			position relative
			margin 0 20px 20px
			width calc(33.33% - 40px)
			border-radius 10px
			overflow hidden
			box-shadow 0 10px 10px 10px rgba(black, .03)
			&:hover
				.product__remove
					opacity 1
		&__photo
			padding 20px
			height 140px
			display flex
			align-items center
			justify-content center
			img
				max-height 100%
		&__inner
			padding 20px
			background-color rgba(black, 5%)
			font-weight 400
			text-align center
		&__cat
			margin 10px 0
		&__remove
			position absolute
			width 15px
			height 15px
			right 5px
			top 5px
			opacity 0
			transition opacity .25s
			span
				position absolute
				left 50%
				top 50%
				width 100%
				height 2px
				border-radius 10px
				background-color black
				&:nth-child(1)
					transform translate(-50%, -50%) rotate(45deg)
				&:nth-child(2)
					transform translate(-50%, -50%) rotate(-45deg)
</style>
