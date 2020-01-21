<template>
	<div class="no-search-results">
		<h4>
			No results were found for this search.
		</h4>

		<i class="fas fa-exclamation-triangle"></i>

		Go back to the <router-link to="/">home page</router-link>
	</div>
</template>

<style scoped lang="scss">
	.no-search-results {
		padding: 20px;
		text-align: center;

		.fa-exclamation-triangle {
			display: block;
			margin: 30px auto;
			font-size: 125px;
			color: $medium-gray;
		}
	}
</style>
