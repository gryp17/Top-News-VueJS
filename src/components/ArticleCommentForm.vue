<template>
	<div class="article-comment-form">
		<div v-if="!userSession" class="not-logged-in">
			<span>
				<i class="fas fa-exclamation-triangle"></i>
			</span>
			<p>
				You need to be <button @click="showLoginModal" class="btn btn-link">logged in</button> before you can comment on this article.
			</p>
		</div>
		<div v-else class="add-comment-wrapper">
			<div class="textarea-wrapper">
				<FormInput
					v-model="commentText"
					:error="errors.content"
					@focus="clearError"
					tag="textarea"
					name="content"
					placeholder="Leave your comment"
				></FormInput>
			</div>
			<div>
				<button
					@click="addComment"
					class="btn btn-primary-light btn-add-comment"
				>
					Submit
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import ArticleCommentService from '@/services/article-comment';

	export default {
		props: {
			articleId: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				commentText: '',
				formName: 'articleComment'
			};
		},
		computed: {
			...mapState('user', [
				'userSession'
			]),
			...mapState('form', {
				errors: state => state.errors.articleComment
			})
		},
		methods: {
			...mapActions('modals', [
				'showLoginModal'
			]),
			...mapActions('form', [
				'setFormErrors',
				'clearFormError'
			]),
			/**
			 * Adds new article comment
			 */
			addComment() {
				ArticleCommentService.addComment(this.articleId, this.commentText).then((res) => {
					if (res.data.errors) {
						this.setFormErrors({
							form: this.formName,
							errors: res.data.errors
						});
					} else {
						this.commentText = '';
						this.$emit('commentAdded');
					}
				});
			},
			/**
			 * Clears the form errors related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: this.formName,
					field
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-comment-form {
		.not-logged-in {
			text-align: center;

			.fa-exclamation-triangle {
				color: $medium-gray;
				font-size: 50px;
			}

			p {
				margin-top: 15px;
				font-weight: bold;

				.btn-link {
					padding: 0;
					line-height: 22px;
					vertical-align: top;
					font-weight: bold;
				}
			}
		}

		.add-comment-wrapper {
			display: flex;

			.textarea-wrapper {
				flex: 1;
			}

			.btn-add-comment {
				margin-left: 10px;
			}
		}

		@include media-breakpoint-down(xs) {
			.add-comment-wrapper {
				flex-direction: column;

				.btn-add-comment {
					margin: 0;
					float: right;
				}
			}
		}
	}
</style>
