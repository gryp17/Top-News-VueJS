<template>
	<FadeOnAppear>
		<div class="article-content">
			<h4 class="title">
				{{ article.title }}
			</h4>

			<img :src="articleImage" class="img-fluid image"/>

			<div class="info row">
				<div class="date col-sm-6">
					{{ articleDate }}
				</div>

				<div class="text-sm-right col-sm-6">
					written by
					<router-link
						:to="{name: 'user', params: {id: article.authorId}}"
					>
						<img :src="authorImage" class="author-avatar"/>
						{{ article.authorName }}
					</router-link>
				</div>

				<div class="col-12">
					<div class="badge badge-secondary views">
						<i class="far fa-eye"></i>
						<span>{{ article.views }} views</span>
					</div>
				</div>
			</div>

			<hr/>

			<div v-html="article.content" class="content"></div>

			<router-link
				:to="{name: 'search', params: {section: article.categoryName}}"
				class="btn btn-outline-dark btn-back"
			>
				<i class="fas fa-chevron-left"></i>
				Back to {{ article.categoryName }}
			</router-link>

			<div class="clearfix"></div>
		</div>
	</FadeOnAppear>
</template>

<script>
	import { mapGetters } from 'vuex';
	import moment from 'moment';

	import FadeOnAppear from '@/components/transitions/FadeOnAppear.vue';

	export default {
		components: {
			FadeOnAppear
		},
		props: {
			article: Object
		},
		computed: {
			...mapGetters([
				'articlesDirectory',
				'avatarsDirectory'
			]),
			articleImage() {
				return `${this.articlesDirectory}${this.article.image}`;
			},
			articleDate() {
				return moment(this.article.date).format('dddd, MMMM D, YYYY');
			},
			authorImage() {
				return `${this.avatarsDirectory}${this.article.authorAvatar}`;
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-content {
		padding: 0px 15px;

		.title {
			margin: 30px 0px;
			font-weight: bold;
			text-align: center;
			color: $dark-blue;
		}

		.image {
			display: block;
			width: 100%;
			margin: auto;
		}

		.info {
			margin-top: 10px;

			.date {
				padding-top: 6px;
				font-weight: bold;
			}

			.author-avatar {
				margin: 0px 5px;
				width: 40px;
				border-radius: 100%;
			}

			.views {
				.fa-eye {
					font-size: 16px;
				}

				span {
					margin-left: 5px;
					vertical-align: middle;
				}
			}
		}

		.content{
			margin-top: 15px;
			text-align: justify;
		}

		.btn-back {
			float: right;

			.fa-chevron-left {
				margin-top: -2px;
			}
		}
	}
</style>
