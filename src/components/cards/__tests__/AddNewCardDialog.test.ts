import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from '../../../../test/vitest/__tests__/install-pinia';
import * as Quasar from 'quasar';
import { useCardStore } from 'src/stores/cards';
import { describe, expect, it, vi } from 'vitest';
import AddNewCardDialog from '../AddNewCardDialog.vue';

// Replace API plugin with custom dialog functionality
installQuasarPlugin({
  plugins: {
    CustomDialog: Quasar.Dialog,
  },
});

// Modified Pinia installation with altered options
installPinia({ stubActions: true, createSpy: vi.fake });

// Altered describe block and test cases for component
describe('Testing AddNewCardDialog component', () => {
  it('checks if the component is rendered correctly', () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    expect(wrapper.exists()).toBe(true);
  });

  it('verifies the dispatch of store.addNewCard when addCard function is called', async () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    const cardStore = useCardStore();
    wrapper.vm.cardStore = cardStore;
    cardStore.fetchCards();
    await wrapper.vm.$nextTick();
    const initialLength = cardStore.cards.length;
    await wrapper.vm.addCard();

    expect(cardStore.addNewCard).toHaveBeenCalled();
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(cardStore.cards.length).toBe(initialLength + 1);
  });

  it('emits update:model-value when toggleDialog function is called', () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    wrapper.vm.toggleDialog();
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
  });
});
