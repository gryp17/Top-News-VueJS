<template>
	<div class="article-content-placeholder">
		<div class="title">
			<div class="line"></div>
			<div class="line"></div>
		</div>

		<div class="image"></div>

		<div class="info">
			<div class="line"></div>
			<div class="line"></div>
		</div>

		<hr/>

		<div class="content">
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.article-content-placeholder {
		padding: 0px 15px;

		.title {
			margin: 30px 0px;

			.line {
				margin-top: 6px;
				padding: 10px;
				border-radius: 10px;
				background-color: lighten($medium-gray, 25%);

				&:last-child {
					width: 70%;
					margin-left: auto;
					margin-right: auto;
				}
			}
		}

		.image {
			position: relative;
			margin: auto;
			width: 100%;
			height: 350px;
			background-color: $smooth-gray;

			&::after {
				position: absolute;
				top: 60px;
				left: 0;
				right: 0;
				margin: 0;
				text-align: center;
				font-family: "Font Awesome 5 Free";
				font-size: 160px;
				font-weight: 900;
				content: "\f03e";
				color: #ffffff;
			}
		}

		.info {
			margin-top: 10px;

			.line {
				margin-top: 6px;
				padding: 10px;
				border-radius: 10px;
				background-color: lighten($medium-gray, 25%);
			}
		}

		.content {
			margin-top: 15px;

			.line {
				margin-top: 15px;
				padding: 10px;
				border-radius: 10px;
				background-color: $smooth-gray;

				&:nth-child(5), &:nth-child(6) {
					width: 80%;
				}
			}
		}
	}
</style>
