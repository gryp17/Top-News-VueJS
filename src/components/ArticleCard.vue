<template>
	<FadeOnAppear>
		<div class="article-card">
			<router-link :to="{name: 'article', params: {id: article.id}}" :title="article.title">
				<div
					:style="{'background-image': articleImage}"
					class="image-wrapper"
				>
					<div class="section-bar">
						{{ article.categoryName }}

						<div class="date" :title="articleDateLong">
							{{ articleDate }}
						</div>
					</div>

				</div>
			</router-link>

			<div class="content-wrapper">
				<div class="title">
					<router-link :to="{name: 'article', params: {id: article.id}}" :title="article.title">
						{{ article.title | limitTo(150) }}
					</router-link>
				</div>

				<div :title="article.summary" class="summary">
					{{ article.summary | limitTo(150) }}
				</div>

				<router-link :to="{name: 'article', params: {id: article.id}}" class="btn btn-primary-light">
					Read more
				</router-link>
			</div>
		</div>
	</FadeOnAppear>
</template>

<script>
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
			articleImage() {
				return `url(/cdn/uploads/articles/${this.article.image})`;
			},
			articleDate() {
				return moment(this.article.date).format('YYYY-MM-DD');
			},
			articleDateLong() {
				return moment(this.article.date).format('YYYY-MM-DD HH:mm:ss');
			}
		}
	};
</script>

<style scoped lang="scss">

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.article-card {
		flex-basis: calc(50% - 5px);
		margin: 5px 0px;
		box-shadow: 3px 3px 7px 0px $medium-gray;

		.image-wrapper {
			height: 160px;
			background-size: cover;

			.section-bar {
				padding: 2px 10px;
				background-color: rgba(0,0,0,0.2);
				color: #ffffff;
				font-weight: bold;
				font-size: 15px;
				text-transform: capitalize;

				.date {
					float: right;
				}
			}
		}

		.content-wrapper {
			$padding: 10px;
			position: relative;
			min-height: 230px;
			padding: $padding $padding 60px $padding;

			.title {
				font-size: 17px;
				font-weight: bold;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 25px;
				max-height: 50px; //2 lines of text
			}

			.summary{
				margin-top: 10px;
				text-align: justify;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 20px;
				max-height: 100px; //5 lines of text
			}

			.btn {
				position: absolute;
				bottom: $padding;
				right: $padding;
			}
		}
	}
</style>
