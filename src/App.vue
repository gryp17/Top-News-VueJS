<template>
	<div id="app">

		<div class="content-wrapper container">
			<MainMenu/>

			<div v-if="ready" class="row no-gutters">
				<div class="col-md-4 order-md-8 col-sm-push-8">
					<div class="aside-wrapper">

						<UserPanel/>

						<div class="d-none d-md-block">
							<LatestArticlesWidget/>
							<PopularArticlesWidget/>
							<WeatherWidget/>
						</div>

					</div>
				</div>
				<div class="col-md-8 order-md-4 col-sm-pull-4">
					<div class="page-wrapper">
						<CurrencyExchangeBar/>
						<SearchBar/>

						<router-view/>
					</div>
				</div>
			</div>

			<Footer/>
		</div>

		<ScrollToTop/>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	import limitTo from '@/filters/limit-to';
	import capitalize from '@/filters/capitalize';

	import FormInput from '@/components/forms/FormInput.vue';
	import FormFileInput from '@/components/forms/FormFileInput.vue';
	import FormDropdown from '@/components/forms/FormDropdown.vue';
	import ContentEditor from '@/components/forms/ContentEditor.vue';
	import ScrollToTop from '@/components/ScrollToTop.vue';
	import MainMenu from '@/components/MainMenu.vue';
	import Footer from '@/components/Footer.vue';
	import CurrencyExchangeBar from '@/components/CurrencyExchangeBar.vue';
	import SearchBar from '@/components/SearchBar.vue';
	import UserPanel from '@/components/UserPanel.vue';
	import LatestArticlesWidget from '@/components/LatestArticlesWidget.vue';
	import PopularArticlesWidget from '@/components/PopularArticlesWidget.vue';
	import WeatherWidget from '@/components/WeatherWidget.vue';

	//global components and filters
	Vue.filter('limitTo', limitTo);
	Vue.filter('capitalize', capitalize);
	Vue.component('FormInput', FormInput);
	Vue.component('FormFileInput', FormFileInput);
	Vue.component('FormDropdown', FormDropdown);
	Vue.component('ContentEditor', ContentEditor);

	export default {
		components: {
			MainMenu,
			Footer,
			CurrencyExchangeBar,
			SearchBar,
			UserPanel,
			LatestArticlesWidget,
			PopularArticlesWidget,
			WeatherWidget,
			ScrollToTop
		},
		data() {
			return {
				ready: false
			};
		},
		created() {
			Promise.all([
				this.getUserSession(),
				this.getConfig(),
				this.getLatestArticles(),
				this.getPopularArticles('today')
			]).then((res) => {
				this.ready = true;
			}).catch(() => {
				this.$toasted.global.apiError({
					message: 'Failed to initialize app'
				});
			});
		},
		methods: {
			...mapActions([
				'getConfig',
			]),
			...mapActions('user', [
				'getUserSession',
			]),
			...mapActions('articles', [
				'getLatestArticles',
				'getPopularArticles'
			])
		}
	};
</script>

<style scoped lang="scss">
	#app{
		.content-wrapper{
			max-width: $layout-width;
			min-height: 600px;
			padding: 0;
			background-color: $content-background-color;

			.page-wrapper, .aside-wrapper {
				padding: 10px;
			}

			@media (max-width: $layout-width){
				max-width: 100%;
			}
		}
	}
</style>
