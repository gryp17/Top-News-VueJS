<template>
	<div class="form-dropdown">
		<div class="form-group">
			<label>
				{{ label }}
			</label>
			<select
				:value="value"
				:class="['form-control', className, {'is-invalid': error}]"
				:name="name"
				v-on="{
					...$listeners,
					input: onInput
				}"
			>
				<option v-for="(option, id) in options" :key="id" :value="id">
					{{ option | capitalize }}
				</option>
			</select>

			<div class="form-error">
				{{ error }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			options: Object,
			value: {
				required: true
			},
			className: String,
			name: String,
			label: String,
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
	.form-dropdown{
		position: relative;

		.form-control {
			&.is-invalid {
				background-image: none;
			}
		}

		.form-error{
			position: absolute;
			right: 0px;
			font-size: 10px;
			color: $red;
		}
	}
</style>
