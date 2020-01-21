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
				@deleteArticle="showConfirmationDialog"
			/>

			<Pagination
				:totalPages="totalPages"
				:currentPage="currentPage"
				@changePage="goToPage"
			/>
		</div>

		<ConfirmationDialog
			:visible="confirmationDialogVisible"
			@decline="hideConfirmationDialog"
			@confirm="deleteArticle"
		>
			Are you sure you want to delete this article?
			<br/>
			<strong>This action is irreversible.</strong>
		</ConfirmationDialog>

	</div>
</template>

<script>
	import UserArticle from '@/components/UserArticle.vue';
	import Pagination from '@/components/Pagination.vue';
	import ConfirmationDialog from '@/components/modals/ConfirmationDialog.vue';

	export default {
		components: {
			UserArticle,
			Pagination,
			ConfirmationDialog
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
		data() {
			return {
				confirmationDialogVisible: false,
				confirmedArticleId: null
			};
		},
		methods: {
			/**
			 * Shows the confirmation dialog and sets the confirmed article id
			 * @param {Number} articleId
			 */
			showConfirmationDialog(articleId) {
				this.confirmedArticleId = articleId;
				this.confirmationDialogVisible = true;
			},
			/**
			 * Hides the confirmation dialog
			 */
			hideConfirmationDialog() {
				this.confirmationDialogVisible = false;
			},
			/**
			 * Emits the "deleteArticle" event with the confirmed article id
			 */
			deleteArticle() {
				this.$emit('deleteArticle', this.confirmedArticleId);
				this.hideConfirmationDialog();
			},
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
