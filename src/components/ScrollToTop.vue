<template>
	<FadeOnAppear>
		<button v-if="visible" @click="scrollToTop" class="scroll-to-top">
			<i class="fas fa-angle-up"></i>
		</button>
	</FadeOnAppear>
</template>

<script>
	import $ from 'jquery';

	import FadeOnAppear from '@/components/transitions/FadeOnAppear.vue';

	export default {
		components: {
			FadeOnAppear
		},
		data() {
			return {
				visible: false
			};
		},
		created() {
			$(window).on('scroll', this.onWindowScroll);
		},
		destroyed() {
			$(window).off('scroll', this.onWindowScroll);
		},
		methods: {
			/**
			 * Toggles the visible property depending on the scroll position
			 */
			onWindowScroll() {
				const scrollTop = $(window).scrollTop();
				const visibleViewport = $(window).height();
				this.visible = scrollTop > visibleViewport;
			},
			/**
			 * Scrolls the window back to the top
			 */
			scrollToTop() {
				$('html, body').animate({
					scrollTop: 0
				}, 1000);
			}
		}
	};
</script>

<style scoped lang="scss">
	.scroll-to-top {
		position: fixed;
		right: 15px;
		bottom: 15px;
		background-color: lighten($dirty-blue, 10%);
		color: #ffffff;
		border: none;
		font-size: 39px;
		padding: 0px 18px;
		border-radius: 5px;
		box-shadow: 2px 2px 9px $medium-gray;

		&:focus {
			outline: none;
		}

		&:hover {
			background-color: $dirty-blue;
		}

		.fa-angle-up {
			margin-top: -4px;
		}
	}
</style>
