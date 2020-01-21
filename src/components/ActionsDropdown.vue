<template>
	<div class="actions-dropdown">
		<button class="btn btn-link dropdown-trigger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<slot name="button">
				<i class="fas fa-ellipsis-h"></i>
			</slot>
		</button>

		<div class="dropdown-menu dropdown-menu-right">
			<slot>
				<a
					class="dropdown-item"
					href="#"
				>
					Item 1
				</a>
				<a
					class="dropdown-item"
					href="#"
				>
					Item 2
				</a>
			</slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.actions-dropdown {
		display: inline-block;

		.dropdown-trigger {
			.svg-inline--fa {
				color: $dark-gray;

				&:active, &:hover, &:focus {
					color: $dark-gray;
				}
			}
		}

		.dropdown-menu {
			&:after{
				content: '';
				position: absolute;
				right: 11px;
				top: -11px;
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 10px solid $smooth-gray;
				clear: both;
			}

			.dropdown-item {
				cursor: pointer;

				&:hover, &:active, &:focus {
					background-color: $smooth-gray;
					color: $dark-gray;
				}
			}
		}
	}
</style>
