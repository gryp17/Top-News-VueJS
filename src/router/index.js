import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

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
		path: '/article/:id/edit',
		name: 'edit-article',
		component: () => import(/* webpackChunkName: "article" */ '@/views/EditArticle.vue')
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

export default router;
