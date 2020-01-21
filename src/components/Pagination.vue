<template>
	<div class="pagination">
		<button
			:disabled="currentPage === 0"
			@click="$emit('changePage', 0)"
			class="btn btn-secondary btn-arrow"
			title="First Page"
		>
			<i class="fas fa-angle-double-left"></i>
		</button>

		<button
			:disabled="currentPage === 0"
			@click="$emit('changePage', currentPage - 1)"
			class="btn btn-secondary btn-arrow"
			title="Previous Page"
		>
			<i class="fas fa-angle-left"></i>
		</button>

		<button
			v-for="page in pages"
			:key="page"
			:class="['btn btn-secondary', {active: currentPage === page}]"
			@click="$emit('changePage', page)"
		>
			{{ page + 1 }}
		</button>

		<button
			:disabled="currentPage === totalPages - 1"
			@click="$emit('changePage', currentPage + 1)"
			class="btn btn-secondary btn-arrow"
			title="Next Page"
		>
			<i class="fas fa-angle-right"></i>
		</button>

		<button
			:disabled="currentPage === totalPages - 1"
			@click="$emit('changePage', totalPages - 1)"
			class="btn btn-secondary btn-arrow"
			title="Last Page"
		>
			<i class="fas fa-angle-double-right"></i>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			totalPages: Number,
			currentPage: Number
		},
		data() {
			return {
				pages: []
			};
		},
		created() {
			this.calculatePages();
		},
		watch: {
			$props: {
				handler() {
					this.calculatePages();
				},
				deep: true
			}
		},
		methods: {
			/**
			 * Calculates the page buttons that need to be displayed based on the currentPage and totalPages
			 */
			calculatePages() {
				this.pages = [];
				let start = 0;
				let end = 0;

				if (this.currentPage === 0) {
					start = this.currentPage;
					end = Math.min(this.currentPage + 2, this.totalPages - 1);
				} else if (this.currentPage === this.totalPages - 1) {
					start = Math.max(this.currentPage - 2, 0);
					end = this.currentPage;
				} else {
					start = this.currentPage - 1;
					end = this.currentPage + 1;
				}

				for (let i = start; i <= end; i++) {
					this.pages.push(i);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.pagination {
		justify-content: center;
		margin: 15px 0px;

		button {
			margin: 0px 1px;
			font-size: 15px;
			border-radius: 5px;

			&.btn-arrow {
				font-size: 18px;
				padding: 0px 12px;
			}
		}
	}
</style>
