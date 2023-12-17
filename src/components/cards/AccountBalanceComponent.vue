<template>
  <div class="account-balance">
    <span class="account-balance__currency">S$</span>
    <span class="account-balance__amount">12,150</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.account-balance {
  @apply flex items-center;
  &__currency {
    @apply bg-brand rounded px-[14px] py-[3px] mr-2.5 text-xs font-bold text-white;
  }

  &__amount {
    @apply text-white lg:text-black text-xl font-bold;
  }
}
</style>
