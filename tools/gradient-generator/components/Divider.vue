<template>
	<div :class="getClasses" />
</template>

<script setup lang="ts">
const { direction } = defineProps({
	/**
	 * The direction of the divider.
	 */
	direction: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
});

const getClasses = computed(() => {
	const classes = ['border-t-px', 'opacity-40', 'transition-colors'];

	if (direction === 'horizontal') {
		classes.push('border-t border-t-[var(--vp-c-brand-soft)]');
	} else {
		classes.push('border-s border-s-[var(--vp-c-brand-soft)]');
	}

	return classes;
});
</script>
