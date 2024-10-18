<template>
	<div class="flex flex-col gap-2 h-full overflow-auto">
		<div class="flex grow flex-col gap-2 overflow-auto soft-scrollbar">
			<div
				v-for="(gradient, index) in gradients"
				:key="index"
				class="cursor-pointer
					flex
					shrink-0
					group
					h-16
					relative
					transition-opacity
					hover:opacity-100"
				:class="currentGradientIndex === index ? 'opacity-100' : 'opacity-50'"
			>
				<CheckeredBg
					size="sm"
					class="size-16 z-0"
				/>
				<div
					class="size-16 z-0"
					:style="showGradient(index)"
					@click="setGradient(index)"
				/>
				<div
					v-if="gradients.length > 1"
					:class="currentGradientIndex === index ? 'opacity-100' : 'opacity-0'"
					class="flex
						flex-col
						gap-0.5
						group-hover:opacity-100
						h-full
						transition-all"
				>
					<div
						ref="deleteGradientReference"
						class="bg-red-500
							flex
							justify-center
							items-center
							h-1/2
							px-2
							text-lg
							text-white"
						@click.stop="deleteGradient(index)"
					>
						<BsX />
					</div>
					<div
						ref="toggleGradientReference"
						class="bg-green-600
							flex
							justify-center
							items-center
							h-1/2
							text-sm
							text-white"
						@click.stop="toggleGradient(index)"
					>
						<AkEyeOpen v-if="gradient.status == 'show'" />
						<AkEyeSlashed v-else />
					</div>
				</div>
			</div>
		</div>
		<ButtonControl
			@click="addGradient"
		>
			+
		</ButtonControl>
	</div>
</template>

<script setup lang="ts">
import CheckeredBg from './CheckeredBg.vue';
import ButtonControl from './ButtonControl.vue';
const {
	gradients,
	currentGradientIndex,
	setColor,
	gradientOptions,
	generateGradients,
} = useGradientStore();

/**
 * Reference to the delete gradient button.
 * It is used for testing purposes.
 */
const deleteGradientReference = ref();
const toggleGradientReference = ref();

/*
* Display gradient based on the provided index in the stack area.
* For radial gradient that use circle shape we need to put elements in perspective
* Circle width and height might be 1000px so it will be out of view
*/
const showGradient = function (gradientIndex: number) {
	const gradient = gradients.value[gradientIndex];

	const { type, shape, style } = gradient;
	let bg = style['background-image'];

	if (type === 'radial' && shape === 'circle') {
		const size = gradient.length;

		// Create new size. 50 is the width of div
		const newSize = (size * 50) / 1000;
		bg = bg.replace(`${size}px`, `${newSize}px`);
	}

	return {
		'background-image': bg,
	};
};

const toggleGradient = function (gradientIndex: number) {
	// Show or hide gradient from the main stack
	const currentStatus = gradients.value[gradientIndex].status;
	gradients.value[gradientIndex].status = currentStatus === 'show' ? 'hide' : 'show';
};

const setGradient = function (gradientIndex: number) {
	currentGradientIndex.value = gradientIndex;
	setColor(0);
};

const addGradient = function () {
	const newGradient = cloneObject(gradientOptions);

	gradients.value.push(newGradient);
	setGradient(gradients.value.length - 1);
	generateGradients();
};

const deleteGradient = function (gradientIndex: number) {
	let { length } = gradients.value;

	// Delete only if we have more than one gradient
	if (length < 2) {
		 return;
	}

	// First delete element
	gradients.value.splice(gradientIndex, 1);

	// We call length again here because it has changed after splice
	length = gradients.value.length;

	// set other elements
	setGradient(length - 1);

	// Make sure element is visible if it is last one.
	if (length === 1) {
		 gradients.value[currentGradientIndex.value].status = 'show';
	}
};

onBeforeMount(() => {
	addGradient();

	// addGradient();
	// addGradient();
	// addGradient();
	// addGradient();
	// addGradient();
});
</script>