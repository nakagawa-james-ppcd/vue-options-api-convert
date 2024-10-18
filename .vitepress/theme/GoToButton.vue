<template>
	<div class="flex justify-center mb-2 mt-8">
		<a
			v-bind="$attrs"
			class="!no-underline
				!text-[var(--vp-button-brand-text)]
				!transition-all
				bg-[var(--vp-button-brand-bg)]
				hover:bg-[var(--vp-button-brand-hover-bg)]
				border
				hover:border-[var(--vp-button-brand-hover-border)]
				border-[var(--vp-c-brand-3)]
				mx-auto
				px-6
				py-3
				rounded-md
				hover:text-[var(--vp-button-brand-hover-text)]"
		>
			<slot />
		</a>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});
</script>