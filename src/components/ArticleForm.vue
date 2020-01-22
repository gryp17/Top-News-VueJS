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

		<button class="btn btn-primary-light btn-save">
			Save
		</button>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		props: {},
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
		computed: {
			...mapState([
				'sections'
			]),
			...mapState('form', {
				errors: state => state.errors.article
			})
		},
		methods: {
			...mapActions('form', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
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
			 * Updates the image and mage preview values whenever the selected file changes
			 * @param {Object} e
			 */
			imageChanged(e) {
				this.image = e.target.files[0];
				this.imagePreview = URL.createObjectURL(e.target.files[0]);
			},
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
			margin: auto;
		}
	}
</style>
