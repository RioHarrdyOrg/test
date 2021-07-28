<template>
	<div class="product__form">
		<form class="form" @submit.prevent="createProduct">
			<div class="form-field">
				<div class="upload-file__wrapper">
					<input
						type="file"
						id="upload-file__input_1"
						class="upload-file__input"
						accept=".jpg, .png"
						@change="changeInputFile"
					/>
					<label class="upload-file__label" for="upload-file__input_1">
						<svg
							class="upload-file__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								d="M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z"
							></path>
						</svg>
						<a
							href="#"
							class="upload-file__remove"
							v-if="file"
							@click.prevent="file = ''"
							><span></span><span></span
						></a>
						<span class="upload-file__text" v-if="!file">Прикрепить файл</span>
						<span class="upload-file__text" v-if="file">{{ file.name }}</span>
					</label>
					<small class="error" v-if="error"
						>Файл должен быть не более 5 МБ.</small
					>
				</div>
			</div>
			<div class="form-field">
				<input
					type="text"
					v-model="productName"
					required
					placeholder="Введите наименование товара"
				/>
			</div>
			<div class="form-field">
				<select v-model="productCat" required>
					<option disabled value="">Выберите один из вариантов</option>
					<option value="alcohol">Алкоголь</option>
					<option value="grocery">Бакалея</option>
					<option value="sheep">Овочи</option>
				</select>
			</div>
			<div class="form-field form-field_btn">
				<button class="btn" type="submit">Добавить</button>
			</div>
		</form>
	</div>
</template>

<script>
	import uniqueId from "lodash.uniqueid";
	export default {
		name: "CreateProduct",
		data() {
			return {
				file: "",
				path: "",
				productName: "",
				productCat: "",
				error: false,
			};
		},
		methods: {
			changeInputFile(e) {
				this.file = e.target.files[0];
				if (this.file.size > 5 * 1024 * 1024) {
					this.error = true;
					this.file = "";
				}
			},
			createProduct() {
				const newProduct = {
					id: uniqueId(),
					photo: require("../assets/logo.png"),
					name: this.productName,
					cat: this.productCat,
					date: new Date(),
				};
				this.$emit("createProduct", newProduct);
			},
		},
	};
</script>

<style lang="stylus" scoped>
	.form-field
		margin-bottom 15px
		&:last-child
			margin-bottom 0
		input, select
			height 45px
			border 1px solid black
			width 100%
			padding 0 10px
			display flex
			align-items center
			border-radius 10px
			outline none
		&_btn
			text-align center

	.upload-file__wrapper
		small
			color red
			font-size 12px
	.upload-file__input
		opacity: 0
		position: absolute
		z-index: -1
		overflow: hidden
		width: 0.4px
		height: 0.4px

	.upload-file__label
		position relative
		display: flex
		justify-content: center
		align-items: center
		max-width: 100%
		border: 2px dashed #150B22
		padding: 10px 20px
		border-radius: 10px
		cursor: pointer


	.upload-file__icon
		width: 30px
		height: auto
		margin-right: 11px

	.upload-file__label
		.upload-file__text, .upload-file__icon path
			transition: .25s ease

		&:hover

			.upload-file__text
				color: #f26922

			.upload-file__icon path
				fill: #f26922
	.upload-file
		&__remove
			position absolute
			width 15px
			height 15px
			right 5px
			top 5px
			opacity 0.5
			transition opacity .25s
			&:hover
				opacity 1
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
