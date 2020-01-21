<template>
	<div class="user-activity">

		<div v-if="totalItems === 0">
			<div class="no-activity">
				There is no user activity.
			</div>
		</div>
		<div v-else>

			<div v-for="comment in items" :key="comment.id" class="activity-item">
				Commented on
				<router-link
					:to="{name: 'article', params: {id: comment.articleId}}"
					:title="comment.articleTitle"
				>
					{{ comment.articleTitle }}
				</router-link>
				<ArticleComment :comment="comment"/>
			</div>

			<Pagination
				:totalPages="totalPages"
				:currentPage="currentPage"
				@changePage="goToPage"
			/>
		</div>

	</div>
</template>

<script>
	import ArticleComment from '@/components/ArticleComment.vue';
	import Pagination from '@/components/Pagination.vue';

	export default {
		components: {
			ArticleComment,
			Pagination
		},
		props: {
			items: Array,
			currentPage: {
				type: Number,
				default: 0
			},
			totalItems: {
				type: Number,
				default: 0
			},
			totalPages: {
				type: Number,
				default: 0
			}
		},
		methods: {
			/**
			 * Sets the current page and loads the corresponding comments
			 * @param {Number} page
			 */
			goToPage(page) {
				this.$emit('getItemsForPage', page);
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-activity {
		margin-top: 15px;

		.no-activity {
			margin: 30px 0px;
			text-align: center;
			font-weight: bold;
		}

		.activity-item {
			padding: 10px;
			background-color: lighten($smooth-gray, 5%);

			+ .activity-item {
				margin-top: 10px;
			}
		}
	}
</style>
