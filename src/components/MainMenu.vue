<template>
	<div class="main-menu">
		<router-link
			@click.native="hideMainMenu()"
			to="/"
			class="home-link"
		>
			<img src="/img/logo.png" alt="Top-News"/>
		</router-link>

		<div ref="sections" class="sections">
			<router-link
				v-for="section in Object.values(sections)"
				@click.native="hideMainMenu()"
				:key="section"
				:to="{name: 'search', params: {section: section}}"
				:class="['option', section]"
			>
				<img :src="`/img/icons/sections/${section}.png`" :alt="section"/>
				{{ section }}
			</router-link>
		</div>

		<button @click="toggleMainMenu()" class="btn btn-light btn-hamburger">
			<i class="fas fa-bars"></i>
		</button>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import $ from 'jquery';

	const SLIDE_DURATION = 300;

	export default {
		name: 'MainMenu',
		computed: {
			...mapState([
				'sections',
				'mainMenuOpened'
			])
		},
		methods: {
			...mapActions([
				'toggleMainMenu',
				'hideMainMenu'
			])
		},
		watch: {
			mainMenuOpened(value) {
				if (value) {
					$(this.$refs.sections).slideDown(SLIDE_DURATION);
				} else {
					$(this.$refs.sections).slideUp(SLIDE_DURATION);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.main-menu{
		display: flex;
		background-color: #F8F8F8;

		.home-link{
			padding: 0px 20px;

			img{
				width: 100px;
			}
		}

		.sections {
			display: flex;
			flex: 1;

			.option {
				flex: 1;
				text-transform: capitalize;
				text-align: center;
				outline: none;
				font-size: 21px;
				color: #ffffff;
				user-select: none;

				@each $section, $color in $sections-colors {
					&.#{$section} {
						background-color: $color;
					}
				}

				&:hover, &:active, &:focus{
					color: #FFFFFF;
					text-decoration: none;
					filter: saturate(250%);
				}

				img{
					display: block;
					margin: auto;
					margin-top: 15px;
				}
			}
		}

		.btn-hamburger{
			position: absolute;
			display: none;
			top: 25px;
			right: 25px;
			padding: 3px 15px 5px 15px;
			outline: none;
			font-size: 28px;
			background-color: #ffffff;
			border-color: #d3d9df;

			&:hover, &:active, &:focus{
				background-color: #efefef;
			}
		}

		@media (min-width: $layout-width){
			.sections {
				display: flex !important;
			}
		}

		@media (max-width: $layout-width){
			display: block;
			text-align: center;

			.home-link {
				display: inline-block;
				padding: 10px 20px;

				img {
					width: 80px;
				}
			}

			.sections {
				display: none;
				flex-direction: column;

				.option {
					display: flex;
					align-items: center;
					padding: 5px;

					img {
						margin: 0 10px 0 0;
					}
				}
			}

			.btn-hamburger {
				display: block;
			}
		}

		@include media-breakpoint-down(xs) {
			text-align: left;
		}
	}
</style>
