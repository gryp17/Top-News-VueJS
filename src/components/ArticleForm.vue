<template>
	<div class="article-form">

		<FormDropdown
			:options="sections"
			v-model="categoryId"
			:error="errors.categoryId"
			@focus="clearError"
			label="Section"
			name="categoryId"
		/>

		<div class="form-group">
			<label>
				Image
			</label>

			<img
				:src="imagePreview"
				@click="openFileBrowser()"
				class="image-preview"
			/>

			<FormFileInput
				:error="errors.image"
				@click="clearError"
				@change="imageChanged"
				ref="image"
				name="image"
			/>
		</div>

		<FormInput
			v-model="title"
			:error="errors.title"
			@focus="clearError"
			tag="textarea"
			label="Title"
			name="title"
			placeholder="Title"
		/>

		<FormInput
			v-model="summary"
			:error="errors.summary"
			@focus="clearError"
			tag="textarea"
			rows="4"
			label="Summary"
			name="summary"
			placeholder="Summary"
		/>

		<ContentEditor
			v-model="content"
			:error="errors.content"
			@focus="clearError"
			label="Content"
			name="content"
		/>

		<button @click="save" class="btn btn-primary-light btn-save">
			Save
		</button>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';

	export default {
		props: {
			article: Object
		},
		data() {
			return {
				categoryId: 1,
				image: null,
				imagePreview: '/img/placeholder.png',
				title: '',
				summary: '',
				content: '',
				formName: 'article'
			};
		},
		created() {
			this.updateArticleData();
		},
		computed: {
			...mapGetters([
				'articlesDirectory'
			]),
			...mapState([
				'sections'
			]),
			...mapState('form', {
				errors: state => state.errors.article
			}),
			articleImage() {
				if (!this.article) {
					return null;
				}

				return `${this.articlesDirectory}${this.article.image}`;
			}
		},
		watch: {
			/**
			 * Watches the article value and updates the article data fields
			 */
			article() {
				this.updateArticleData();
			}
		},
		methods: {
			...mapActions('form', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('articles', [
				'addArticle',
				'updateArticle'
			]),
			/**
			 * Updates the component data with the passed article data
			 */
			updateArticleData() {
				if (this.article) {
					this.categoryId = this.article.categoryId;
					this.imagePreview = this.articleImage;
					this.title = this.article.title;
					this.summary = this.article.summary;
					this.content = this.article.content;
				}
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
			},
			/**
			 * Calls the openFileBrowser() function that is inside the FormFileInput component
			 */
			openFileBrowser() {
				this.$refs.image.openFileBrowser();
			},
			/**
			 * Updates the image and image preview values whenever the selected file changes
			 * @param {Object} e
			 */
			imageChanged(e) {
				this.image = e.target.files[0];
				this.imagePreview = URL.createObjectURL(e.target.files[0]);
			},
			/**
			 * Creates/updates the article
			 */
			save() {
				const formData = new FormData();

				['categoryId', 'image', 'title', 'summary', 'content'].forEach((field) => {
					if (this[field]) {
						formData.append(field, this[field]);
					}
				});

				const action = this.article ? this.updateArticle({ id: this.article.id, data: formData }) : this.addArticle(formData);
				action.then((data) => {
					if (data.article) {
						this.$router.push({
							name: 'article',
							params: {
								id: data.article.id
							}
						});
					} else if (data.errors) {
						this.setFormErrors({
							form: this.formName,
							errors: data.errors
						});
					}
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-form {

		.image-preview {
			width: 100%;
			margin-bottom: 10px;
			cursor: pointer;
		}

		.btn-save {
			display: block;
			margin: 20px auto;
		}
	}
</style>
