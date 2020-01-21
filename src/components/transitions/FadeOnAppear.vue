<template>
	<transition appear name="fade">
		<slot></slot>
	</transition>
</template>

<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
