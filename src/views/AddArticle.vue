<template>
	<div class="add-article-page">
		<h4>Add Article</h4>
		<hr />

		<ArticleForm />
	</div>
</template>

<script>
	import ArticleForm from '@/components/ArticleForm.vue';

	export default {
		components: {
			ArticleForm
		}
	};
</script>

<style scoped lang="scss">
	.add-article-page {
		padding-top: 20px;
	}
</style>
