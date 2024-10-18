
import ControlsContainer from '../components/ControlsContainer.vue';
import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';

window.HTMLElement.prototype.getBoundingClientRect = function () {
	return {
		width: Number.parseFloat(this.style.width) || 0,
		height: Number.parseFloat(this.style.height) || 0,
		top: Number.parseFloat(this.style.marginTop) || 0,
		left: Number.parseFloat(this.style.marginLeft) || 0,
	};
};

it('renders ControlsContainer component', async () => {
	const wrapper = mount(ControlsContainer, {
		attachTo: document.body,
	});
	expect(wrapper.element).toBeTruthy();

	const colorSlider = wrapper.findComponent({ name: 'ColorSlider' });
	const sliderElement = colorSlider.get({ ref: 'slider' });
	sliderElement.element.getBoundingClientRect = vi.fn(() => {
		return {
			width: 200,
			height: 100,
			top: 0,
			left: 100,
		};
	});
	const sliderElementChild = sliderElement.find('div');
	sliderElementChild.element.getBoundingClientRect = vi.fn(() => {
		return {
			width: 200,
			height: 100,
			top: 0,
			left: 100,
		};
	});

	// Testing adding new color stops
	await sliderElementChild.trigger('click', { clientX: 120 });
	await sliderElementChild.trigger('click', { clientX: 150 });
	await sliderElementChild.trigger('click', { clientX: 170 });

	const colorsStops = sliderElement.findAllComponents({ name: 'ColorStop' });
	expect(colorsStops.length).toBe(5);

	// Test dragging color stop
	const [firstColorStop] = colorsStops;
	const spanElement = firstColorStop.find('div > span');
	await spanElement.trigger('mousedown');
	expect(firstColorStop.vm.selectedGradient.colors[0].status).toBe('dragged');

	document.dispatchEvent(new MouseEvent('mousemove', {
		clientX: 150,
		clientY: 100,
	}));

	expect(firstColorStop.vm.selectedGradient.colors[0].stop).toBe(25);

	// Test deleting color stop by pressing delete key
	window.dispatchEvent(new KeyboardEvent('keydown', {
		key: 'Delete',
		repeat: false,
		bubbles: false,

	}));
	expect(firstColorStop.vm.selectedGradient.colors).toHaveLength(4);
});
