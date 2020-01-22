<template>
	<div class="forbidden">
		<h4>
			You don't have the necessary permissions to access this page.
		</h4>

		<i class="fas fa-exclamation-triangle"></i>

		Go back to the <router-link to="/">home page</router-link>
	</div>
</template>

<style scoped lang="scss">
	.forbidden {
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
