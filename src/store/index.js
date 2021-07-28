import { createStore } from "vuex";
import uniqueId from "lodash.uniqueid";

export default createStore({
	state: {
		products: [
			{
				id: uniqueId(),
				photo: require("../assets/logo.png"),
				name: "Водка",
				cat: "Алкоголь",
				date: new Date(new Date().setDate(new Date().getDate() - 2)),
			},
			{
				id: uniqueId(),
				photo: require("../assets/logo.png"),
				name: "Капуста",
				cat: "Овочи",
				date: new Date(new Date().setDate(new Date().getDate() + 1)),
			},
			{
				id: uniqueId(),
				photo: require("../assets/logo.png"),
				name: "Кофе",
				cat: "Бакалея",
				date: new Date(),
			},
		],
	},
	mutations: {
		createProduct(state, newProduct) {
			state.products.unshift(newProduct);
		},
		removeProduct(state, id) {
			state.products = state.products.filter((product) => product.id !== id);
		},
		sortProducts(state, order) {
			const products = state.products;
			products.sort(function(a, b) {
				var results = a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
				return results * order;
			});
			state.products = products;
		},
	},
	getters: {
		allProducts(state) {
			return state.products;
		},
		getSearch(state) {
			return state.search;
		},
	},
	actions: {
		initializeStore({ state }) {
			if (localStorage.getItem("state")) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem("state")))
				);
			}
		},
	},
});
