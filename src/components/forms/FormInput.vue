<template>
	<div class="form-input form-group">
		<label v-if="label">
			{{ label }}
		</label>

		<div class="input-group">
			<slot name="input-group-prepend"></slot>

			<!--
				v-on automatically propagates all events up to the parent
				so the @focus and @keyup events can be set there.
				It doesn't work together with v-model that's why the @input event and :value prop need to be set manually
			-->
			<input
				v-if="tag === 'input'"
				:value="value"
				:class="['form-control', className, {'is-invalid': error}]"
				:type="type"
				:name="name"
				:placeholder="placeholder"
				v-on="{
					...$listeners,
					input: onInput
				}"
			/>
			<textarea
				v-if="tag === 'textarea'"
				:value="value"
				:class="['form-control', className, {'is-invalid': error}]"
				:name="name"
				:placeholder="placeholder"
				:rows="rows"
				v-on="{
					...$listeners,
					input: onInput
				}"
			/>

			<slot name="input-group-append"></slot>
		</div>

		<div class="form-error">
			{{ error }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			label: String,
			tag: {
				type: String,
				default: 'input',
				validator(value) {
					return ['input', 'textarea'].includes(value);
				}
			},
			value: String,
			className: String,
			type: String,
			placeholder: String,
			name: String,
			rows: {
				default: 2
			},
			error: String
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(e) {
				this.$emit('input', e.target.value);
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-input{
		position: relative;

		.form-error{
			position: absolute;
			right: 0px;
			font-size: 10px;
			color: $red;
		}
	}
</style>
