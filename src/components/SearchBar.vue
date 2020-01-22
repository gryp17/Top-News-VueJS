<template>
	<div class="search-bar">
		<div class="input-group">
			<div class="input-wrapper">
				<input
					:value="searchTerm"
					:placeholder="inputPlaceholder"
					@input="handleInputChange($event)"
					@keyup.enter="search()"
					@keyup.arrow-up="highlightAutocompleteSuggestion(-1)"
					@keyup.arrow-down="highlightAutocompleteSuggestion(1)"
					class="form-control"
					type="text"
				/>

				<div v-show="autocompleteSuggestions.length > 0" class="autocomplete-results">
					<div
						v-for="(suggestion, index) in autocompleteSuggestions"
						:key="index"
						:class="['item', {selected: index === highlightedSuggestion}]"
						@click="selectAutocompleteSuggestion(suggestion)"
					>
						{{ suggestion }}
					</div>
				</div>
			</div>

			<div class="input-group-append">
				<button
					class="btn btn-outline-secondary dropdown-toggle"
					type="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					{{ selectedSection }}
				</button>
				<div class="dropdown-menu">
					<a v-for="section in sections" :key="section" @click="changeSection(section)" class="dropdown-item">
						{{ section }}
					</a>
				</div>
			</div>

			<div class="input-group-append">
				<button @click="search()" class="btn btn-primary-light btn-search">
					<!-- <img src="/img/icons/search-icon-white.png"/> -->
					<i class="fas fa-search"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Article from '@/services/article';

	let autocompleteTimeout;

	export default {
		name: 'SearchBar',
		data() {
			return {
				selectedSection: null,
				searchTerm: '',
				autocompleteSuggestions: [],
				highlightedSuggestion: -1
			};
		},
		created() {
			this.getSearchParamsFromURL(this.$route);
			$(window).click(this.hideAutocompleteSuggestions);
		},
		destroyed() {
			$(window).off('click', this.hideAutocompleteSuggestions);
		},
		computed: {
			/**
			 * Returns the sections list (also prepending the "all news" section)
			 * @returns {Array}
			 */
			sections() {
				return ['all news', ...Object.values(this.$store.state.sections)];
			},
			/**
			 * Builds the search input placeholder by using the selected section
			 * @returns {String}
			 */
			inputPlaceholder() {
				return `Search in ${this.selectedSection}`;
			}
		},
		methods: {
			/**
			 * Resets the search bar to it's default values
			 */
			resetSearch() {
				this.selectedSection = this.sections[0];
				this.searchTerm = '';
				this.autocompleteSuggestions = [];
				this.highlightedSuggestion = -1;
			},
			/**
			 * Sets the selected section
			 * @param {String} section
			 */
			changeSection(section) {
				this.selectedSection = section;
			},
			/**
			 * Called when the input text changes
			 * @param {Object} e
			 */
			handleInputChange(e) {
				this.searchTerm = e.target.value;
				this.autocomplete();
			},
			/**
			 * Shows/updates the autocomplete suggestions based on the user search
			 */
			autocomplete() {
				clearTimeout(autocompleteTimeout);

				if (!this.searchTerm || this.searchTerm.length < 3) {
					this.autocompleteSuggestions = [];
					return;
				}

				autocompleteTimeout = setTimeout(() => {
					Article.getAutocompleteSuggestions(this.selectedSection, this.searchTerm, 5).then((response) => {
						this.highlightedSuggestion = -1;
						this.autocompleteSuggestions = response.data;
					}).catch(() => {
						this.$toasted.global.apiError({
							message: 'Autocomplete failed'
						});
					});
				}, 400);
			},
			/**
			 * Sets the search term and resets the autocompleteSuggestions in order to hide the list
			 * @param {String} suggestion
			 */
			selectAutocompleteSuggestion(suggestion) {
				this.searchTerm = suggestion;
				this.autocompleteSuggestions = [];
			},
			/**
			 * Highlights the next/previous autocomplete suggestion depending on the passed value
			 * @param {Number} value
			 */
			highlightAutocompleteSuggestion(value) {
				if (this.autocompleteSuggestions.length === 0) {
					return;
				}

				let index = 0;
				const maxLength = this.autocompleteSuggestions.length - 1;

				if (this.highlightedSuggestion > -1) {
					index = this.highlightedSuggestion + value;

					if (index > maxLength) {
						index = 0;
					}

					if (index < 0) {
						index = maxLength;
					}
				}

				this.highlightedSuggestion = index;
				this.searchTerm = this.autocompleteSuggestions[index];
			},
			/**
			 * Hides the autocomplete suggestions if the user has clicked anywhere outside of the search bar
			 * @param {Object} e
			 */
			hideAutocompleteSuggestions(e) {
				if (!$(e.target).is('.search-bar, .search-bar *')) {
					this.autocompleteSuggestions = [];
				}
			},
			/**
			* Check if there are any search parameters in the URL and use them in the search bar
			* Otherwise reset the search bar to it's default values
			* @param {Object} route
			*/
			getSearchParamsFromURL(route) {
				this.resetSearch();

				if (route.name === 'search') {
					this.selectedSection = decodeURIComponent(route.params.section);
					this.searchTerm = decodeURIComponent(route.params.searchTerm || '');
				}
			},
			/**
			 * Redirects to the /search route passing the selected section and search terms
			 */
			search() {
				//hide the autocomplete suggestions list (in case it was opened)
				this.autocompleteSuggestions = [];

				this.$router.push({
					name: 'search',
					params: {
						section: this.selectedSection,
						//searchTerm: this.searchTerm ? encodeURIComponent(this.searchTerm) : null
						searchTerm: this.searchTerm ? this.searchTerm : null
					}
				}).catch(() => {}); //https://github.com/vuejs/vue-router/issues/2872
			}
		},
		watch: {
			$route: {
				deep: true,
				handler(route) {
					this.getSearchParamsFromURL(route);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.search-bar {
		margin-bottom: 5px;

		.input-wrapper{
			position: relative;
			flex: 1;

			.autocomplete-results{
				position: absolute;
				width: 100%;
				padding: 3px;
				background-color: #ffffff;
				border: 1px solid $smooth-gray;
				border-radius: 5px;
				z-index: 1;

				.item{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 5px 10px;
					border-radius: 5px;
					cursor: pointer;

					&:hover, &.selected{
						background-color: $smooth-gray;
					}
				}
			}
		}

		.dropdown-toggle {
			text-transform: capitalize;
		}

		.dropdown-menu{
			.dropdown-item{
				text-transform: capitalize;
				cursor: pointer;

				&:hover {
					background-color: $smooth-gray;
				}
			}
		}

		.btn-search{
			font-size: 20px;
			padding: 0px 15px;
		}

	}
</style>
