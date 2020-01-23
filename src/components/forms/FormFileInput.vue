<template>
	<div class="form-file-input form-group">
			<label v-if="label">
				{{ label }}
			</label>

			<button
				@click="openFileBrowser()"
				type="button"
				:class="['btn btn-secondary browse-btn', {'is-invalid': error}]"
			>
				<i class="fas fa-file-upload"></i>
				Choose a file
			</button>

			<input
				:class="className"
				:name="name"
				v-on="$listeners"
				ref="file"
				type="file"
			/>

			<div class="form-error">
				{{ error }}
			</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			label: String,
			className: String,
			name: String,
			error: String
		},
		methods: {
			/**
			 * Opens the file input
			 */
			openFileBrowser() {
				$(this.$refs.file).click();
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-file-input {
		position: relative;

		.browse-btn{
			display: block;
			width: 100%;

			&.is-invalid {
				background-color: $red;
			}

			.fa-file-upload {
				margin-right: 6px;
			}
		}

		input {
			display: none;
		}

		.form-error{
			position: absolute;
			right: 0px;
			font-size: 10px;
			color: $red;
		}
	}
</style>
