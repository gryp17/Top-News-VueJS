<template>
	<div class="articles-slider" ref="wrapper">
		<div class="slider" ref="slider">
			<button
				v-if="renderArrows"
				@click="slideLeft"
				class="btn-arrow left"
			>
				<i class="fas fa-chevron-left"></i>
			</button>

			<div v-for="article in articles" :key="article.id" class="slide">
				<router-link
					:to="{name: 'article', params: {id: article.id}}"
					:title="article.title"
				>
					<img class="img-fluid image" :src="`${articlesDirectory}${article.image}`"/>
					<div class="title">
						{{ article.title }}
					</div>
				</router-link>
			</div>

			<button
				v-if="renderArrows"
				@click="slideRight"
				class="btn-arrow right"
			>
				<i class="fas fa-chevron-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import { mapGetters } from 'vuex';

	export default {
		props: {
			articles: {
				type: Array
			},
			breakpoint: {
				type: Number,
				default: 600
			}
		},
		data() {
			return {
				visibleSlides: 3,
				sliderMargin: 0
			};
		},
		computed: {
			...mapGetters([
				'articlesDirectory'
			]),
			renderArrows() {
				return this.articles.length > this.visibleSlides;
			}
		},
		mounted() {
			$(window).on('resize', this.setSliderWidth);
			$(this.$refs.wrapper).on('mousewheel DOMMouseScroll', this.handleWheelScroll);
			this.setSliderWidth();
		},
		updated() {
			this.setSliderWidth();
		},
		destroyed() {
			$(window).off('resize', this.setSliderWidth);
			$(this.$refs.wrapper).off('mousewheel DOMMouseScroll', this.handleWheelScroll);
		},
		methods: {
			/**
			 * Returns the most needed component dimmensions (wrapper, slider and slide width)
			 */
			getDimensions() {
				if ($(window).width() < this.breakpoint) {
					this.visibleSlides = 1;
				} else {
					this.visibleSlides = 3;
				}

				return {
					wrapperWidth: $(this.$refs.wrapper).width(),
					sliderWidth: $(this.$refs.slider).width(),
					slideWidth: $(this.$refs.wrapper).width() / this.visibleSlides
				};
			},
			/**
			 * Sets the slider width based on the articles count.
			 * Also resets the slider position in order to avoid weird behaviour.
			 */
			setSliderWidth() {
				const dimensions = this.getDimensions();

				$(this.$refs.slider).width(this.articles.length * dimensions.slideWidth);

				//reset the slider position
				this.slide(0);
			},
			/**
			 * Makes the slider slide to the given margin
			 * @param {Number} margin
			 */
			slide(margin) {
				this.sliderMargin = margin;

				$(this.$refs.slider).stop().animate({
					marginLeft: this.sliderMargin
				}, 500);
			},
			/**
			 * Makes the slider slide left
			 */
			slideLeft() {
				const dimensions = this.getDimensions();
				const maxMargin = 0;

				const newMargin = this.sliderMargin + dimensions.slideWidth;

				if (newMargin > maxMargin) {
					return;
				}

				this.slide(newMargin);
			},
			/**
			 * Makes the slider slide right
			 */
			slideRight() {
				const dimensions = this.getDimensions();
				const minMargin = (dimensions.sliderWidth - dimensions.wrapperWidth + 10) * -1;

				const newMargin = this.sliderMargin - dimensions.slideWidth;

				if (newMargin < minMargin) {
					return;
				}

				this.slide(newMargin);
			},
			/**
			 * Listens for the mouse wheel event and slides the slider left or right
			 * @param {Object} e
			 */
			handleWheelScroll(e) {
				e.preventDefault();

				if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
					this.slideLeft();
				} else {
					this.slideRight();
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.articles-slider {
		position: relative;
		overflow: hidden;

		.btn-arrow{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			padding: 3px 17px;
			background-color: $smooth-gray;
			border: solid 4px $dark-gray;
			color: $dark-gray;
			border-radius: 100%;
			z-index: 1;
			opacity: 0;
			transition: all 300ms;
			font-size: 29px;
			text-align: center;
			cursor: pointer;

			&.left{
				left: 15px;

				.svg-inline--fa {
					margin-left: -2px;
				}
			}

			&.right{
				right: 15px;

				.svg-inline--fa {
					margin-right: -2px;
				}
			}
		}

		.slider {
			display: flex;
			min-height: 185px;

			.slide{
				flex: 1;
				padding: 10px;

				.title{
					margin-top: 5px;
					text-overflow: ellipsis;
					overflow: hidden;
					max-height: 75px;
				}
			}
		}

		&:hover {
			.btn-arrow {
				opacity: 0.7;

				&:hover{
					opacity: 1;
				}
			}
		}
	}
</style>
