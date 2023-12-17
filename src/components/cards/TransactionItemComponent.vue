<template>
  <div class="transaction">
    <div
      :class="[
        'transaction__category',
        `transaction__category--${transaction.category}`,
      ]"
    >
      <component :is="icon"></component>
    </div>
    <div class="transaction__details">
      <div class="transaction__details__info">
        <div class="transaction__details__info__recipient">
          <div class="transaction__details__info__recipient__name">
            {{ transaction.recipientName }}
          </div>
          <div
            :class="[
              'transaction__details__info__recipient__amount',
              `transaction__details__info__recipient__amount--${transaction.type}`,
            ]"
          >
            {{ formattedAmount }}
            <ChevronRight
              class="transaction__details__info__recipient__amount__chevron-right"
            />
          </div>
        </div>
        <div class="transaction__details__info__date">
          {{ formattedDate }}
        </div>
      </div>
      <div class="transaction__details__type">
        <div class="transaction__details__type__icon">
          <CreditCard />
        </div>
        {{ formattedTxTypeMsg }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Storage from 'assets/Storage.svg';
import Flights from 'assets/Flights.svg';
import Megaphone from 'assets/Megaphone.svg';
import CreditCard from 'assets/CreditCard.svg';
import ChevronRight from 'assets/ChevronRight.svg';
import { computed, PropType } from 'vue';
import {
  Transaction,
  TransactionClass,
  TransactionType,
} from 'src/models/transaction';
import { formatNumber } from 'src/utils';
import format from 'date-fns/format';

const props = defineProps({
  transaction: {
    type: Object as PropType<Transaction>,
    required: true,
  },
});

const formattedDate = computed(() =>
  format(props.transaction.transactionTime, 'dd MMM yyyy')
);
const formattedAmount = computed(
  () =>
    `${props.transaction.type === TransactionType.Charged ? '- ' : '+ '} ${
      props.transaction.currency
    } ${formatNumber(props.transaction.amount)}`
);
const formattedTxTypeMsg = computed(
  () =>
    `${
      props.transaction.type === TransactionType.Charged
        ? 'Charged to'
        : 'Refund to'
    } debit card`
);
const icon = computed(() => {
  const iconMap = {
    [TransactionClass.regular]: Storage,
    [TransactionClass.important]: Megaphone,
    [TransactionClass.seasonal]: Flights,
  };

  return iconMap[props.transaction.category] || Storage;
});
</script>

<style lang="scss">
.transaction {
  @apply flex py-4 border-b border-b-[#F5F5F5];

  &:last-of-type {
    border-bottom: none;
  }
  &__category {
    @apply p-4 rounded-full flex items-center justify-center w-12 h-12 mr-3;
    &--regular {
      @apply bg-[#009DFF1A] text-[#009DFF];
    }
    &--seasonal {
      @apply bg-[#00D6B51A] text-brand;
    }
    &--important {
      @apply bg-[#F251951A] text-[#F25195];
    }
  }
  &__details {
    @apply w-full;
    &__info {
      &__recipient {
        @apply flex justify-between w-full  mb-1;
        &__name {
          @apply font-semibold;
        }
        &__amount {
          @apply flex items-center text-[#AAAAAA];
          &__chevron-right {
            @apply ml-2.5;
          }
          &--charged {
            @apply text-black;
          }
          &--refund {
            @apply text-brand;
          }
        }
        @apply font-bold;
      }
      &__date {
        @apply text-[#AAAAAA] text-[13px];
      }
    }
    &__type {
      @apply text-xs font-semibold text-[#325BAF] flex items-center mt-3.5;
      &__icon {
        @apply w-6 h-5 bg-[#325BAF] flex items-center justify-center rounded-xl mr-2;
      }
    }
  }
}
</style>
