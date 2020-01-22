<template>
	<div class="content-editor">
		<label v-if="label">
			{{ label }}
		</label>

		<div :class="['inner-wrapper', className, {'is-invalid': error}]">

			<div class="toolbar-container">

				<span class="ql-formats">
					<!-- those values need to be "whitelisted" in the javascript code first... -->
					<select class="ql-size">
						<option value="11px">Small</option>
						<option value="16px" selected>Medium</option>
						<option value="24px">Large</option>
						<option value="34px">Huge</option>
					</select>
				</span>

				<span class="ql-formats">
					<select class="ql-color">
						<option value="rgb(0, 0, 0)" />
						<option value="rgb(230, 0, 0)" />
						<option value="rgb(255, 153, 0)" />
						<option value="rgb(255, 255, 0)" />
						<option value="rgb(0, 138, 0)" />
						<option value="rgb(0, 102, 204)" />
						<option value="rgb(153, 51, 255)" />
						<option value="rgb(255, 255, 255)" />
						<option value="rgb(250, 204, 204)" />
						<option value="rgb(255, 235, 204)" />
						<option value="rgb(204, 224, 245)" />
						<option value="rgb(235, 214, 255)" />
						<option value="rgb(187, 187, 187)" />
						<option value="rgb(102, 185, 102)" />
					</select>

					<select class="ql-background">
						<option value="rgb(0, 0, 0)" />
						<option value="rgb(230, 0, 0)" />
						<option value="rgb(255, 153, 0)" />
						<option value="rgb(255, 255, 0)" />
						<option value="rgb(0, 138, 0)" />
						<option value="rgb(0, 102, 204)" />
						<option value="rgb(153, 51, 255)" />
						<option value="rgb(255, 255, 255)" />
						<option value="rgb(250, 204, 204)" />
						<option value="rgb(255, 235, 204)" />
						<option value="rgb(204, 224, 245)" />
						<option value="rgb(235, 214, 255)" />
						<option value="rgb(187, 187, 187)" />
						<option value="rgb(102, 185, 102)" />
					</select>
				</span>

				<span class="ql-formats">
					<button class="ql-bold" type="button"></button>
					<button class="ql-italic" type="button"></button>
					<button class="ql-underline" type="button"></button>
					<button class="ql-strike" type="button"></button>
				</span>

				<span class="ql-formats">
					<button class="ql-header" value="1" type="button"></button>
					<button class="ql-header" value="2" type="button"></button>

					<button class="ql-blockquote" type="button"></button>
				</span>

				<span class="ql-formats">
					<button class="ql-list" value="ordered" type="button"></button>
					<button class="ql-list" value="bullet" type="button"></button>

					<button class="ql-indent" value="-1" type="button"></button>
					<button class="ql-indent" value="+1" type="button"></button>
				</span>

				<span class="ql-formats">
					<select class="ql-align">
						<option></option>
						<option value="center"></option>
						<option value="right"></option>
						<option value="justify"></option>
					</select>
				</span>

				<span class="ql-formats">
					<button class="ql-link" type="button"></button>
					<button class="ql-video" type="button"></button>
				</span>

				<span class="ql-formats">
					<button class="ql-clean" type="button"></button>
				</span>
			</div>

			<div ref="editor" class="editor-container"></div>

			<div class="form-error">
				{{ error }}
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Quill from 'quill';

	export default {
		props: {
			value: String,
			className: String,
			name: String,
			label: String,
			error: String
		},
		data() {
			return {
				options: {
					modules: {
						toolbar: '.toolbar-container'
					},
					placeholder: 'Content',
					readOnly: false,
					theme: 'snow'
				},
				editor: null
			};
		},
		created() {
			//need to manually whitelist the font sizes
			const fontSizeStyle = Quill.import('attributors/style/size');
			fontSizeStyle.whitelist = ['11px', '16px', '24px', '34px'];
			Quill.register(fontSizeStyle, true);

			//use align css instead of classes
			const alignStyle = Quill.import('attributors/style/align');
			Quill.register(alignStyle, true);

			//use font style css instead of classes
			const fontStyle = Quill.import('attributors/style/font');
			Quill.register(fontStyle, true);
		},
		mounted() {
			//initialize the quill editor and set it's HTML content if there is any
			this.editor = new Quill($(this.$refs.editor)[0], this.options);

			const qlEditor = $(this.$refs.editor).find('.ql-editor');
			qlEditor.html(this.value);

			//on text change call the onUpdate function to pass the updated content back to the parent component
			this.editor.on('text-change', (delta, oldDelta, source) => {
				const value = qlEditor.html();
				this.$emit('input', value);
			});

			//on focus call the focus function (create a fake event with the correct structure so it can be handled by the clearErrors function correctly)
			qlEditor.on('focus', () => {
				const fakeEvent = {
					target: {
						name: this.name
					}
				};
				this.$emit('focus', fakeEvent);
			});
		}
	};
</script>

<style lang="scss">
	.content-editor {
		.inner-wrapper {
			position: relative;
			margin-bottom: 16px;

			&.is-invalid {
				.toolbar-container{
					border-bottom-color: $red;
				}

				.ql-container{
					border-color: $red;
				}
			}

			.toolbar-container{
				background-color: #ffffff;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;

				.ql-picker{
					height: auto;
				}
			}

			.ql-container{
				background-color: #ffffff;
				font-size: 16px;
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;

				.ql-editor{
					min-height: 300px;

					&.ql-blank{

						&::before{
							font-size: 17px;
							font-style: normal;
							color: #6c757d;
						}

					}
				}
			}

			.form-error {
				position: absolute;
				right: 0px;
				font-size: 10px;
				color: $red;
			}
		}
	}
</style>
