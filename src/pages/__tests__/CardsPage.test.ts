import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import BalanceComponent from 'components/pages/cards/BalanceComponent.vue';
import CardActionsComponent from 'components/pages/cards/CardActionsComponent.vue';
import * as Quasar from 'quasar';
import { cards } from 'src/services/dummyData';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CardsPage from '../CardsPage.vue';
import { installPinia } from '../../../test/vitest/__tests__/install-pinia';

installQuasarPlugin({
  plugins: {
    CustomDialog: Quasar.Dialog,
  },
});
installPinia({ stubActions: true, createSpy: vi.fake });

describe('CardsPage', () => {
  beforeEach(() => {
    vi.spyOn(Quasar, 'useQuasar').mockReturnValue({
      screen: {
        lt: {
          lg: true,
        },
        setSizes: () => {},
      },
    });
  });

  it('verifies rendering for mobile view', () => {
    const wrapper = mount(CardsPage, {});

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.card-page__overview-title-text').text()).toBe(
      'Account balance'
    );
    expect(wrapper.findComponent(BalanceComponent).exists()).toBe(true);
  });

  it('should trigger freeze card', async () => {
    const createSpy = vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage);
    wrapper.vm.cardSliderRef = {
      currentCard: cards[0],
    };
    await wrapper.vm.$nextTick();

    wrapper.findComponent(CardActionsComponent).vm.$emit('freezeCard');
    wrapper.vm.onFreezeChange();
    expect(wrapper.findComponent(CardActionsComponent).emitted);

    expect(createSpy).toHaveBeenCalled();
  });

  it('shows confirmation dialog when freezing a card', async () => {
    vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage, {});
    wrapper.vm.cardSliderRef = {
      currentCard: {
        ...cards[0],
      },
    };

    wrapper.vm.onFreezeChange();

    expect(Quasar.Dialog.create).toHaveBeenCalledWith({
      title: 'Confirmation',
      message: 'Are you sure you want to freeze this card?',
      ok: {
        label: 'OK',
        color: 'primary',
      },
      cancel: {
        label: 'Cancel',
        color: 'grey',
      },
    });
  });

  // Additional tests for other scenarios can be added similarly
});
