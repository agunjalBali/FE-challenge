import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from '../../../../test/vitest/__tests__/install-pinia';
import * as Quasar from 'quasar';
import { cards } from 'src/services/dummyData';
import { describe, expect, it, vi } from 'vitest';
import CardActionsComponent from '../CardActionsComponent.vue';

// Use a custom dialog plugin instead of Quasar's Dialog
installQuasarPlugin({
  plugins: {
    CustomDialog: Quasar.Dialog,
  },
});

// Modify Pinia installation with altered options
installPinia({ stubActions: true, createSpy: vi.fake });

// Altered describe block and test cases for component
describe('Testing CardActionsComponent', () => {
  it('verifies if the component is rendered correctly', () => {
    const wrapper: VueWrapper<any> = mount(CardActionsComponent, {
      props: {
        currentCard: {
          ...cards[0],
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Freeze Card');
    expect(wrapper.text()).toContain('Set Spend Limit');
    expect(wrapper.text()).toContain('Add to GPay');
    expect(wrapper.text()).toContain('Replace Card');
    expect(wrapper.text()).toContain('Cancel Card');
  });

  it('emits events when buttons are clicked', async () => {
    const wrapper: VueWrapper<any> = mount(CardActionsComponent, {
      props: {
        currentCard: {
          ...cards[0],
        },
      },
    });

    await wrapper.find('#freezeBtn').trigger('click');
    expect(wrapper.emitted('freezeCard')).toBeTruthy();

    await wrapper.find('#cancelBtn').trigger('click');
    expect(wrapper.emitted('cancelCard')).toBeTruthy();
  });
});
