<template>
	<div class="user-articles">

		<div v-if="totalItems === 0">
			<div class="no-articles">
				There are no user articles.
			</div>
		</div>
		<div v-else>

			<UserArticle
				v-for="article in items"
				:key="article.id"
				:article="article"
				:canEdit="canEdit"
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
	import UserArticle from '@/components/UserArticle.vue';
	import Pagination from '@/components/Pagination.vue';

	export default {
		components: {
			UserArticle,
			Pagination
		},
		props: {
			canEdit: Boolean,
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
			 * Sets the current page and loads the corresponding articles
			 * @param {Number} page
			 */
			goToPage(page) {
				this.$emit('getItemsForPage', page);
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-articles {
		margin-top: 15px;

		.no-articles {
			margin: 30px 0px;
			text-align: center;
			font-weight: bold;
		}
	}
</style>
