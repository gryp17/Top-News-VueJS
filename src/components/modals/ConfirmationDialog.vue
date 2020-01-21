<template>
	<div class="confirmation-dialog">
		<BaseModal :visible="visible" @hidden="decline">
			<template v-slot:header>
				<h5 class="modal-title">Confirm</h5>
			</template>
			<template v-slot:body>
				<slot>Are you sure?</slot>
			</template>
			<template v-slot:footer>
				<div class="modal-footer">
					<button @click="decline" class="btn btn-secondary">
						Cancel
					</button>
					<button @click="confirm" class="btn btn-danger">
						Confirm
					</button>
				</div>
			</template>
		</BaseModal>
	</div>
</template>

<script>
	import BaseModal from '@/components/modals/BaseModal.vue';

	export default {
		components: {
			BaseModal
		},
		props: {
			visible: Boolean
		},
		methods: {
			/**
			 * Sends the confirm event
			 */
			confirm() {
				this.$emit('confirm');
			},
			/**
			 * Sends the decline event
			 */
			decline() {
				this.$emit('decline');
			}
		}
	};
</script>
