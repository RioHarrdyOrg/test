<template>
	<div class="product__sort">
		<span>Сортировать по - </span>
		<button @click="$emit('sortHandler')">
			<span v-if="cls">Новые</span>
			<span v-else>Старые</span>
		</button>
	</div>
</template>

<script>
	export default {
		name: "SortProducts",
		props: {
			cls: Boolean,
		},
	};
</script>

<style lang="stylus" scoped>
	.product__sort
		button
			span
				pointer-events none
			&.new
				span
					&:first-child
						font-weight 700
			&.old
				span
					&:last-child
						font-weight 700
</style>
