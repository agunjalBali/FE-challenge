<template>
  <div class="transaction-list-wrapper">
    <TransactionItem
      v-for="item of transactions"
      :transaction="item"
      :key="item.id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TransactionItem from './TransactionItemComponent.vue';
import { useCardStore } from 'src/stores/cards';
const cardStore = useCardStore();
const transactions = computed(() => cardStore.transactions);
defineExpose({
  transactions,
});
</script>

<style lang="scss">
.transaction-list-wrapper {
  &__content {
  }
  &__empty-section {
    @apply text-center;
  }
}
</style>
