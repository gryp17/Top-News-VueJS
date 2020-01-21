import Vue from 'vue';
import Toasted from 'vue-toasted';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import '@/assets/css/index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Toasted, {
	position: 'bottom-right',
	duration: 8000,
	keepOnHover: true,
	iconPack: 'fontawesome'
});

//register custom toast type
Vue.toasted.register('apiError', (payload) => {
	return payload.message || 'Something went wrong...';
}, {
	type: 'error',
	icon: {
		name: 'fa-exclamation-triangle'
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
