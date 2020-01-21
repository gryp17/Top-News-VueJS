<template>
	<div class="article-card-placeholder">
		<div class="image-wrapper"></div>
		<div class="content-wrapper">
			<div class="title"></div>

			<div class="summary"></div>
			<div class="summary"></div>
			<div class="summary"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.article-card-placeholder {
		flex-basis: calc(50% - 5px);
		margin: 5px 0px;
		box-shadow: 3px 3px 7px 0px $medium-gray;

		.image-wrapper {
			position: relative;
			height: 160px;
			background-color: $smooth-gray;

			&::after {
				position: absolute;
				top: 30px;
				left: 0;
				right: 0;
				margin: 0;
				text-align: center;
				font-family: "Font Awesome 5 Free";
				font-size: 60px;
				font-weight: 900;
				content: "\f03e";
				color: #ffffff;
			}
		}

		.content-wrapper {
			padding: 10px;
			min-height: 230px;

			.title {
				margin-bottom: 25px;
				padding: 10px;
				border-radius: 10px;
				background-color: lighten($medium-gray, 25%);
			}

			.summary {
				margin-top: 10px;
				padding: 10px;
				border-radius: 10px;
				background-color: $smooth-gray;
			}
		}
	}
</style>
