import GradientStack from '../components/GradientStack.vue';
import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';

it('renders GradientStack component', async () => {
	const wrapper = mount(GradientStack, {
		attachTo: document.body,
	});
	expect(wrapper.element).toBeTruthy();

	const addButton = wrapper.findComponent({ name: 'ButtonControl' });
	await addButton.trigger('click');
	await addButton.trigger('click');
	expect(wrapper.vm.gradients).toHaveLength(3);

	const deleteButton = wrapper.get({ ref: 'deleteGradientReference' });
	await deleteButton.trigger('click');

	expect(wrapper.vm.gradients).toHaveLength(2);

	const toggleButton = wrapper.get({ ref: 'toggleGradientReference' });
	await toggleButton.trigger('click');

	expect(wrapper.vm.gradients[0].status).toBe('hide');

	await toggleButton.trigger('click');
	expect(wrapper.vm.gradients[0].status).toBe('show');
});