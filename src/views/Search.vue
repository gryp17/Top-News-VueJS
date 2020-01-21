<template>
	<NoSearchResults v-if="noResults"/>
	<ArticleCardsList v-else>
		<ArticleCard v-for="article in searchResults" :key="article.id" :article="article" />
	</ArticleCardsList>
</template>

<script>
	import $ from 'jquery';
	import { mapState, mapActions } from 'vuex';

	import NoSearchResults from '@/components/NoSearchResults.vue';
	import ArticleCardsList from '@/components/ArticleCardsList.vue';
	import ArticleCard from '@/components/ArticleCard.vue';

	export default {
		components: {
			ArticleCardsList,
			ArticleCard,
			NoSearchResults
		},
		data() {
			return {
				section: this.$route.params.section,
				searchTerm: decodeURIComponent(this.$route.params.searchTerm || '*'),
				limit: 6,
				offset: 0,
				hasMore: false,
				loading: false,
				noResults: false
			};
		},
		computed: {
			...mapState('articles', [
				'searchResults'
			])
		},
		watch: {
			/**
			 * Watches the route and calls the getArticles() function with the new parameters
			 * @param {Object} route
			 */
			$route(route) {
				this.resetState();
				this.getArticles();
			}
		},
		created() {
			this.getArticles();
			$(window).on('scroll', this.onWindowScroll);
		},
		destroyed() {
			$(window).off('scroll', this.onWindowScroll);
		},
		methods: {
			...mapActions('articles', [
				'search'
			]),
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			},
			/**
			 * Used for lazy loading more articles when the user scrolls down
			 */
			onWindowScroll() {
				const scrollTop = $(window).scrollTop();
				const bodyHeight = $('body').height() - 1000;

				//if there is no other lazy loading in progress and there are more articles to be loaded
				if (!this.loading && this.hasMore && scrollTop > bodyHeight) {
					this.offset = this.offset + this.limit;
					this.getArticles();
				}
			},
			/**
			 * Fetches the articles matching the data properties
			 */
			getArticles() {
				this.loading = true;

				const params = {
					section: this.section,
					searchTerm: this.searchTerm,
					limit: this.limit,
					offset: this.offset
				};

				this.search(params).then((results) => {
					this.hasMore = results.length === this.limit;
					this.loading = false;

					//show the "no-results" message
					this.noResults = this.offset === 0 && this.searchResults.length === 0;
				}).catch((e) => {
					this.loading = false;
				});
			}
		}
	};
</script>
