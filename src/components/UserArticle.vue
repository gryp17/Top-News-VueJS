<template>
	<div class="user-article">
		<div class="image-wrapper">
			<router-link :to="{name: 'article', params: {id: article.id}}" :title="article.title">
				<div
					:style="{'background-image': articleImage}"
					class="image"
				>
					<div class="section-bar">
						{{ article.categoryName }}
					</div>
				</div>
			</router-link>
		</div>
		<div class="content-wrapper">
			<div class="header">

				<div class="date" :title="articleDateLong">
					{{ articleDate }}
				</div>

				<ActionsDropdown v-if="canEdit">
					<a
						class="dropdown-item"
						href="#"
					>
						Edit
					</a>

					<button class="dropdown-item">
						Delete
					</button>
				</ActionsDropdown>

			</div>

			<div class="title">
				<router-link :to="{name: 'article', params: {id: article.id}}" :title="article.title">
					{{ article.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	import ActionsDropdown from '@/components/ActionsDropdown.vue';

	export default {
		components: {
			ActionsDropdown
		},
		props: {
			article: Object,
			canEdit: Boolean
		},
		computed: {
			articleImage() {
				return `url(/cdn/uploads/articles/${this.article.image})`;
			},
			articleDate() {
				return moment(this.article.date).format('MMMM Do YYYY, HH:mm:ss');
			},
			articleDateLong() {
				return moment(this.article.date).format('YYYY-MM-DD HH:mm:ss');
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-article {
		display: flex;
		margin: 5px 0px;
		box-shadow: 3px 3px 7px 0px $medium-gray;

		.image-wrapper {
			flex: 1;

			.image {
				height: 100px;
				background-size: cover;

				.section-bar {
					padding: 2px 10px;
					background-color: rgba(0,0,0,0.2);
					color: #ffffff;
					font-weight: bold;
					font-size: 15px;
					text-transform: capitalize;
				}
			}
		}

		.content-wrapper {
			flex: 2;
			padding: 5px;

			.header {
				display: flex;
				justify-content: space-between;

				.date {
					font-size: 15px;
				}

				.actions-dropdown {
					margin-top: -8px;
				}
			}

			.title {
				margin-top: 3px;
				height: 48px;
				overflow: hidden;
				font-weight: bold;
			}
		}
	}
</style>
