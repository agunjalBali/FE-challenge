<template>
  <!-- Desktop view -->
  <q-page v-if="!TouchMode" class="cards-page">
    <div class="cards-page__overview">
      <div class="cards-page__overview-title">
        <span class="cards-page__overview-title-text"> Account balance </span>
      </div>
      <div class="cards-page__overview-info">
        <AccountBalanceComponent />
        <button
          @click="newCardIsOpened = true"
          class="cards-page__overview-info-btn"
        >
          <PlusCircle class="cards-page__overview-info-btn-icon" />
          <span>New card</span>
        </button>
      </div>

      <q-tabs
        v-model="tab"
        inline-label
        align="left"
        class="cards-page__overview-tabs"
      >
        <q-tab name="myCards" label="My debit cards" />
        <q-tab disable name="allCards" label="All company cards" />
      </q-tabs>

      <q-card class="cards-page__overview-card">
        <div class="row">
          <div class="col-6">
            <q-tab-panels
              v-model="tab"
              class="cards-page__overview-tab-panels"
              animated
            >
              <q-tab-panel
                name="myCards"
                class="cards-page__overview-tab-panel"
              >
                <CardCarouselComponent ref="CardCarouselRef" />
                <div v-if="currentCard" class="cards-page__card-detail">
                  <CardActionsComponent
                    :currentCard="currentCard"
                    @cancelCard="onCancelCard"
                    @freezeCard="onFreezeChange"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel
                name="allCards"
                class="cards-page__overview-tab-panel"
              >
                <div class="text-h6">All Company Card</div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
          <div class="col-6">
            <CardDetailComponent v-if="currentCard" />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>

  <!-- Mobile view -->
  <q-page v-if="TouchMode" class="cards-page-mobile">
    <div class="cards-page-mobile__overview">
      <div class="cards-page-mobile__overview-header-wrapper">
        <div class="cards-page-mobile__overview-title">
          <span class="cards-page-mobile__overview-title-text">
            Account balance
          </span>
          <logo class="cards-page-mobile__overview-title-logo" />
        </div>
        <div class="cards-page-mobile__overview-info">
          <AccountBalanceComponent />
          <button
            @click="newCardIsOpened = true"
            class="cards-page-mobile__overview-info-btn"
          >
            <PlusCircle class="cards-page-mobile__overview-info-btn-icon" />
            <span>New card</span>
          </button>
        </div>

        <q-tabs
          v-model="tab"
          inline-label
          class="cards-page-mobile__overview-tabs"
        >
          <q-tab name="myCards" label="My debit cards" />
          <q-tab disable name="allCards" label="All company cards" />
        </q-tabs>
      </div>
      <q-tab-panels
        v-model="tab"
        class="cards-page-mobile__overview-tab-panels"
        animated
      >
        <q-tab-panel
          name="myCards"
          class="cards-page-mobile__overview-tab-panel"
        >
          <CardCarouselComponent ref="CardCarouselRef" />
        </q-tab-panel>

        <q-tab-panel
          name="allCards"
          class="cards-page-mobile__overview-tab-panel"
        >
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-if="currentCard" class="cards-page-mobile__card-detail">
      <CardActionsComponent
        :currentCard="currentCard"
        @cancelCard="onCancelCard"
        @freezeCard="onFreezeChange"
      />

      <CardDetailComponent />
    </div>
  </q-page>

  <AddNewCardDialog v-model="newCardIsOpened" />
</template>

<script setup lang="ts">
import Logo from 'assets/Logo.svg';
import PlusCircle from 'assets/PlusCircle.svg';
import AccountBalanceComponent from 'components/cards/AccountBalanceComponent.vue';
import CardDetailComponent from 'components/cards/CardDetailComponent.vue';
import CardCarouselComponent from 'components/cards/CardCarouselComponent.vue';
import { Dialog } from 'quasar';
import AddNewCardDialog from 'src/components/cards/AddNewCardDialog.vue';
import CardActionsComponent from 'src/components/cards/CardActionsComponent.vue';
import { CardStatus } from 'src/models/card';
import { useCardStore } from 'src/stores/cards';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

const { getCards, changeCardStatus, cancelCard } = useCardStore();
getCards();
const tab = ref('myCards');
const newCardIsOpened = ref(false);
const CardCarouselRef = ref<InstanceType<typeof CardCarousel>>();
const currentCard = computed(() => {
  return CardCarouselRef.value?.currentCard;
});

