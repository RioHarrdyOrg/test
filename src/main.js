import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import UniqueId from "vue-unique-id";

store.subscribe((mutation, state) => {
	if (state) {
		localStorage.setItem("state", JSON.stringify(state));
	}
});
createApp(App)
	.use(store, UniqueId)
	.mount("#app");
