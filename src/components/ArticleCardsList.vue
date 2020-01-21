<template>
	<div class="article-cards-list">
		<slot>
			<ArticleCardPlaceholder v-for="index in placeholders" :key="index" />
		</slot>
	</div>
</template>

<script>
	import ArticleCardPlaceholder from '@/components/ArticleCardPlaceholder.vue';

	export default {
		components: {
			ArticleCardPlaceholder
		},
		props: {
			placeholders: {
				type: Number,
				default: 6
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-cards-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@include media-breakpoint-down(xs) {
			flex-direction: column;
		}
	}
</style>
