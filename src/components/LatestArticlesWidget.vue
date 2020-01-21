<template>
	<div class="latest-articles-widget">
		<h6 class="title">
			Latest articles
		</h6>

		<div id="latestArticlesCarousel" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li
					v-for="(article, index) in latest"
					:key="article.id"
					:data-slide-to="index"
					:class="{'active': index === 0}"
					data-target="#latestArticlesCarousel"
				></li>
			</ol>

			<div class="carousel-inner">
				<div
					v-for="(article, index) in latest"
					:key="article.id"
					:class="['carousel-item', {'active': index === 0}]"
				>
					<img :src="articlesDirectory + article.image"/>
					<div class="carousel-caption d-none d-md-block">
						<router-link
							:to="{name: 'article', params: {id: article.id}}"
							:title="article.title"
						>
							{{ article.title }}
						</router-link>
					</div>
				</div>
			</div>

			<a class="carousel-control-prev" href="#latestArticlesCarousel" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#latestArticlesCarousel" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	export default {
		computed: {
			...mapState('articles', [
				'latest'
			]),
			...mapGetters([
				'articlesDirectory'
			])
		},
	};
</script>

<style scoped lang="scss">

	.latest-articles-widget {
		margin-top: 10px;

		.title{
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
		}

		.carousel-indicators{
			height: 20px;
			top: 10px;
		}

		.carousel-item{
			img{
				width: 100%;
			}

			.carousel-caption{
				bottom: 5px;
				left: 5px;
				right: 5px;
				padding-bottom: 5px;
				padding-top: 5px;
				background-color: rgba(255, 255, 255, 0.9);
				border-radius: 3px;
			}
		}
	}

</style>
