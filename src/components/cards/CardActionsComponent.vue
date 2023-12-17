<template>
  <div class="card-actions">
    <button
      id="freezeBtn"
      @click="$emit('freezeCard')"
      class="card-actions__btn"
    >
      <FreezeCard class="card-actions__icon" />
      <span>
        {{ currentCard?.status === 'active' ? 'Freeze Card' : 'Unfreeze Card' }}
      </span>
    </button>
    <button class="card-actions__btn">
      <!-- <SetSpendLimit class="card-actions__icon" /> -->
      <img src="/src/assets/limit.png" class="card-actions__icon-image" alt="Limit Image">

      <span> Set Spend Limit </span>
    </button>
    <button class="card-actions__btn">
      <GPay class="card-actions__icon" />
      <span> Add to GPay </span>
    </button>
    <button class="card-actions__btn">
      <ReplaceCard class="card-actions__icon" />
      <span> Replace Card </span>
    </button>
    <button
      id="cancelBtn"
      @click="$emit('cancelCard')"
      class="card-actions__btn"
    >
      <DeactivateCard class="card-actions__icon" />
      <span> Cancel Card </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import FreezeCard from 'assets/FreezeCard.svg';
import ReplaceCard from 'assets/ReplaceCard.svg';
import DeactivateCard from 'assets/DeactivateCard.svg';
import GPay from 'assets/GPay.svg';

defineProps(['currentCard']);
</script>

<style lang="scss">
.card-actions {
  @apply  text-[#0C365A] text-[13px] flex py-5 px-4 rounded-t-3xl lg:rounded-3xl lg:mt-10;

  &__btn {
    @apply flex-1 flex flex-col justify-start items-center px-1 text-center;
  }

  &__icon {
    @apply mb-2;
    &-image {
      @apply w-[32px] mb-2;
    }
  }
}
</style>
