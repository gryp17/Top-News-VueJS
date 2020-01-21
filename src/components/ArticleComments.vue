<template>
	<div class="article-comments">

		<div v-if="totalItems === 0">
			<div class="no-comments">
				There are no comments yet.
			</div>
		</div>
		<div v-else>
			<ArticleComment
				v-for="comment in items"
				:key="comment.id"
				:comment="comment"
			/>

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
	.article-comments {
		.no-comments {
			margin: 30px 0px;
			text-align: center;
			font-weight: bold;
		}
	}
</style>
