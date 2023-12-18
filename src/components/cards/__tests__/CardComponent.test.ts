import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from '../../../../test/vitest/__tests__/install-pinia';
import * as Quasar from 'quasar';
import { cards } from 'src/services/dummyData';
import { describe, expect, it, vi } from 'vitest';
import CardComponent from '../CardComponent.vue';

// Use a custom dialog plugin instead of Quasar's Dialog
installQuasarPlugin({
  plugins: {
    CustomDialog: Quasar.Dialog,
  },
});

// Modify Pinia installation with altered options
installPinia({ stubActions: true, createSpy: vi.fake });

// Altered describe block and test cases for CardComponent
describe('Testing CardComponent', () => {
  it('verifies if the component is rendered correctly', () => {
    const wrapper: VueWrapper<any> = mount(CardComponent, {});

    expect(wrapper.exists()).toBe(true);
  });

  it('toggles isCardNumberVisible when "Show card number" button is clicked', async () => {
    const wrapper: VueWrapper<any> = mount(CardComponent, {
      props: {
        card: {
          ...cards[0],
        },
      },
    });

    wrapper.vm.isCardNumberVisible = false;
    expect(wrapper.find('.card-wrapper__card__show-card-number').text()).toContain('Show card number');
    const originalIsCardNumberVisible = wrapper.vm.isCardNumberVisible;

    wrapper.find('.card-wrapper__card__show-card-number').trigger('click');
    expect(originalIsCardNumberVisible).toBe(!wrapper.vm.isCardNumberVisible);

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.card-wrapper__card__show-card-number').text()).toContain('Hide card number');
  });
});
