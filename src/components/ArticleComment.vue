<template>
	<div class="article-comment">
		<div class="header">
			<router-link :to="{name: 'user', params: {id: comment.authorId}}">
				<img :src="authorImage"/>
				<div class="author">
					{{ comment.username }}
				</div>
			</router-link>
			<div :title="commentDateDetailed" class="date">
				{{ commentDate }}
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="content">
			{{ comment.content }}
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			comment: Object
		},
		computed: {
			...mapGetters([
				'avatarsDirectory'
			]),
			commentDate() {
				return moment(this.comment.date).fromNow();
			},
			commentDateDetailed() {
				return moment(this.comment.date).format('YYYY-MM-DD HH:mm:ss');
			},
			authorImage() {
				return `${this.avatarsDirectory}${this.comment.avatar}`;
			}
		}
	};
</script>

<style scoped lang="scss">
	.article-comment {
		margin-top: 10px;
		background-color: #ffffff;
		padding: 15px;
		border-radius: 5px;
		box-shadow: 0px 0px 6px 0px $smooth-gray;

		.header{
			img{
				float: left;
				width: 30px;
				border-radius: 100%;
			}

			.author{
				float: left;
				margin-top: 2px;
				margin-left: 10px;
			}

			.date{
				float: right;
				font-size: 15px;
				color: $medium-gray;
			}
		}

		.content{
			margin-top: 18px;
			font-size: 15px;
		}
	}
</style>