const $q = useQuasar();
$q.screen.setSizes({
  lg: 1024,
});
const TouchMode = computed(() => {
  return $q.screen.lt.lg;
});
const onFreezeChange = () => {
  if (currentCard.value) {
    const newStatus =
      currentCard.value?.status === CardStatus.Active
        ? CardStatus.Inactive
        : CardStatus.Active;

    changeCardStatus(currentCard.value, newStatus);
  }
};

const onCancelCard = () => {
  Dialog.create({
    title: 'Cancel and remove card',
    message: 'Are you sure you want to cancel and remove this card?',
    ok: {
      label: 'Cancel Card',
      color: 'negative',
    },
    cancel: {
      label: 'Abort',
      color: 'primary',
    },
  }).onOk(() => {
    if (currentCard.value) {
      cancelCard(currentCard.value);
    }
  });
};
</script>

<style lang="scss" scoped>
.cards-page {
  @apply p-[60px];

  &__overview {
    @apply sticky top-0;

    &-title {
      @apply flex justify-between;
    }

    &-title-text {
      @apply font-semibold;
    }

    &-title-logo {
      @apply text-brand relative top-[-12px];
    }

    &-card {
      @apply mt-4 p-9 shadow-none;
      filter: drop-shadow(0px 2px 12px #00000014);
    }

    &-info {
      @apply flex justify-between mt-4;

      &-btn {
        @apply p-2 rounded flex items-center text-[13px] font-bold bg-[#325BAF] text-white;

        &-icon {
          @apply mr-2;
        }
      }
    }

    &-tabs {
      @apply mt-6 capitalize #{!important};

      .q-tab__indicator {
      }
    }

    &-tab-panels {
      @apply bg-transparent;
    }

    &-tab-panel {
      @apply p-0;
    }
  }

  &__card-detail {
    @apply bg-white rounded-3xl flex flex-col;

    &__content {
      @apply p-6 pb-[86px] h-full overflow-auto;

      &__details-btn {
        @apply relative z-10;

        &:not(:first-child) {
          @apply mt-6;
        }
      }

      &__details-panel {
        @apply z-0 relative -top-2.5;
      }
    }
  }
}

.cards-page-mobile {
  @apply bg-[#0C365A];

  &__overview {
    @apply px-6 pb-3 sticky top-0;
    padding-left: 1.5rem;
    padding-right: 0;

    &-header-wrapper {
      @apply px-6;
      padding-left: 0;
    }
    &-title {
      @apply flex justify-between pt-8;
    }

    &-title-text {
      @apply font-semibold text-white;
    }

    &-title-logo {
      @apply text-brand relative top-[-12px];
    }

    &-info {
      @apply flex justify-between mt-2;

      &-btn {
        @apply flex items-center text-[13px] font-bold text-[#23CEFD];

        &-icon {
          @apply mr-2;
        }
      }
    }

    &-tabs {
      @apply scale-75 -translate-x-10 text-white mt-2;

      .q-tab__indicator {
      }
    }

    &-tab-panels {
      @apply pt-3 bg-transparent;
    }

    &-tab-panel {
      @apply p-0;
    }
  }

  &__card-detail {
    @apply sticky z-10 bg-white rounded-t-3xl flex flex-col;
    min-height: calc(100vh - 160px);

    &__content {
      @apply p-6 pb-[86px] h-full overflow-auto;

      &__details-btn {
        @apply relative z-10;

        &:not(:first-child) {
          @apply mt-6;
        }
      }

      &__details-panel {
        @apply z-0 relative -top-2.5;
      }
    }
  }
}
</style>

<style lang="scss">
.q-tab__indicator {
  @apply bg-[#23CEFD];
}
.cards-page,
.cards-page {
  &__overview-tabs {
    .q-tab__indicator {
      @apply bg-[#23CEFD];
    }
    .absolute-bottom {
      @apply bg-[#23CEFD];
      background-color: #23cefd;
    }
    .q-tab {
      @apply p-0 flex-grow-0 flex-shrink-0 h-6 min-h-[24px] mr-8;
      // @apply normal-case #{!important};
      text-transform: none !important; /* or 'inherit' */

      &.disabled {
        @apply opacity-30 #{!important};
        text-transform: none !important; /* or 'inherit' */
      }

      &--active {
        .q-tab__label {
          @apply text-[17px] font-bold;
          text-transform: none !important; /* or 'inherit' */
        }
      }

      &__label {
        @apply text-[17px] leading-5 pb-1.5;
        text-transform: none; /* or 'inherit' */
      }
    }
  }
}
</style>
