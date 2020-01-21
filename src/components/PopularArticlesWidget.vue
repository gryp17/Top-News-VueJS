<template>
	<div class="popular-articles-widget">

		<h6 class="title">
			Popular articles
		</h6>

		<div class="btn-group btn-group-sm row no-gutters" role="group">
			<button
				v-for="(period, index) in periods"
				:key="index"
				:class="['btn btn-light col-4', {'active': selectedPeriod === period}]"
				@click="changePeriod(period)"
				type="button"
			>
				{{ period }}
			</button>
		</div>

		<div class="articles-wrapper">
			<router-link
				v-for="(article, index) in articles"
				:key="article.id"
				:to="{name: 'article', params: {id: article.id}}"
				:title="article.title"
				class="item"
			>
				{{ index + 1 }}.
				{{ article.title }}
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				periods: [
					'today',
					'this week',
					'all time'
				],
				selectedPeriod: 'today'
			};
		},
		computed: {
			...mapState('articles', [
				'popular'
			]),
			...mapGetters([
				'articlesDirectory'
			]),
			articles() {
				return this.popular[this.selectedPeriod];
			}
		},
		methods: {
			...mapActions('articles', [
				'getPopularArticles'
			]),
			/**
			 * Sets the selected period and fetches the articles corresponding to it
			 * @param {String} period
			 */
			changePeriod(period) {
				this.getPopularArticles(period).then(() => {
					this.selectedPeriod = period;
				});
			}
		}
	};
</script>

<style scoped lang="scss">

	.popular-articles-widget {
		margin-top: 20px;

		.btn-group{
			width: 100%;

			button{
				text-transform: capitalize;
			}
		}

		.title{
			text-align: center;
			margin-bottom: 10px;
			font-weight: bold;
		}

		.articles-wrapper{
			margin-top: 10px;

			.item{
				display: block;
				margin-bottom: 10px;
				font-size: 15px;
			}
		}
	}

</style>
