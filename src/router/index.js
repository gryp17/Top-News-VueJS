import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Forbidden from '@/views/Forbidden.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/search/:section/:searchTerm?',
		name: 'search',
		//route level code-splitting
		//this generates a separate chunk (about.[hash].js) for this route
		//which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue')
	},
	{
		path: '/article/new',
		name: 'add-article',
		component: () => import(/* webpackChunkName: "article" */ '@/views/AddArticle.vue'),
		meta: {
			adminRequired: true
		}
	},
	{
		path: '/article/:id/edit',
		name: 'edit-article',
		component: () => import(/* webpackChunkName: "article" */ '@/views/EditArticle.vue'),
		meta: {
			adminRequired: true
		}
	},
	{
		path: '/article/:id',
		name: 'article',
		component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue')
	},
	{
		path: '/user/:id',
		name: 'user',
		component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue')
	},
	{
		path: '/forbidden',
		name: 'forbidden',
		component: Forbidden
	},
	{
		path: '*',
		component: Home
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		};
	}
});

function getUserSession() {
	if (store.state.user.userSession) {
		return Promise.resolve(store.state.user.userSession);
	}

	return store.dispatch('user/getUserSession').then((res) => {
		return res.user;
	});
}

function userIsAdmin() {
	if (store.state.user.userSession) {
		return Promise.resolve(store.state.user.userSession.type === 'admin');
	}

	return getUserSession().then((user) => {
		return user && user.type === 'admin';
	});
}

router.beforeEach((to, from, next) => {
	const forbiddenRoute = {
		name: 'forbidden'
	};

	if (to.meta.adminRequired) {
		userIsAdmin().then((isAdmin) => {
			next(isAdmin ? true : forbiddenRoute);
		});
	} else if (to.meta.authRequired) {
		getUserSession().then((user) => {
			next(user ? true : forbiddenRoute);
		});
	} else {
		next();
	}
});

export default router;
